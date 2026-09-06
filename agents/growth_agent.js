/**
 * JARVIS OS — Growth Agent
 * Location: agents/growth_agent.js
 */

const BaseAgent = require('./base_agent');

class GrowthAgent extends BaseAgent {
  constructor() {
    super(
      'growth_agent',
      'Growth Agent',
      'Analyzes Instagram growth roadmap, market trends, and audience strategy.'
    );
  }

  /**
   * Executes growth analysis and strategy planning
   */
  async execute(input) {
    const { task, context = {} } = input;
    const analyticsData = context.analytics || {};

    // Determine strategy suggestions based on available data
    const recommendations = [];
    if (analyticsData.reach < 1000) {
      recommendations.push('Focus on high-frequency Reel publishing to boost organic reach.');
    }
    if (analyticsData.engagementRate < 0.03) {
      recommendations.push('Improve hook scripting in the first 3 seconds of videos.');
    }

    const result = `Executed task: "${task}". Growth strategy aligned with current audience data.`;
    
    return this.formatOutput(
      result,
      recommendations.length > 0 ? recommendations : ['Maintain current posting cadence and monitor analytics.']
    );
  }
}

module.exports = GrowthAgent;
