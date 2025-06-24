// src/api/agentService.ts
import axios from 'axios';
import type { 
  Agent, 
  AgentExecution, 
  AgentModel,
  CreateAgentData, 
  UpdateAgentData 
} from '@/types/agent';

// 创建 Axios 实例
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
  }
});

// 添加请求拦截器注入 JWT
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * 获取当前用户的所有Agent列表
 * @param includePublic 是否包含公开Agent
 */
export const listAgents = async (includePublic: boolean = false): Promise<Agent[]> => {
  try {
    const response = await apiClient.get('/agents', {
      params: { public: includePublic }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching agents:', error);
    throw error;
  }
};

/**
 * 创建新的Agent
 * @param agentData 创建Agent所需数据
 */
export const createAgent = async (agentData: CreateAgentData): Promise<Agent> => {
  try {
    const response = await apiClient.post('/agents', agentData);
    return response.data;
  } catch (error) {
    console.error('Error creating agent:', error);
    throw error;
  }
};

/**
 * 获取单个Agent详情
 * @param agentId Agent ID
 */
export const getAgent = async (agentId: number): Promise<Agent> => {
  try {
    const response = await apiClient.get(`/agents/${agentId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching agent:', error);
    throw error;
  }
};

/**
 * 更新Agent
 * @param agentId Agent ID
 * @param updateData 更新数据
 */
export const updateAgent = async (
  agentId: number, 
  updateData: UpdateAgentData
): Promise<Agent> => {
  try {
    const response = await apiClient.put(`/agents/${agentId}`, updateData);
    return response.data;
  } catch (error) {
    console.error('Error updating agent:', error);
    throw error;
  }
};

/**
 * 删除Agent
 * @param agentId Agent ID
 */
export const deleteAgent = async (agentId: number): Promise<void> => {
  try {
    await apiClient.delete(`/agents/${agentId}`);
  } catch (error) {
    console.error('Error deleting agent:', error);
    throw error;
  }
};

/**
 * 获取Agent的执行历史
 * @param agentId Agent ID
 */
export const listAgentExecutions = async (
  agentId: number
): Promise<AgentExecution[]> => {
  try {
    const response = await apiClient.get(`/agents/${agentId}/executions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching agent executions:', error);
    throw error;
  }
};

/**
 * 执行Agent对话
 * @param agentId Agent ID
 * @param input 用户输入
 * @param parentExecutionId 父执行ID（用于连续对话）
 */
export const executeAgent = async (
  agentId: number,
  input: string,
  parentExecutionId?: number
): Promise<{ output: string; executionId: number }> => {
  try {
    const response = await apiClient.post(`/agents/${agentId}/execute`, {
      input,
      parent_execution_id: parentExecutionId
    });
    return {
      output: response.data.output,
      executionId: response.data.execution_id
    };
  } catch (error) {
    console.error('Error executing agent:', error);
    throw error;
  }
};

/**
 * 获取可用的模型列表
 */
export const listAvailableModels = async (): Promise<AgentModel[]> => {
  try {
    const response = await apiClient.get('/agents/models');
    return response.data.models;
  } catch (error) {
    console.error('Error fetching available models:', error);
    throw error;
  }
};

/**
 * 与Agent进行聊天对话
 * @param agentId Agent ID
 * @param input 用户输入
 * @param sessionId 会话ID（用于连续对话）
 */
export const chatWithAgent = async (
  agentId: number,
  input: string,
  sessionId?: number
): Promise<{ response: string; sessionId: number }> => {
  try {
    const response = await apiClient.post('/agents/chat', {
      agent_id: agentId,
      input,
      session_id: sessionId
    });
    return {
      response: response.data.response,
      sessionId: response.data.session_id
    };
  } catch (error) {
    console.error('Error chatting with agent:', error);
    throw error;
  }
};

export default {
  listAgents,
  createAgent,
  getAgent,
  updateAgent,
  deleteAgent,
  listAgentExecutions,
  executeAgent,
  listAvailableModels,
  chatWithAgent
};