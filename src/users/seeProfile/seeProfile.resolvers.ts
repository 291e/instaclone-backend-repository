import client from "../../client";

const resolver = {
  Query: {
    seeProfile: (_, { username }) =>
      client.user.findUnique({
        where: {
          userName: username,
        },
      }),
  },
};
export default resolver;
