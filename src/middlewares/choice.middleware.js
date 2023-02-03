import { ObjectId } from "mongodb";
import { choicesCollection, pollsCollection } from "../database/db.js";

export async function choiceValidation(req, res, next) {
  const { title, pollId } = req.body;

  try {
    if (!title) {
      res.status(422).send("Opção de voto sem título");
    }

    const existPoll = await pollsCollection.findOne({ _id: ObjectId(pollId) });

    if (!existPoll) {
      res.status(404).send("Enquete não existe");
    }

    const existChoice = await choicesCollection.findOne({ title: title });

    if (existChoice) {
      res.status(409).send("Opção de voto já existente");
    }

    const choice = { title, pollId };

    res.locals.choice = choice;
  } catch (err) {
    res.status(500).send("Problema no servidor");
  }

  next();
}
