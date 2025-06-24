// stores/agentStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { 
  listAgents, 
  getAgent, 
  createAgent, 
  updateAgent, 
  deleteAgent 
} from '@/api/agentService';
import type { Agent, CreateAgentData, UpdateAgentData } from '@/types/agent';

export const useAgentStore = defineStore('agent', () => {
  const agents = ref<Agent[]>([]);
  const currentAgent = ref<Agent | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchAgents = async (includePublic: boolean = false) => {
    loading.value = true;
    error.value = null;
    try {
      agents.value = await listAgents(includePublic);
    } catch (err) {
      error.value = 'Failed to fetch agents';
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const fetchAgent = async (agentId: number) => {
    loading.value = true;
    error.value = null;
    try {
      currentAgent.value = await getAgent(agentId);
    } catch (err) {
      error.value = 'Failed to fetch agent';
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const addAgent = async (agentData: CreateAgentData) => {
    try {
      const agent = await createAgent(agentData);
      agents.value.unshift(agent);
      return agent;
    } catch (err) {
      error.value = 'Failed to create agent';
      console.error(err);
      throw err;
    }
  };

  const modifyAgent = async (agentId: number, updateData: UpdateAgentData) => {
    try {
      const agent = await updateAgent(agentId, updateData);
      const index = agents.value.findIndex(a => a.id === agentId);
      if (index !== -1) {
        agents.value[index] = agent;
      }
      if (currentAgent.value?.id === agentId) {
        currentAgent.value = agent;
      }
      return agent;
    } catch (err) {
      error.value = 'Failed to update agent';
      console.error(err);
      throw err;
    }
  };

  const removeAgent = async (agentId: number) => {
    try {
      await deleteAgent(agentId);
      agents.value = agents.value.filter(agent => agent.id !== agentId);
      if (currentAgent.value?.id === agentId) {
        currentAgent.value = null;
      }
    } catch (err) {
      error.value = 'Failed to delete agent';
      console.error(err);
      throw err;
    }
  };

  return {
    agents,
    currentAgent,
    loading,
    error,
    fetchAgents,
    fetchAgent,
    addAgent,
    modifyAgent,
    removeAgent
  };
});