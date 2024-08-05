import client from "../client.js";
import bcrypt from "bcrypt";

export const Mutation = {
  createAccount: async (
    _,
    { firstName, lastName, userName, email, password }
  ) => {
    const existingUser = await client.user.findFirst({
      where: {
        OR: [{ userName }, { email }],
      },
    });
    const uglyPassword = await bcrypt.hash(password, 10);
    return client.user.create({
      data: {
        userName,
        email,
        firstName,
        lastName,
        password: uglyPassword,
      },
    });
  },
};
