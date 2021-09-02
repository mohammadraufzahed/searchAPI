// This function will register the routers
async function registerRouters(fastify) {
  // Google simple query
  fastify.register(require("./GoogleServices/simpleQuery"));
}

module.exports = registerRouters;
