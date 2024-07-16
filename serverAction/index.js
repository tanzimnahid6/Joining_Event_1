"use server";
import {
  createUser,
  findUserByCredentials,
  updateInterest,
} from "@/connectDb/queries";
import { revalidatePath } from "next/cache";
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
//Handle event interested==================
export const addInterested = async (eventId, userId) => {
  try {
    await updateInterest(eventId, userId);
  } catch (error) {
    throw error;
  }
  revalidatePath("/")
};
