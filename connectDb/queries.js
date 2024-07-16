import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/dataUtil";
import { EventModel } from "./model/eventModel";
import { UserModel } from "./model/usersModel";

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
