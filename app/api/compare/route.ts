import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import OpenAI from 'openai'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { Ollama } from 'ollama'
import http from 'http'

// Increase timeout for large models (10 minutes)
export const maxDuration = 600

// Initialize API clients
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || ''
})

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
})

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '')

// Initialize Ollama - use direct HTTP requests instead of SDK's fetch
const ollama = new Ollama({
  host: process.env.OLLAMA_HOST || 'http://localhost:11434'
})

// Pricing per 1K tokens (approximate, check latest pricing)
// Ollama models are free (local)
const PRICING = {
  'claude-3-sonnet': { input: 0.003, output: 0.015 },
  'gpt-4': { input: 0.03, output: 0.06 },
  'gemini-pro': { input: 0.00025, output: 0.0005 },
  'ollama': { input: 0, output: 0 }  // Free - runs locally
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
      model: 'claude-3-5-sonnet-20240620',
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

async function callOllama(prompt: string, modelId: string): Promise<ModelResponse> {
  const startTime = Date.now()

  return new Promise((resolve) => {
    const postData = JSON.stringify({
      model: modelId,
      prompt: prompt,
      stream: true,
      options: {
        num_predict: 512  // Reduced for faster responses
      }
    })

    const options = {
      hostname: 'localhost',
      port: 11434,
      path: '/api/generate',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      },
      timeout: 600000  // 10 minute timeout
    }

    const req = http.request(options, (res) => {
      let fullText = ''
      let totalTokens = 0
      let promptTokens = 0
      let evalTokens = 0
      let buffer = ''

      res.on('data', (chunk) => {
        buffer += chunk.toString()
        const lines = buffer.split('\n')

        // Keep the last incomplete line in the buffer
        buffer = lines.pop() || ''

        for (const line of lines) {
          if (!line.trim()) continue

          try {
            const json = JSON.parse(line)

            if (json.response) {
              fullText += json.response
            }

            if (json.done) {
              promptTokens = json.prompt_eval_count || 0
              evalTokens = json.eval_count || 0
              totalTokens = promptTokens + evalTokens
            }
          } catch (parseError) {
            // Skip invalid JSON
            continue
          }
        }
      })

      res.on('end', () => {
        const duration = (Date.now() - startTime) / 1000
        const estimatedTokens = totalTokens || Math.ceil(fullText.length / 4)

        resolve({
          modelId,
          response: fullText,
          tokens: estimatedTokens,
          speed: duration,
          cost: 0
        })
      })

      res.on('error', (error) => {
        console.error('Ollama response error:', error)
        resolve({
          modelId,
          error: error.message || 'Failed to get Ollama response'
        })
      })
    })

    req.on('error', (error) => {
      console.error('Ollama request error:', error)
      resolve({
        modelId,
        error: error.message || 'Failed to connect to Ollama. Is it running?'
      })
    })

    req.on('timeout', () => {
      req.destroy()
      resolve({
        modelId,
        error: 'Request timed out after 10 minutes. Model may be too slow.'
      })
    })

    req.write(postData)
    req.end()
  })
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
      // Check if it's an Ollama model (contains ':' like 'llama3.1:8b')
      if (modelId.includes(':') || ['mixtral:latest', 'llama3.1:8b', 'qwen2.5:32b', 'deepseek-r1:32b'].includes(modelId)) {
        return await callOllama(prompt, modelId)
      }

      switch (modelId) {
        case 'claude-3-sonnet':
          return await callClaude(prompt)
        case 'gpt-4':
          return await callGPT4(prompt)
        case 'gemini-pro':
          return await callGemini(prompt)
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
