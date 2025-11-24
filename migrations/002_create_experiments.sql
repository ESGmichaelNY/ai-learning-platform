-- Create experiments table
CREATE TABLE experiments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  prompt TEXT NOT NULL,
  scenario_title TEXT,
  scenario_context TEXT,
  models_used TEXT[] NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create responses table
CREATE TABLE responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  experiment_id UUID REFERENCES experiments(id) ON DELETE CASCADE,
  model_name TEXT NOT NULL,
  response_text TEXT NOT NULL,
  cost DECIMAL NOT NULL DEFAULT 0,
  speed_ms DECIMAL NOT NULL DEFAULT 0,
  tokens_used INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for faster queries
CREATE INDEX idx_experiments_created_at ON experiments(created_at DESC);
CREATE INDEX idx_responses_experiment_id ON responses(experiment_id);
