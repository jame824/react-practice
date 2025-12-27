import { Client, Query, ID, TablesDB } from "appwrite";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;

const client = new Client()
  .setEndpoint('https://sfo.cloud.appwrite.io/v1')
  .setProject(PROJECT_ID);

const database = new TablesDB(client);

export const updateSearchCount = async (searchTerm, movie) => {
  try {
    const result = await database.listRows(DATABASE_ID, COLLECTION_ID, [
      Query.equal('searchTerm', searchTerm)
    ]);

    if (result.rows.length > 0) {
      const doc = result.rows[0];

      await database.updateRow(DATABASE_ID, COLLECTION_ID, doc.$id, {
        count: doc.count + 1
      })
    } else {
      await database.createRow(DATABASE_ID, COLLECTION_ID, ID.unique, {
        searchTerm,
        count: 1,
        movie_id: movie.id,
        poster_url: `https://image.imdb.org/t/p/w500/${movie.poster_path}`
      });
    }
  } catch (e) {
    console.log(e);
  }
}

export const getTrendingMovies = async () => {
  try {
    const result = await database.listRows(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc('count')
    ])

    return result.rows;
  } catch (e) {
    console.log(e);
  }
}