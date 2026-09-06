class IntentEngine {
 constructor() {
 this.intents = [
 {
 intent: 'create_content',
 keywords: ['create', 'make', 'generate', 'write', 'script', 'reel', 'post'],
 requiredAgent: 'content_agent'
 },
 {
 intent: 'grow_audience',
 keywords: ['grow', 'followers', 'reach', 'subscribers', 'scale'],
 requiredAgent: 'growth_agent'
 },
 {
 intent: 'acquire_clients',
 keywords: ['find', 'clients', 'leads', 'sales', 'outreach', 'prospect'],
 requiredAgent: 'lead_acquisition_agent'
 },
 {
 intent: 'market_research',
 keywords: ['research', 'competitor', 'analyze', 'audit', 'trends'],
 requiredAgent: 'research_agent'
 },
 {
 intent: 'business_strategy',
 keywords: ['strategy', 'plan', 'model', 'business', 'ceo'],
 requiredAgent: 'strategy_agent'
 }
 ];
 }

 detectIntent(userInput) {
 let maxMatches = 0;

for (const intentObj of this.intents) {
  let matches = 0;
  for (const keyword of intentObj.keywords) {
    if (tokens.includes(keyword) || tokens.some(token => token.startsWith(keyword))) {
      matches++;
    }
  }

  if (matches > maxMatches) {
    maxMatches = matches;
    detectedIntent = {
      intent: intentObj.intent,
      confidence: Math.min(matches * 0.5, 1.0),
      requiredAgent: intentObj.requiredAgent
    };
  }
}

return detectedIntent;
}

module.exports = IntentEngine;
  
