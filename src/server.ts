// import "dotenv/config";
// import { ApolloServer } from "@apollo/server";
// import { startStandaloneServer } from "@apollo/server/standalone";

// import { fileURLToPath } from "url";
// import { dirname, join } from "path";
// import { readFileSync } from "fs";
// import { makeExecutableSchema } from "@graphql-tools/schema";
// import gql from "graphql-tag";
// import { Query, Mutation } from "./resolvers/index.js";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const userTypeDefs = readFileSync(
//   join(__dirname, "schemas", "user.graphql"),
//   "utf8"
// );
// const editTypeDefs = readFileSync(
//   join(__dirname, "schemas", "edit.graphql"),
//   "utf8"
// );

// const typeDefs = gql`
//   ${userTypeDefs}
//   ${editTypeDefs}
// `;

// const resolvers = {
//   Query,
//   Mutation,
// };

// const schema = makeExecutableSchema({ typeDefs, resolvers });

// const PORT = process.env.PORT;
// const server = new ApolloServer({
//   schema,
//   context: {
//     token:
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzIyODQyNjg1fQ.olr29M3zBvUG8OU6gibeshCxX2nJhH5JFaA53L9mnck",
//   },
// });

// const { url } = await startStandaloneServer(server, {
//   listen: { port: PORT },
// });

// console.log(`🚀 Server ready at: ${url}`);
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import "dotenv/config";
import client from "./client";
import { schema } from "./schema";
import logger from "morgan";
import http from "http";
import { graphqlUploadExpress } from "graphql-upload-ts";
import cors from "cors";

async function startApolloServer() {
  const app = express();
  const apolloServer = new ApolloServer({
    // typeDefs: typeDefs,
    // resolvers: resolvers,
    schema: schema,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    context: {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzIyODQyNjg1fQ.olr29M3zBvUG8OU6gibeshCxX2nJhH5JFaA53L9mnck",
    },
    // context: async ({ req, res }) => {
    //   const token = Array.isArray(req.headers.token)
    //     ? req.headers.token[0]
    //     : req.headers.token;
    //   return {
    //     loggedUser: await getUser(token),
    //     client: client,
    //   };
    // },
  });
  const corsOptions = {
    origin: "http://localhost:3000", // 클라이언트 서버 주소
    credentials: true, // 크로스 도메인 쿠키 허용 설정
    optionsSuccessStatus: 200,
  };

  await apolloServer.start();
  app.use(logger("tiny"));
  app.use("/static", express.static("uploads"));
  apolloServer.applyMiddleware({ app });
  const httpServer = http.createServer(app);

  // Express 서버 실행
  const PORT = process.env.PORT;
  httpServer.listen(PORT, () => {
    console.log(
      `Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`
    );
  });
}
startApolloServer();
