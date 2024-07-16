import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/dataUtil";
import { EventModel } from "./model/eventModel";
import { UserModel } from "./model/usersModel";
import mongoose from "mongoose";

export const getAllEvents = async () => {
  const allEvents = await EventModel.find().lean(); // .lean use to remove extra metadata information
  return replaceMongoIdInArray(allEvents); //replaceMongoIdInArray(Arr) this function use for change id
};

export const getEventById = async (id) => {
  const singleEvent = await EventModel.findById(id).lean();
  return replaceMongoIdInObject(singleEvent);
};

export const createUser = async (user) => {
  return await UserModel.create(user);
};

export const findUserByCredentials = async (cred) => {
  const user = await UserModel.findOne(cred).lean();
  if (user) {
    return replaceMongoIdInObject(user);
  }
  return null;
};

export const updateInterest = async (eventId, userId) => {
  const event = await EventModel.findById(eventId);
  if (event) {
    const foundUsers = event.interested_ids.find(
      (id) => id.toString() == userId
    );
    if (foundUsers) {
      event.interested_ids.pull(new mongoose.Types.ObjectId(userId)); //have to convert normal id to objectId
    } else {
      event.interested_ids.push(new mongoose.Types.ObjectId(userId));
    }
    event.save();
  }
};
