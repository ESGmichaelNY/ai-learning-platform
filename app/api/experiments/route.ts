import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

// GET: Fetch all experiments
export async function GET(request: NextRequest) {
  try {
    // Fetch all experiments with their responses
    const { data: experiments, error: experimentsError } = await supabase
      .from('experiments')
      .select('*')
      .order('created_at', { ascending: false })

    if (experimentsError) throw experimentsError

    // Fetch all responses
    const { data: responses, error: responsesError } = await supabase
      .from('responses')
      .select('*')

    if (responsesError) throw responsesError

    // Combine experiments with their responses
    const experimentsWithResponses = experiments.map(exp => ({
      ...exp,
      responses: responses?.filter(r => r.experiment_id === exp.id) || []
    }))

    return NextResponse.json({
      success: true,
      experiments: experimentsWithResponses
    })
  } catch (error) {
    console.error('Fetch experiments error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch experiments' },
      { status: 500 }
    )
  }
}

// POST: Save a new experiment
export async function POST(request: NextRequest) {
  try {
    const { prompt, scenario, responses } = await request.json()

    if (!prompt || !responses || responses.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Save experiment
    const { data: experiment, error: experimentError } = await supabase
      .from('experiments')
      .insert([
        {
          prompt,
          scenario_title: scenario?.title || null,
          scenario_context: scenario?.context || null,
          models_used: responses.map((r: any) => r.modelId)
        }
      ])
      .select()
      .single()

    if (experimentError) throw experimentError

    // Save responses
    const responsesData = responses.map((response: any) => ({
      experiment_id: experiment.id,
      model_name: response.modelId,
      response_text: response.response || '',
      cost: response.cost || 0,
      speed_ms: (response.speed || 0) * 1000,
      tokens_used: response.tokens || 0
    }))

    const { error: responsesError } = await supabase
      .from('responses')
      .insert(responsesData)

    if (responsesError) throw responsesError

    return NextResponse.json({
      success: true,
      experimentId: experiment.id,
      message: 'Experiment saved successfully'
    })
  } catch (error) {
    console.error('Save experiment error:', error)
    return NextResponse.json(
      { error: 'Failed to save experiment' },
      { status: 500 }
    )
  }
}

