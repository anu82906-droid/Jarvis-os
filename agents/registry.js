/**
 * JARVIS OS — Agent Registry
 * Location: agents/registry.js
 */

class AgentRegistry {
  constructor() {
    this.agents = new Map();
  }

  registerAgent(agentId, agentInstance) {
    this.agents.set(agentId, agentInstance);
  }

  getAgent(agentId) {
    return this.agents.get(agentId);
  }

  getAllAgents() {
    return Array.from(this.agents.values());
  }

  hasAgent(agentId) {
    return this.agents.has(agentId);
  }
}

module.exports = AgentRegistry;
