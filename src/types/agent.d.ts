// 基础Agent类型
interface Agent {
  id: number;
  user_id: number;
  name: string;
  description: string;
  system_prompt: string;
  model: string;
  temperature: number;
  max_tokens: number;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

// Agent执行记录
interface AgentExecution {
  id: number;
  agent_id: number;
  user_id: number;
  parent_execution_id: number | null;
  input: string;
  output: string;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
}

// 可用模型
interface AgentModel {
  id: string;
  name: string;
}

// 创建Agent所需数据
interface CreateAgentData {
  name: string;
  system_prompt: string;
  description?: string;
  model?: string;
  temperature?: number;
  max_tokens?: number;
  is_public?: boolean;
}

// 更新Agent所需数据
interface UpdateAgentData {
  name?: string;
  system_prompt?: string;
  description?: string;
  model?: string;
  temperature?: number;
  max_tokens?: number;
  is_public?: boolean;
}

export type {
  Agent,
  AgentExecution,
  AgentModel,
  CreateAgentData,
  UpdateAgentData
};