import { gql } from "apollo-server-express";

export default gql`
  type MutationResponse {
    ok: Boolean!
    error: String
  }
  type LoginMutationResponse {
    ok: Boolean!
    token: String
    error: String
  }
`;
