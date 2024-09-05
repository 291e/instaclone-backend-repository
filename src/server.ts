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
import { getUser, protectResolver } from "./users/users.utils";

async function startApolloServer() {
  const app = express();
  const apolloServer = new ApolloServer({
    // typeDefs: typeDefs,
    // resolvers: resolvers,
    schema: schema,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    context: async ({ req }) => {
      return {
        loggedInUser: await getUser(req.headers.token),
        protectResolver,
      };
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
