import bcrpyt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../../client";

const resolver = {
  Mutation: {
    editProfile: async (
      _: any,
      {
        firstName,
        lastName,
        userName,
        email,
        password: newPassword,
      }: {
        firstName: string;
        lastName?: string;
        userName: string;
        email: string;
        password: string;
      },
      { token }
    ) => {
      //@ts-ignore
      const { id } = await jwt.verify(token, process.env.SECRET_KEY);
      let uglyPassword = null;
      if (newPassword) {
        uglyPassword = await bcrpyt.hash(newPassword, 10);
      }
      const ok = await client.user.update({
        where: { id },
        data: {
          firstName,
          lastName,
          userName,
          email,
          ...(uglyPassword && { password: uglyPassword }),
        },
      });
      if (ok) {
        return {
          ok: true,
        };
      } else {
        return {
          ok: false,
          error: "프로필을 업데이트할 수 없었습니다.",
        };
      }
    },
  },
};

export default resolver;
