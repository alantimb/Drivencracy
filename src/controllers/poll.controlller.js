import { pollsCollection } from "../database/db.js";

export async function createPoll(req, res) {
  const poll = res.locals.poll;

  try {
    const existPoll = await pollsCollection.findOne({ title: poll.title });
    
    if (existPoll) {
      return res.status(409).send("A enquete já existe!");
    }
    await pollsCollection.insertOne(poll);

    res.status(201).send("Enquete adicionada com sucesso");
  } catch (err) {
    res.status(500).send("Problema no servidor");
  }
}

export async function findPolls(req, res) {
  try {
    const polls = await pollsCollection.find().toArray();

    res.send(polls);
  } catch (err) {
    res.status(500).send("Problema no servidor");
  }
}
