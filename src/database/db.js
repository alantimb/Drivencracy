import { MongoClient} from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);

try {
  await mongoClient.connect();
  console.log("Connected to mongoDB");
} catch (err) {
  console.error(err);
}

const db = mongoClient.db();

export const pollsCollection = db.collection("polls");
export const choicesCollection = db.collection("choices");
export const votesCollection = db.collection("votes");
