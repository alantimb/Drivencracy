import { ObjectId } from "mongodb";
import { choicesCollection, pollsCollection } from "../database/db.js";

export async function createChoice(req, res) {
  const choice = res.locals.choice;

  try {
    await choicesCollection.insertOne({
      title: choice.title,
      pollId: ObjectId(choice.pollId),
    });

    return res.status(201).send("Opção de voto criada com sucesso");
  } catch (err) {
    return res.status(500).send("Problema no servidor");
  }
}

export async function findChoices(req, res) {
  const id = req.params.id;

  try {
    const existPoll = await pollsCollection.findOne({ _id: new ObjectId(id) });

    if (!existPoll) {
      return res.status(404).send("Enquete não existente");
    }

    const choices = await choicesCollection
      .find({ pollId: ObjectId(id) })
      .toArray();

    return res.status(201).send(choices);
  } catch (err) {
    return res.status(500).send("Problema no servidor");
  }
}
