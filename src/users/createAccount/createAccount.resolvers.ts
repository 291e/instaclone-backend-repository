import bcrypt from "bcrypt";
import client from "../../client";

const resolver = {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, userName, email, password }
    ) => {
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [{ userName }, { email }],
          },
        });
        if (existingUser) {
          // throw new Error("이 유저네임 혹은 이메일은 이미 존재합니다.");
          return {
            ok: false,
            error: "이 유저네임 혹은 이메일은 이미 존재합니다.",
          };
        }
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
      } catch (e) {
        return e;
      }
    },
  },
};

export default resolver;
