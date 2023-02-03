import { ObjectId } from "mongodb";
import { choicesCollection, pollsCollection } from "../database/db.js";

export async function createChoice(req, res) {
  const choice = res.locals.choice;

  try {
    await choicesCollection.insertOne(choice);

    res.status(201).send("Opção de voto criada com sucesso");
  } catch (err) {
    res.status(500).send("Problema no servidor");
  }
}

export async function findChoices(req, res) {
  const id = req.params.id;
  console.log(id);
  try {
    const pollExist = await pollsCollection.findOne({ _id: new ObjectId(id) });

    if (!pollExist) {
      return res.status(404).send("Enquete não existente");
    }

    const choices = await choicesCollection.find({ pollId: id }).toArray();

    res.status(201).send(choices);
  } catch (err) {
    res.status(500).send("Problema no servidor");
  }
}
