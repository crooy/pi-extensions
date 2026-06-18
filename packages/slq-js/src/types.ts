export interface Task {
  id: string;
  skill: string;
  cwd: string;
  goal: string;
  plan_path?: string;
  context?: string;
  model?: string;
  depends_on?: string[];
  status: string;
  output?: string;
  error?: string;
  retries: number;
  max_retries: number;
  timeout_sec: number;
  created_at: string;
  picked_at?: string;
  completed_at?: string;
}

export interface TaskOutput {
  summary: string;
  files: string[];
  context: string;
  errors?: string;
}

export interface PlanSummary {
  plan_path: string;
  total: number;
  blocked: number;
  pending: number;
  active: number;
  done: number;
  failed: number;
}
