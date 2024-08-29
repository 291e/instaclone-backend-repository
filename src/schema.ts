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

// export default schema;

import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";

const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.*`);
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.*`);
export const typeDefs = mergeTypeDefs(loadedTypes);
export const resolvers = mergeResolvers(loadedResolvers);
export const schema = makeExecutableSchema({ typeDefs, resolvers });
