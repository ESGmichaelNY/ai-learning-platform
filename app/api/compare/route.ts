import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import OpenAI from 'openai'
import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize API clients
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || ''
})

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
})

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '')

// Pricing per 1K tokens (approximate, check latest pricing)
const PRICING = {
  'claude-3-sonnet': { input: 0.003, output: 0.015 },
  'gpt-4': { input: 0.03, output: 0.06 },
  'gemini-pro': { input: 0.00025, output: 0.0005 },
  'llama-2': { input: 0.0002, output: 0.0002 }
}

interface ModelResponse {
  modelId: string
  response?: string
  tokens?: number
  speed?: number
  cost?: number
  speedRanking?: number
  costRanking?: number
  error?: string
}

async function callClaude(prompt: string): Promise<ModelResponse> {
  const startTime = Date.now()

  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error('ANTHROPIC_API_KEY not configured')
    }

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }]
    })

    const duration = (Date.now() - startTime) / 1000
    const contentBlock = response.content[0]
    const text = contentBlock.type === 'text' ? contentBlock.text : ''

    // Calculate cost (input + output tokens)
    const inputTokens = response.usage.input_tokens
    const outputTokens = response.usage.output_tokens
    const totalTokens = inputTokens + outputTokens
    const cost = (
      (inputTokens / 1000) * PRICING['claude-3-sonnet'].input +
      (outputTokens / 1000) * PRICING['claude-3-sonnet'].output
    )

    return {
      modelId: 'claude-3-sonnet',
      response: text,
      tokens: totalTokens,
      speed: duration,
      cost: parseFloat(cost.toFixed(4))
    }
  } catch (error: any) {
    console.error('Claude error:', error)
    return {
      modelId: 'claude-3-sonnet',
      error: error.message || 'Failed to get Claude response'
    }
  }
}

async function callGPT4(prompt: string): Promise<ModelResponse> {
  const startTime = Date.now()

  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY not configured')
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1024
    })

    const duration = (Date.now() - startTime) / 1000
    const text = response.choices[0]?.message?.content || ''

    // Calculate cost
    const inputTokens = response.usage?.prompt_tokens || 0
    const outputTokens = response.usage?.completion_tokens || 0
    const totalTokens = response.usage?.total_tokens || 0
    const cost = (
      (inputTokens / 1000) * PRICING['gpt-4'].input +
      (outputTokens / 1000) * PRICING['gpt-4'].output
    )

    return {
      modelId: 'gpt-4',
      response: text,
      tokens: totalTokens,
      speed: duration,
      cost: parseFloat(cost.toFixed(4))
    }
  } catch (error: any) {
    console.error('GPT-4 error:', error)
    return {
      modelId: 'gpt-4',
      error: error.message || 'Failed to get GPT-4 response'
    }
  }
}

async function callGemini(prompt: string): Promise<ModelResponse> {
  const startTime = Date.now()

  try {
    if (!process.env.GOOGLE_API_KEY) {
      throw new Error('GOOGLE_API_KEY not configured')
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    const duration = (Date.now() - startTime) / 1000

    // Estimate tokens (Gemini doesn't always provide exact counts)
    const estimatedTokens = Math.ceil(text.length / 4)
    const cost = (estimatedTokens / 1000) * PRICING['gemini-pro'].output

    return {
      modelId: 'gemini-pro',
      response: text,
      tokens: estimatedTokens,
      speed: duration,
      cost: parseFloat(cost.toFixed(4))
    }
  } catch (error: any) {
    console.error('Gemini error:', error)
    return {
      modelId: 'gemini-pro',
      error: error.message || 'Failed to get Gemini response'
    }
  }
}

async function callLlama(prompt: string): Promise<ModelResponse> {
  // Llama 2 requires a third-party provider like Together AI, Replicate, or Groq
  // For now, return a helpful error message
  return {
    modelId: 'llama-2',
    error: 'Llama 2 requires additional setup with Together AI or Replicate. See documentation.'
  }
}

export async function POST(request: NextRequest) {
  try {
    const { prompt, models } = await request.json()

    if (!prompt || !models || models.length === 0) {
      return NextResponse.json(
        { error: 'Prompt and models are required' },
        { status: 400 }
      )
    }

    // Call all models in parallel
    const responsePromises = models.map(async (modelId: string) => {
      switch (modelId) {
        case 'claude-3-sonnet':
          return await callClaude(prompt)
        case 'gpt-4':
          return await callGPT4(prompt)
        case 'gemini-pro':
          return await callGemini(prompt)
        case 'llama-2':
          return await callLlama(prompt)
        default:
          return {
            modelId,
            error: 'Unknown model'
          }
      }
    })

    const responses = await Promise.all(responsePromises)

    // Calculate rankings
    const validResponses = responses.filter((r: any) => !r.error)

    if (validResponses.length > 0) {
      // Sort by speed (lower is better - faster)
      const sortedBySpeed = [...validResponses].sort((a, b) => (a.speed || 0) - (b.speed || 0))
      // Sort by cost (lower is better - cheaper)
      const sortedByCost = [...validResponses].sort((a, b) => (a.cost || 0) - (b.cost || 0))

      responses.forEach((r: any) => {
        if (!r.error) {
          r.speedRanking = sortedBySpeed.findIndex(sr => sr.modelId === r.modelId) + 1
          r.costRanking = sortedByCost.findIndex(sr => sr.modelId === r.modelId) + 1
        }
      })
    }

    return NextResponse.json({
      prompt,
      responses,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Comparison error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
