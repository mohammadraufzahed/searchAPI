// This function will register the routers
async function registerRouters(fastify) {
  fastify.register(require("./GoogleServices/simpleQuery"));
}

module.exports = registerRouters;
