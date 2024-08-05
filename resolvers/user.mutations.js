import client from "../client.js";

export const Mutation = {
  createAccount: async (
    _,
    { firstName, lastName, userName, email, password }
  ) => {
    try {
      const existingUser = await client.user.findUnique({
        where: {
          OR: [{ userName }, { email }],
        },
      });
      if (existingUser) {
        throw new Error("This username/email is already taken.");
      }
      const newUser = await client.user.create({
        data: {
          firstName,
          lastName,
          userName,
          email,
          password, // Password should be hashed
        },
      });
      return newUser;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};
