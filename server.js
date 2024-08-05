import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import schema from "./schema.js";

const PORT = process.env.PORT;
const server = new ApolloServer({
  schema,
  context: {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzIyODQyNjg1fQ.olr29M3zBvUG8OU6gibeshCxX2nJhH5JFaA53L9mnck",
  },
});

const { url } = await startStandaloneServer(server, {
  listen: { port: PORT },
});

console.log(`🚀 Server ready at: ${url}`);
