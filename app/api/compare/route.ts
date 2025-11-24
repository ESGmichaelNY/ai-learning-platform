import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getMockResponse } from '@/lib/mockData'

export async function POST(request: NextRequest) {
  try {
    const { prompt, models } = await request.json()

    if (!prompt || !models || models.length === 0) {
      return NextResponse.json(
        { error: 'Prompt and models are required' },
        { status: 400 }
      )
    }

    const responses = models.map((modelId: string) => {
      const mockResponse = getMockResponse(prompt, modelId)
      
      if (!mockResponse) {
        return {
          modelId,
          error: 'No mock data available for this combination'
        }
      }

      // Calculate cost per 1K tokens (example pricing)
      const pricePerToken = mockResponse.cost / mockResponse.tokens
      const costPer1k = (pricePerToken * 1000).toFixed(4)

      return {
        modelId,
        response: mockResponse.text,
        tokens: mockResponse.tokens,
        speed: mockResponse.speed,
        cost: parseFloat(costPer1k),
        speedRanking: null, // Will calculate after all responses
        costRanking: null
      }
    })

    // Calculate rankings
    const validResponses = responses.filter((r: any) => !r.error)
    
    if (validResponses.length > 0) {
      const speeds = validResponses.map((r: any) => r.speed).sort((a, b) => b - a)
      const costs = validResponses.map((r: any) => r.cost).sort((a, b) => a - b)

      responses.forEach((r: any) => {
        if (!r.error) {
          r.speedRanking = speeds.indexOf(r.speed) + 1
          r.costRanking = costs.indexOf(r.cost) + 1
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
