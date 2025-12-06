'use client'

import React, { useState } from 'react'
import { MODELS } from '@/lib/mockData'
import { CONFLICT_SCENARIOS, type ConflictScenario } from '@/lib/scenarioData'

interface ComparisonResponse {
  modelId: string
  response?: string
  tokens?: number
  speed?: number
  cost?: number
  speedRanking?: number
  costRanking?: number
  error?: string
}

interface ComparisonResult {
  prompt: string
  scenario?: ConflictScenario | null
  responses: ComparisonResponse[]
  timestamp: string
}

type Screen = 'scenarios' | 'scenario-detail' | 'create-scenario' | 'results'
type ContextType = 'organizational' | 'interpersonal' | 'community' | 'geopolitical' | 'nonprofit'

const CONTEXT_OPTIONS: { value: ContextType; label: string }[] = [
  { value: 'organizational', label: 'Organizational' },
  { value: 'interpersonal', label: 'Interpersonal' },
  { value: 'community', label: 'Community' },
  { value: 'geopolitical', label: 'Geopolitical' },
  { value: 'nonprofit', label: 'Nonprofit' }
]

const LEARNING_FOCUS_OPTIONS = [
  'interests vs positions',
  'power imbalance',
  'resource scarcity',
  'cultural values',
  'trust and credibility',
  'stakeholder analysis',
  'creative solutions',
  'bias and fairness',
  'organizational culture',
  'family dynamics',
  'environmental justice',
  'hidden interests'
]

