require("dotenv").config();

////////////////////////////////////
// for initialization on Cloud Functions
const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} = require("firebase-admin/firestore");

initializeApp();

const db = getFirestore();
////////////////////////////////////

const fastify = require("fastify")({ logger: true });
const cors = require("@fastify/cors");

const PORT = process.env.PORT || 5000;
const DOMAIN = process.env.DOMAIN || "localhost";

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