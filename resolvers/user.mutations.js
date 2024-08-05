import client from "../client.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createAccount = async (
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
      throw new Error("이 유저네임 혹은 이메일은 이미 존재합니다.");
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
};

export const login = async (_, { userName, password }) => {
  const user = await client.user.findFirst({ where: { userName } });
  if (!user) {
    return {
      ok: false,
      error: "존재하지 않는 유저입니다.",
    };
  }
  const passwordOk = await bcrypt.compare(password, user.password);
  if (!passwordOk) {
    return {
      ok: false,
      error: "잘못된 패스워드입니다.",
    };
  }
  const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);
  return {
    ok: true,
    token,
  };
};
