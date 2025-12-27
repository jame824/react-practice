import { Client, Query, ID, TablesDB } from "appwrite";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;

// TODO: Access Appwrite

export const updateSearchCount = async () => {
  // TODO: 
  // 1. Use Appwrite API to check if a document already exists in the DB
  // 2. If it does, the movie has been searched before so update count
  // 3. If none found, create a new document and set the count to 1
}

export const getTrendingMovies = async () => {
  // TODO:
}