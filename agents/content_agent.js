/**
 * JARVIS OS — Content Agent
 * Location: agents/content_agent.js
 */

const BaseAgent = require('./base_agent');

class ContentAgent extends BaseAgent {
  constructor() {
    super(
      'content_agent',
      'Content Agent',
      'Generates Reel ideas, scripts, hooks, captions, and maintains the content calendar.'
    );
  }

  /**
   * Executes content generation tasks
   */
  async execute(input) {
    const { task, context = {} } = input;
    const businessNiche = context.niche || 'local business';

    const recommendations = [
      `Create a content calendar for the next 30 days focusing on the ${businessNiche} niche.`,
      'Draft 10 engaging Reel scripts with strong hooks and clear calls-to-action.',
      'Develop a list of visual concepts and shot lists for upcoming video shoots.'
    ];

    const result = `Executed task: "${task}". Content strategy and drafts prepared.`;

    return this.formatOutput(result, recommendations);
  }
}

module.exports = ContentAgent;
