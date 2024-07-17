"use server";
import EmailTemplate from "@/components/payments/EmailTemplete";
import {
  createUser,
  findUserByCredentials,
  getEventById,
  updateGoing,
  updateInterest,
} from "@/connectDb/queries";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Resend } from "resend";
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
  revalidatePath("/");
};

//Handle add going form ==================
export const addGoingEvent = async (eventId, user) => {
  try {
    await updateGoing(eventId, user?.id);
    await sendEmail(eventId, user);
  } catch (error) {
    throw error;
  }
  revalidatePath("/");
  redirect("/");
};

export const sendEmail = async (eventId, user) => {
  try {
    const event = await getEventById(eventId);
    const resend = new Resend(process.env.RESEND_API_KEY);
    const message = `Dear ${user?.name}, you have been successfully registered for the event, ${event?.name}. Please carry this email and your official id to the venue. We are excited to have you here.`;
    const sent = await resend.emails.send({
      from: "nahid.com",
      to: user?.email,
      subject: "Successfully registered for the event",
      react: EmailTemplate({ message }),
    });
  } catch (error) {
    throw error;
  }
};
