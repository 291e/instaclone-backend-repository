import client from "../../client.js";

export const seeProfile = (_, { username }) =>
  client.user.findUnique({
    where: {
      userName: username,
    },
  });
