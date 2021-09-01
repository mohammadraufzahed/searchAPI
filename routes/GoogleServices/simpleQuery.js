// Simple query options
const simpleQueryOptions = {
  schema: {
    body: {
      type: "object",
      required: ["query"],
      properties: {
        query: {
          type: "string",
        },
        page: {
          type: "integer",
        },
      },
    },
  },
  handler: require("../../controllers/GoogleServices/simpleQuery"),
};

// Simple Query Router
async function simpleQuery(fastify, options, done) {
  fastify.post("/v1/google/simpleQuery", simpleQueryOptions);
  done();
}

module.exports = simpleQuery;
