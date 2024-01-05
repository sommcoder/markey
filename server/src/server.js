require("dotenv").config();

const fastify = require("fastify")({ logger: true });
const cors = require("@fastify/cors");

const PORT = process.env.PORT;
const DOMAIN = process.env.DOMAIN;

// enable CORS
fastify.register(cors, {
  "Access-Control-Allow-Origin": DOMAIN,
});

// Registered Routes:
fastify.register(require("./routes/characters"), { prefix: "api/v1" });

fastify.listen({ port: PORT }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  } else {
    console.log(`Fastify server is listening on port ${PORT}`);
    // test();
  }
});
