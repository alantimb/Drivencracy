import { pollsCollection } from "../database/db.js";

export async function createPoll(req, res) {
  const poll = res.locals.poll;

  try {
    await pollsCollection.insertOne(poll);
    res.status(201).send("Enquete adicionada com sucesso");
  } catch (err) {
    res.status(500).send("Problema no servidor");
  }
}
