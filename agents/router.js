/**
 * JARVIS OS — Agent Router
 * Location: agents/router.js
 */

class AgentRouter {
  constructor(registry) {
    this.registry = registry;
  }

  async route(goal, context = {}) {
    const normalizedGoal = goal.toLowerCase();

    // Route based on goal keywords
    if (normalizedGoal.includes('instagram') || normalizedGoal.includes('growth') || normalizedGoal.includes('grow')) {
      return this.registry.getAgent('growth_agent');
    }
    
    if (normalizedGoal.includes('client') || normalizedGoal.includes('lead') || normalizedGoal.includes('sales')) {
      return this.registry.getAgent('lead_acquisition_agent');
    }

    if (normalizedGoal.includes('content') || normalizedGoal.includes('reel') || normalizedGoal.includes('post')) {
      return this.registry.getAgent('content_agent');
    }

    if (normalizedGoal.includes('research') || normalizedGoal.includes('competitor')) {
      return this.registry.getAgent('research_agent');
    }

    // Default fallback
    return this.registry.getAgent('ceo_strategy_agent');
  }
}

module.exports = AgentRouter;
