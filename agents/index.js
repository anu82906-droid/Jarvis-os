const AgentRegistry = require('./registry');
const AgentRouter = require('./router');

const registry = new AgentRegistry();
const router = new AgentRouter(registry);

module.exports = {
  registry,
  router
};