export default function ComparisonInterface() {
  const [mounted, setMounted] = useState(false)
  const [screen, setScreen] = useState<Screen>('scenarios')
  const [selectedScenario, setSelectedScenario] = useState<ConflictScenario | null>(null)
  const [editedScenarioText, setEditedScenarioText] = useState('')
  const [selectedModels, setSelectedModels] = useState<string[]>(['claude-3-sonnet', 'gpt-4'])
  const [results, setResults] = useState<ComparisonResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [savedExperiments, setSavedExperiments] = useState<ComparisonResult[]>([])
  const [customScenarios, setCustomScenarios] = useState<ConflictScenario[]>([])

  // Form state for creating new scenario
  const [newScenarioForm, setNewScenarioForm] = useState({
    title: '',
    description: '',
    fullScenarioText: '',
    context: 'organizational' as ContextType,
    learningFocus: [] as string[]
  })
  const [selectedLearningFocusOptions, setSelectedLearningFocusOptions] = useState<string[]>([])

  // Mount effect - load experiments from database
  React.useEffect(() => {
    setMounted(true)
    loadExperimentsFromDB()
  }, [])

  const loadExperimentsFromDB = async () => {
    try {
      const response = await fetch('/api/experiments')
      const data = await response.json()
      
      if (data.success && data.experiments) {
        // Convert DB experiments to ComparisonResult format
        const formattedExperiments = data.experiments.map((exp: any) => ({
          prompt: exp.prompt,
          scenario: exp.scenario_title ? {
            id: `db-${exp.id}`,
            title: exp.scenario_title,
            description: '',
            context: exp.scenario_context || 'organizational',
            fullScenarioText: exp.prompt,
            learningFocus: []
          } : null,
          responses: exp.responses.map((r: any) => ({
            modelId: r.model_name,
            response: r.response_text,
            tokens: r.tokens_used,
            speed: r.speed_ms / 1000,
            cost: r.cost,
            speedRanking: 0,
            costRanking: 0
          })),
          timestamp: exp.created_at
        }))
        
        setSavedExperiments(formattedExperiments)
      }
    } catch (error) {
      console.error('Failed to load experiments from database:', error)
    }
  }

  const handleScenarioSelect = (scenario: ConflictScenario) => {
    setSelectedScenario(scenario)
    setEditedScenarioText(scenario.fullScenarioText)
    setScreen('scenario-detail')
  }

  const handleModelToggle = (modelId: string) => {
    setSelectedModels(prev =>
      prev.includes(modelId)
        ? prev.filter(id => id !== modelId)
        : [...prev, modelId]
    )
  }

  const handleCompare = async () => {
    if (!selectedScenario || !editedScenarioText || selectedModels.length === 0) return

    setLoading(true)
    try {
      const response = await fetch('/api/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: editedScenarioText, 
          models: selectedModels 
        })
      })
      const data = await response.json()
      setResults({
        ...data,
        scenario: selectedScenario
      })
      setScreen('results')
    } catch (error) {
      console.error('Comparison failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveExperiment = async () => {
    if (!results) return

    try {
      const response = await fetch('/api/experiments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: results.prompt,
          scenario: results.scenario,
          responses: results.responses
        })
      })

      const data = await response.json()

      if (data.success) {
        // Add to local state
        setSavedExperiments(prev => [results, ...prev])
        alert('Experiment saved successfully!')
      } else {
        alert('Failed to save experiment')
      }
    } catch (error) {
      console.error('Error saving experiment:', error)
      // Fallback: still save to local state
      setSavedExperiments(prev => [results, ...prev])
      alert('Saved locally (database save failed)')
    }
  }

  const handleLoadExperiment = (experiment: ComparisonResult) => {
    setResults(experiment)
    if (experiment.scenario) {
      setSelectedScenario(experiment.scenario)
      setEditedScenarioText(experiment.prompt)
    }
    setScreen('results')
  }

  const handleBackToScenarios = () => {
    setScreen('scenarios')
    setSelectedScenario(null)
    setEditedScenarioText('')
  }

  const handleBackToScenarioDetail = () => {
    setScreen('scenario-detail')
  }

  const handleCreateScenario = () => {
    setScreen('create-scenario')
    setNewScenarioForm({
      title: '',
      description: '',
      fullScenarioText: '',
      context: 'organizational',
      learningFocus: []
    })
    setSelectedLearningFocusOptions([])
  }

  const handleLearningFocusToggle = (focus: string) => {
    setSelectedLearningFocusOptions(prev =>
      prev.includes(focus)
        ? prev.filter(f => f !== focus)
        : [...prev, focus]
    )
  }

  const handleSaveNewScenario = () => {
    if (!newScenarioForm.title.trim() || !newScenarioForm.fullScenarioText.trim()) {
      alert('Please fill in title and scenario text')
      return
    }

    const newScenario: ConflictScenario = {
      id: `custom-${Date.now()}`,
      title: newScenarioForm.title,
      description: newScenarioForm.description,
      context: newScenarioForm.context,
      fullScenarioText: newScenarioForm.fullScenarioText,
      learningFocus: selectedLearningFocusOptions
    }

    setCustomScenarios(prev => [newScenario, ...prev])
    handleScenarioSelect(newScenario)
  }

  // Show loading state during hydration
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500 text-lg">Loading...</div>
      </div>
    )
  }

  // Combine built-in and custom scenarios
  const allScenarios = [...customScenarios, ...CONFLICT_SCENARIOS]

  // Group scenarios by context
  const contextGroups: Record<string, ConflictScenario[]> = allScenarios.reduce((acc, scenario) => {
    if (!acc[scenario.context]) acc[scenario.context] = []
    acc[scenario.context].push(scenario)
    return acc
  }, {} as Record<string, ConflictScenario[]>)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Sidebar - Saved Experiments */}
        <div className="w-64 bg-white border-r border-gray-200 p-6 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">Saved Experiments</h2>
          <div className="space-y-3">
            {savedExperiments.length === 0 ? (
              <p className="text-sm text-gray-500">No saved experiments yet</p>
            ) : (
              savedExperiments.map((exp, idx) => (
                <button
                  key={idx}
                  onClick={() => handleLoadExperiment(exp)}
                  className="w-full text-left p-3 rounded bg-gray-100 hover:bg-gray-200 transition text-sm"
                >
                  <div className="font-medium truncate">
                    {exp.scenario ? exp.scenario.title : exp.prompt.substring(0, 30)}...
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(exp.timestamp).toLocaleDateString()}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          {/* SCREEN 1: Select Scenario */}
          {screen === 'scenarios' && (
            <div className="p-8">
              <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-2">
                  <h1 className="text-3xl font-bold">AI Conflict Resolution Lab</h1>
                  <button
                    onClick={handleCreateScenario}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-medium"
                  >
                    + Create Scenario
                  </button>
                </div>
                <p className="text-gray-600 mb-8">Select a conflict scenario to analyze</p>

                <div className="bg-white rounded-lg shadow p-8">
                  <h2 className="text-2xl font-semibold mb-8">Conflict Scenarios</h2>

                  <div className="space-y-6">
                    {Object.entries(contextGroups).map(([context, scenarios]) => (
                      <div key={context}>
                        <h3 className="text-lg font-semibold text-gray-700 uppercase mb-4 capitalize">
                          {context}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {scenarios.map(scenario => (
                            <button
                              key={scenario.id}
                              onClick={() => handleScenarioSelect(scenario)}
                              className="text-left p-4 rounded-lg border-2 border-gray-200 bg-white hover:border-blue-500 hover:bg-blue-50 transition"
                            >
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-semibold text-gray-900">{scenario.title}</h4>
                                {scenario.id.startsWith('custom-') && (
                                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                                    Custom
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mb-3">{scenario.description}</p>
                              <div className="flex flex-wrap gap-1">
                                {scenario.learningFocus.slice(0, 2).map(focus => (
                                  <span
                                    key={focus}
                                    className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                                  >
                                    {focus}
                                  </span>
                                ))}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SCREEN 2: Scenario Detail & Model Selection */}
          {screen === 'scenario-detail' && selectedScenario && (
            <div className="p-8">
              <div className="max-w-5xl mx-auto">
                <button
                  onClick={handleBackToScenarios}
                  className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition text-sm font-medium"
                >
                  ← Back to Scenarios
                </button>

                {/* Scenario Display & Edit */}
                <div className="bg-white rounded-lg shadow p-8 mb-8">
                  <h1 className="text-3xl font-bold mb-2">{selectedScenario.title}</h1>
                  <p className="text-gray-600 mb-6">{selectedScenario.description}</p>

                  <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-3">Scenario</h2>
                    <textarea
                      value={editedScenarioText}
                      onChange={e => setEditedScenarioText(e.target.value)}
                      className="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-xs text-gray-500 mt-2">You can edit the scenario text before running the comparison</p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-600 uppercase mb-3">Learning Focus</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedScenario.learningFocus.map(focus => (
                        <span
                          key={focus}
                          className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
                        >
                          {focus}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Model Selection */}
                <div className="bg-white rounded-lg shadow p-8">
                  <h2 className="text-2xl font-semibold mb-6">Select AI Models to Compare</h2>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {MODELS.map(model => (
                      <label
                        key={model.id}
                        className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition ${
                          selectedModels.includes(model.id)
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedModels.includes(model.id)}
                          onChange={() => handleModelToggle(model.id)}
                          className="w-5 h-5 cursor-pointer"
                        />
                        <div>
                          <div className="font-semibold text-gray-900">{model.name}</div>
                          <div className="text-xs text-gray-500">{model.provider}</div>
                        </div>
                      </label>
                    ))}
                  </div>

                  <p className="text-sm text-gray-600 mb-6">
                    {selectedModels.length === 0
                      ? 'Select at least one model to compare'
                      : `${selectedModels.length} model${selectedModels.length !== 1 ? 's' : ''} selected`}
                  </p>

                  <button
                    onClick={handleCompare}
                    disabled={loading || selectedModels.length === 0 || !editedScenarioText.trim()}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-4 rounded-lg transition text-lg"
                  >
                    {loading ? 'Comparing Models...' : 'Compare Models'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SCREEN 3: Create New Scenario */}
          {screen === 'create-scenario' && (
            <div className="p-8">
              <div className="max-w-4xl mx-auto">
                <button
                  onClick={handleBackToScenarios}
                  className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition text-sm font-medium"
                >
                  ← Cancel
                </button>

                <div className="bg-white rounded-lg shadow p-8">
                  <h1 className="text-3xl font-bold mb-6">Create New Scenario</h1>

                  {/* Title */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Scenario Title *
                    </label>
                    <input
                      type="text"
                      value={newScenarioForm.title}
                      onChange={e => setNewScenarioForm({ ...newScenarioForm, title: e.target.value })}
                      placeholder="e.g., Budget Allocation Dispute"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description
                    </label>
                    <input
                      type="text"
                      value={newScenarioForm.description}
                      onChange={e => setNewScenarioForm({ ...newScenarioForm, description: e.target.value })}
                      placeholder="Brief one-liner describing the conflict"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Context */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Context *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {CONTEXT_OPTIONS.map(option => (
                        <button
                          key={option.value}
                          onClick={() => setNewScenarioForm({ ...newScenarioForm, context: option.value })}
                          className={`px-4 py-2 rounded-lg border-2 transition font-medium ${
                            newScenarioForm.context === option.value
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Learning Focus */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Learning Focus (optional)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {LEARNING_FOCUS_OPTIONS.map(focus => (
                        <button
                          key={focus}
                          onClick={() => handleLearningFocusToggle(focus)}
                          className={`px-3 py-2 rounded-lg border-2 transition text-sm font-medium ${
                            selectedLearningFocusOptions.includes(focus)
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                        >
                          {focus}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Full Scenario Text */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Scenario Description *
                    </label>
                    <textarea
                      value={newScenarioForm.fullScenarioText}
                      onChange={e => setNewScenarioForm({ ...newScenarioForm, fullScenarioText: e.target.value })}
                      placeholder="Describe the conflict scenario in detail. Include stakeholders, tensions, background, and complications."
                      className="w-full h-64 px-4 py-2 border border-gray-300 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-xs text-gray-500 mt-2">Provide as much detail as possible to help models understand the conflict</p>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-4">
                    <button
                      onClick={handleSaveNewScenario}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
                    >
                      Create Scenario
                    </button>
                    <button
                      onClick={handleBackToScenarios}
                      className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 rounded-lg transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SCREEN 4: Results */}
          {screen === 'results' && results && (
            <div className="p-8">
              <div className="max-w-6xl mx-auto">
                <button
                  onClick={handleBackToScenarioDetail}
                  className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition text-sm font-medium"
                >
                  ← Back to Scenario
                </button>

                <div className="bg-white rounded-lg shadow p-8 mb-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h1 className="text-3xl font-bold mb-1">Results</h1>
                      {results.scenario && (
                        <p className="text-gray-600">Scenario: {results.scenario.title}</p>
                      )}
                    </div>
                    <button
                      onClick={handleSaveExperiment}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-medium"
                    >
                      Save Experiment
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {results.responses.map(response => {
                      const model = MODELS.find(m => m.id === response.modelId)
                      return (
                        <div key={response.modelId} className="border border-gray-200 rounded-lg p-4">
                          <h3 className="font-semibold text-lg mb-4">{model?.name}</h3>

                          {response.error ? (
                            <p className="text-red-600 text-sm">{response.error}</p>
                          ) : (
                            <>
                              <div className="mb-4">
                                <p className="text-sm text-gray-700 line-clamp-10">{response.response}</p>
                              </div>

                              <div className="space-y-3 border-t pt-4">
                                <div className="flex justify-between items-center">
                                  <span className="text-xs text-gray-600">Speed:</span>
                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold text-sm">{response.speed}s</span>
                                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                      #{response.speedRanking} fastest
                                    </span>
                                  </div>
                                </div>

                                <div className="flex justify-between items-center">
                                  <span className="text-xs text-gray-600">Cost (per 1K tokens):</span>
                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold text-sm">${response.cost}</span>
                                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                                      #{response.costRanking} cheapest
                                    </span>
                                  </div>
                                </div>

                                <div className="flex justify-between">
                                  <span className="text-xs text-gray-600">Tokens used:</span>
                                  <span className="text-sm">{response.tokens}</span>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Comparison Analysis Section */}
                {results.responses.filter(r => !r.error).length > 1 && (
                  <div className="bg-white rounded-lg shadow p-8 mb-8">
                    <h2 className="text-2xl font-bold mb-6">Comparison Analysis</h2>

                    {/* Metrics Comparison Table */}
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-gray-100">
                              <th className="border border-gray-300 px-4 py-2 text-left">Model</th>
                              <th className="border border-gray-300 px-4 py-2 text-right">Speed (s)</th>
                              <th className="border border-gray-300 px-4 py-2 text-right">Cost ($)</th>
                              <th className="border border-gray-300 px-4 py-2 text-right">Tokens</th>
                              <th className="border border-gray-300 px-4 py-2 text-right">Response Length</th>
                            </tr>
                          </thead>
                          <tbody>
                            {results.responses.filter(r => !r.error).map(response => {
                              const model = MODELS.find(m => m.id === response.modelId)
                              const responseLength = response.response?.length || 0
                              return (
                                <tr key={response.modelId} className="hover:bg-gray-50">
                                  <td className="border border-gray-300 px-4 py-2 font-medium">{model?.name}</td>
                                  <td className="border border-gray-300 px-4 py-2 text-right">
                                    {response.speed?.toFixed(2)}
                                    {response.speedRanking === 1 && (
                                      <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Fastest</span>
                                    )}
                                  </td>
                                  <td className="border border-gray-300 px-4 py-2 text-right">
                                    ${response.cost?.toFixed(4)}
                                    {response.costRanking === 1 && (
                                      <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Cheapest</span>
                                    )}
                                  </td>
                                  <td className="border border-gray-300 px-4 py-2 text-right">{response.tokens}</td>
                                  <td className="border border-gray-300 px-4 py-2 text-right">{responseLength} chars</td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Response Length Comparison */}
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold mb-4">Response Length Comparison</h3>
                      <div className="space-y-3">
                        {results.responses.filter(r => !r.error).map(response => {
                          const model = MODELS.find(m => m.id === response.modelId)
                          const responseLength = response.response?.length || 0
                          const maxLength = Math.max(...results.responses.filter(r => !r.error).map(r => r.response?.length || 0))
                          const percentage = maxLength > 0 ? (responseLength / maxLength) * 100 : 0

                          return (
                            <div key={response.modelId}>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="font-medium">{model?.name}</span>
                                <span className="text-gray-600">{responseLength} characters</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-4">
                                <div
                                  className="bg-blue-600 h-4 rounded-full transition-all"
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Key Insights */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Key Insights</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Fastest Model */}
                        {(() => {
                          const fastest = results.responses
                            .filter(r => !r.error && r.speed)
                            .sort((a, b) => (a.speed || 0) - (b.speed || 0))[0]
                          const fastestModel = MODELS.find(m => m.id === fastest?.modelId)
                          return fastest ? (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                              <div className="text-sm text-blue-600 font-semibold mb-1">Fastest Response</div>
                              <div className="text-lg font-bold text-blue-900">{fastestModel?.name}</div>
                              <div className="text-sm text-blue-700">{fastest.speed?.toFixed(2)}s</div>
                            </div>
                          ) : null
                        })()}

                        {/* Cheapest Model */}
                        {(() => {
                          const cheapest = results.responses
                            .filter(r => !r.error && r.cost !== undefined)
                            .sort((a, b) => (a.cost || 0) - (b.cost || 0))[0]
                          const cheapestModel = MODELS.find(m => m.id === cheapest?.modelId)
                          return cheapest ? (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                              <div className="text-sm text-green-600 font-semibold mb-1">Most Cost-Effective</div>
                              <div className="text-lg font-bold text-green-900">{cheapestModel?.name}</div>
                              <div className="text-sm text-green-700">${cheapest.cost?.toFixed(4)}</div>
                            </div>
                          ) : null
                        })()}

                        {/* Longest Response */}
                        {(() => {
                          const longest = results.responses
                            .filter(r => !r.error && r.response)
                            .sort((a, b) => (b.response?.length || 0) - (a.response?.length || 0))[0]
                          const longestModel = MODELS.find(m => m.id === longest?.modelId)
                          return longest ? (
                            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                              <div className="text-sm text-purple-600 font-semibold mb-1">Most Detailed</div>
                              <div className="text-lg font-bold text-purple-900">{longestModel?.name}</div>
                              <div className="text-sm text-purple-700">{longest.response?.length} chars</div>
                            </div>
                          ) : null
                        })()}
                      </div>
                    </div>
                  </div>
                )}

                <div className="text-center">
                  <button
                    onClick={handleBackToScenarios}
                    className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-lg transition font-medium"
                  >
                    Try Another Scenario
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
