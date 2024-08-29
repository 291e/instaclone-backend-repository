import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    login(userName: String!, password: String!): LoginMutationResponse!
  }
`;
