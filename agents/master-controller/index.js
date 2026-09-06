/**
 * JARVIS OS — Master Controller Core Engine
 * Location: agents/master-controller/index.js
 */

class MasterController {
  constructor(agentRegistry = null) {
    this.registry = agentRegistry;
  }

  /**
   * Main entry point to process any incoming user prompt
   * @param {Object} payload - { message, context, userId }
   */
  async processRequest(payload) {
    const { message, context = {}, userId = 'default_user' } = payload;

    if (!message || typeof message !== 'string' || message.trim() === '') {
      return this.formatResponse({
        success: false,
        error: 'Empty request: Message is required.',
        status: 'FAILED'
      });
    }

    try {
      // 1. Goal Analysis & Task Breakdown
      const plan = await this.analyzeAndPlan(message, context);

      // 2. Check if user approval is needed before executing any action
      if (plan.requiresApproval) {
        return this.formatResponse({
          success: true,
          status: 'WAITING_APPROVAL',
          approvalDetails: plan.approvalDetails,
          response: plan.clarificationOrApprovalMessage,
          tasks: plan.tasks
        });
      }

      // 3. Execution Phase (Single-agent or Multi-agent orchestration)
      const executionResults = await this.executePlan(plan, context);

      // 4. Synthesize results into a single coherent business response
      const finalSynthesis = await this.synthesizeResults(message, executionResults);

      return this.formatResponse({
        success: true,
        status: 'COMPLETED',
        response: finalSynthesis,
        tasks: plan.tasks,
        agentResults: executionResults
      });
    } catch (error) {
      return this.formatResponse({
        success: false,
        status: 'ERROR',
        error: error.message || 'Internal Master Controller error occurred.',
        response: 'JARVIS ko request process karne me problem hui. Kripya dobara try karein.'
      });
    }
  }

  /**
   * Breaks the goal into structured tasks and assigns agents
   */
  async analyzeAndPlan(message, context) {
    const normalized = message.toLowerCase();

    // Default structure
    const plan = {
      userGoal: message,
      requiresApproval: false,
      approvalDetails: null,
      clarificationOrApprovalMessage: null,
      tasks: []
    };

    // Rule: External actions require explicit approval
    const isPublishAction = normalized.includes('post kar') || normalized.includes('publish') || normalized.includes('send email');
    if (isPublishAction) {
      plan.requiresApproval = true;
      plan.approvalDetails = {
        actionType: 'EXTERNAL_PUBLISH',
        description: 'Publishing content or sending external communications requires your confirmation.'
      };
      plan.clarificationOrApprovalMessage = 'Kya aap ise publish/send karne ke liye approve karte hain? (Reply with YES to confirm)';
      return plan;
    }

    // Task decomposition logic based on domain keywords
    if (normalized.includes('instagram') || normalized.includes('growth') || normalized.includes('grow')) {
      plan.tasks.push({
        taskId: 'task_growth_01',
        agentId: 'growth_agent',
        description: 'Analyze Instagram growth roadmap and reach strategy',
        status: 'PENDING'
      });
      plan.tasks.push({
        taskId: 'task_content_01',
        agentId: 'content_agent',
        description: 'Generate Reels concepts, hooks, and content calendar',
        status: 'PENDING'
      });
    } else if (normalized.includes('client') || normalized.includes('lead') || normalized.includes('sales')) {
      plan.tasks.push({
        taskId: 'task_lead_01',
        agentId: 'lead_acquisition_agent',
        description: 'Identify target clients and build outreach scripts',
        status: 'PENDING'
      });
    } else if (normalized.includes('research') || normalized.includes('competitor')) {
      plan.tasks.push({
        taskId: 'task_research_01',
        agentId: 'research_agent',
        description: 'Conduct market and competitor research',
        status: 'PENDING'
      });
    } else {
      // General Business / CEO Strategy fallback
      plan.tasks.push({
        taskId: 'task_strategy_01',
        agentId: 'ceo_strategy_agent',
        description: 'Evaluate business request and define strategic action steps',
        status: 'PENDING'
      });
    }

    return plan;
  }

  /**
   * Runs tasks through the registered agents
   */
  async executePlan(plan, context) {
    const results = [];

    for (const task of plan.tasks) {
      task.status = 'IN_PROGRESS';

      if (!this.registry) {
        // Fallback placeholder response when registry is not wired up yet
        results.push({
          taskId: task.taskId,
          agentId: task.agentId,
          status: 'COMPLETED',
          output: `[${task.agentId}] Task ready for execution: ${task.description}`
        });
        task.status = 'COMPLETED';
        continue;
      }

      const agent = this.registry.getAgent(task.agentId);
      if (!agent) {
        results.push({
          taskId: task.taskId,
          agentId: task.agentId,
          status: 'FAILED',
          error: `Agent '${task.agentId}' is not registered in Agent Registry.`
        });
        task.status = 'FAILED';
        continue;
      }

      try {
        const agentOutput = await agent.execute({
          task: task.description,
          context: context,
          previousResults: results
        });
        results.push({
          taskId: task.taskId,
          agentId: task.agentId,
          status: 'COMPLETED',
          output: agentOutput.result || agentOutput
        });
        task.status = 'COMPLETED';
      } catch (err) {
        results.push({
          taskId: task.taskId,
          agentId: task.agentId,
          status: 'FAILED',
          error: err.message
        });
        task.status = 'FAILED';
      }
    }

    return results;
  }

  /**
   * Combines all agent findings into a clear and actionable output
   */
  async synthesizeResults(originalGoal, results) {
    const successfulOutputs = results
      .filter((r) => r.status === 'COMPLETED')
      .map((r) => `• [${r.agentId}]: ${r.output}`);

    const failedOutputs = results
      .filter((r) => r.status === 'FAILED')
      .map((r) => `• [${r.agentId} Error]: ${r.error}`);

    let reply = `Goal: "${originalGoal}"\n\n`;

    if (successfulOutputs.length > 0) {
      reply += `Action Plan:\n${successfulOutputs.join('\n')}\n`;
    }

    if (failedOutputs.length > 0) {
      reply += `\nIssues Encountered:\n${failedOutputs.join('\n')}\n`;
    }

    return reply.trim();
  }

  formatResponse({ success, status, response, tasks = [], agentResults = [], approvalDetails = null, error = null }) {
    return {
      success,
      status,
      agent: 'master-controller',
      response,
      tasks,
      agentResults,
      approvalDetails,
      error,
      timestamp: new Date().toISOString()
    };
  }
}

module.exports = MasterController;
