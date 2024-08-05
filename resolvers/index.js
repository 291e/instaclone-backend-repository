import { createAccount } from "./createAccount/createAccount.resolver.js";
import { login } from "./login/login.resolver.js";
import { editProfile } from "./editProfile/editProfile.resolver.js";
import { seeProfile } from "./seeProfile/seeProfile.resolver.js";

export const Mutation = {
  createAccount,
  login,
  editProfile,
};

export const Query = {
  seeProfile,
};
