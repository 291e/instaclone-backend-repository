import client from "../../client.js";

export const editProfile = async (_, { id, firstName, lastName, email }) => {
  try {
    const updatedUser = await client.user.update({
      where: { id },
      data: {
        firstName,
        lastName,
        email,
      },
    });
    return updatedUser;
  } catch (error) {
    console.log(error);
    return null;
  }
};
