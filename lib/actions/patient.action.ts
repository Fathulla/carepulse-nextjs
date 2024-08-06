"use server"

import { ID, Query } from "node-appwrite";
import { databases, storage, users } from "../appwrite.config";
import { parseStringify } from "../utils";
import { InputFile } from "node-appwrite/file";
import { serverTokens } from "@/utils/serverTokens";

const {
  nextPublicBucketId,
  databaseId,
  patientCollectionId,
  nextPublicEndpoint,
  projectId
} = serverTokens;

export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(
      ID.unique(), //? Уникальный идентификатор
      user.email, //? Почта
      user.phone, //? Номер телефона
      undefined, //? Пароль
      user.name //? Имя
    );

    return newUser;
  } catch (error: any) {
    if (error && error?.code === 409) {
      const documents = await users.list([Query.equal("email", [user.email])]);

      return documents.users[0];
    }
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);

    return parseStringify(user);
  } catch (error) {
    console.log(error);
  }
};

export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    let file;

    if (identificationDocument) {
      const inputFile = InputFile.fromBuffer(
        identificationDocument?.get("blobFile") as Blob,
        identificationDocument?.get("fileName") as string
      );

      file = await storage.createFile(
        nextPublicBucketId,
        ID.unique(),
        inputFile
      );
    }

    const newPatient = await databases.createDocument(
      databaseId,
      patientCollectionId,
      ID.unique(),
      {
        identificationDocumentId: file?.$id || null,
        identificationDocumentUrl: `${nextPublicEndpoint}/storage/buckets/${nextPublicBucketId}/files${file?.$id}/view?project=${projectId}`,
        ...patient,
      }
    );

    return parseStringify(newPatient);
  } catch (error) {
    console.log(error);
  }
};
