/**
 * JARVIS OS — Standard Agent Interface (Base Agent)
 * Location: agents/base_agent.js
 */

class BaseAgent {
  constructor(agentId, name, description) {
    this.agentId = agentId;
    this.name = name;
    this.description = description;
  }

  /**
   * Standard interface method for all agents
   * @param {Object} input - { task, context, userId, projectInformation, previousResults, constraints }
   */
  async execute(input) {
    // Each agent must override this method with its own logic
    throw new Error(`${this.name} must implement the execute() method.`);
  }

  /**
   * Helper to format agent output consistently
   */
  formatOutput(result, recommendations = [], errors = []) {
    return {
      agent: this.agentId,
      status: errors.length === 0 ? 'COMPLETED' : 'FAILED',
      result,
      recommendations,
      errors,
      timestamp: new Date().toISOString()
    };
  }
}

module.exports = BaseAgent;
