import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/dataUtil";
import { EventModel } from "./model/eventModel";

export const getAllEvents = async () => {
  const allEvents = await EventModel.find().lean(); // .lean use to remove extra metadata information
  return replaceMongoIdInArray(allEvents); //replaceMongoIdInArray(Arr) this function use for change id
};

export const getEventById = async (id) => {
  const singleEvent = await EventModel.findById(id).lean();
  return replaceMongoIdInObject(singleEvent);
};
