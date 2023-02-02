import { choicesCollection } from "../database/db.js";

export async function createChoice(req, res) {
  const choice = res.locals.choice;

  try {
    await choicesCollection.insertOne(choice);

    res.status(201).send("Opção de voto criada com sucesso");
  } catch (err) {
    res.status(500).send("Problema no servidor");
  }
}
