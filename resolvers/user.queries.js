import client from "../client.js";

export const seeProfile = (_, { userName }) =>
  client.user.findUnique({
    where: {
      userName,
    },
  });
