import client from "../client.js";

export const Query = {
  seeProfile: (_, { username }) =>
    client.user.findUnique({
      where: {
        username,
      },
    }),
};
