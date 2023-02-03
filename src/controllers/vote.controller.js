import { ObjectId } from "mongodb";
import { votesCollection } from "../database/db.js";

export async function toVote(req, res) {
  const vote = res.locals.vote;
  console.log(vote);
  try {
    await votesCollection.insertOne({ createdAt: vote.createdAt, choiceId: ObjectId(vote.choiceId)});

    return res.status(201).send("Voto registrado com sucesso");
  } catch (err) {
    return res.status(500).send("Problema no servidor");
  }
}
