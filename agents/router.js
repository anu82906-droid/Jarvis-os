/*
 * JARVIS OS - Agent Router
 * Location: agents/router.js
 */
const IntentEngine = require('./intent_engine');

class AgentRouter {
  constructor(registry) {
    this.registry = registry;
    this.intentEngine = new IntentEngine();
  }

  async route(goal, context = {}) {
    const detectedIntent = this.intentEngine.detectIntent(goal);
    console.log(`[Router] Goal: "${goal}" -> Intent: "${detectedIntent.intent}" (Confidence: ${detectedIntent.confidence})`);

    const agent = this.registry.getAgent(detectedIntent.requiredAgent);
    if (!agent) {
       console.warn(`[Router] Agent not found for: ${detectedIntent.requiredAgent}, falling back to strategy agent.`);
       return this.registry.getAgent('strategy_agent');
    }

    return agent;
  }
}

module.exports = AgentRouter;
