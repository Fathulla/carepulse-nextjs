"use server"

import { ID } from "node-appwrite";
import { databases } from "../appwrite.config";
import { serverTokens } from "@/utils/serverTokens";
import { parseStringify } from "../utils";

const {
  databaseId,
  appointmentCollectionId,
} = serverTokens;


export const createAppointment = async (appointment: CreateAppointmentParams) => {
  try {
    const newAppointment = await databases.createDocument(
      databaseId,
      appointmentCollectionId,
      ID.unique(),
      appointment
    );

    return parseStringify(newAppointment);
  } catch (error) {
    console.log(error);
  }
}