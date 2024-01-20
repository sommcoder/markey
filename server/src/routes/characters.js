const data = require("../blockData.json");

module.exports = async function characterRoutes(fastify, options, done) {
  fastify.get("/characters", async (req, rep) => {
    return data;
  });
  done();
};

/*
 
Should we pull data from the db and compute it on the server 
 
*/
