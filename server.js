const fastify = require("fastify")({ logger: true });
const PORT = 3200;
const registerRouters = require("./routes/registerRouters");
const createWSEndpoint = require("./utils/createWSEndpoint");

// Register the fastify swagger
fastify.register(require("fastify-swagger"), {
  routePrefix: "/docs",
  swagger: {
    info: {
      title: "Search API",
      description: "Search API",
      version: "1.0.0",
    },
  },
  exposeRoute: true,
});

// Register  the routers
registerRouters(fastify);

// Start server function
async function startServer() {
  try {
    // Create an endpoint
    await createWSEndpoint();
    await fastify.listen(PORT);
  } catch (error) {
    // if an error occurs print the error and exit the program
    fastify.log.error(error);
    process.exit(1);
  }
}

startServer();
