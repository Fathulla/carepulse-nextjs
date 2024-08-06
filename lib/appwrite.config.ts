import * as sdk from "node-appwrite";
import { serverTokens } from "@/utils/serverTokens";

const {nextPublicEndpoint, projectId, apiKey} = serverTokens;

const client = new sdk.Client()
    .setEndpoint(nextPublicEndpoint)
    .setProject(projectId)
    .setKey(apiKey)

export const users = new sdk.Users(client);
export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
