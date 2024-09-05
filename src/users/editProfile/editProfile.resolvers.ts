import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../../client";
import { protectResolver } from "../users.utils";
const resolver = {
  Mutation: {
    editProfile: protectResolver(
      async (
        _,
        { firstName, lastName, userName, email, password: newPassword },
        { loggedInUser }
      ) => {
        try {
          let uglyPassword = null;
          if (newPassword) {
            uglyPassword = await bcrypt.hash(newPassword, 10);
          }

          const updatedUser = await client.user.update({
            where: { id: loggedInUser.id },
            data: {
              firstName,
              lastName,
              userName,
              email,
              ...(uglyPassword && { password: uglyPassword }),
            },
          });

          if (updatedUser) {
            return {
              ok: true,
            };
          } else {
            return {
              ok: false,
              error: "프로필을 업데이트할 수 없었습니다.",
            };
          }
        } catch (error) {
          console.error("프로필 업데이트 중 에러:", error);
          return {
            ok: false,
            error: "인증 오류 또는 프로필 업데이트 실패",
          };
        }
      }
    ),
  },
};

export default resolver;
