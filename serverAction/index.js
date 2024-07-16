"use server";
import { createUser, findUserByCredentials } from "@/connectDb/queries";
import { redirect } from "next/navigation";
// Register User  ============================
export const registerUser = async (formData) => {
  const user = Object.fromEntries(formData);
  const created = await createUser(user);
  redirect("/login");
};

//Login user ================================
export const performLogin = async (formData) => {
  try {
    const found = await findUserByCredentials(formData);
    return found;
  } catch (error) {
    throw error;
  }
};
