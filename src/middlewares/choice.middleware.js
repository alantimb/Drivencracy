import { ObjectId } from "mongodb";
import { choicesCollection, pollsCollection } from "../database/db.js";
import { choiceSchema } from "../schema/choice.schema.js";

export async function choiceValidation(req, res, next) {
  const { title, pollId } = req.body;
  const choice = { title, pollId: pollId };

  try {
    const { error } = choiceSchema.validate(choice, { abortEarly: false });

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(422).send(errorMessages);
    }

    const existPoll = await pollsCollection.findOne({
      _id: ObjectId(choice.pollId),
    });

    if (!existPoll) {
      return res.status(404).send("Enquete não existe");
    }

    const existChoice = await choicesCollection.findOne({
      title: choice.title,
    });

    if (existChoice) {
      return res.status(409).send("Opção de voto já existente");
    }

    res.locals.choice = choice;
  } catch (err) {
    return res.status(500).send("Problema no servidor");
  }

  next();
}
