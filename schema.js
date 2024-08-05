import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { readFileSync } from "fs";
import { makeExecutableSchema } from "@graphql-tools/schema";
import gql from "graphql-tag";
import { Query as userQueries } from "./resolvers/user.queries.js";
import { Mutation as userMutations } from "./resolvers/user.mutations.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const userTypeDefs = readFileSync(
  join(__dirname, "schemas", "user.graphql"),
  "utf8"
);

const typeDefs = gql`
  ${userTypeDefs}
`;

const resolvers = {
  Query: {
    ...userQueries,
  },
  Mutation: {
    ...userMutations,
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
