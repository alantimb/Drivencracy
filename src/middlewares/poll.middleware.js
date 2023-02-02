import dayjs from "dayjs";
import { pollSchema } from "../schema/poll.schema.js";

export async function pollValidation(req, res, next) {
  const { title, expireAt } = req.body;

  if (!expireAt || expireAt === null || expireAt === "") {
    const today = dayjs().format("YYYY-MM-DD HH:mm");
    expireAt: dayjs(Date.now()).add(30, "day").format("YYYY-MM-DD HH:mm");
  }

  const poll = { title, expireAt };

  const { error } = pollSchema.validate(poll, { abortEarly: false });

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return res.status(422).send(errorMessages);
  }

  // try {
  //   const existPoll = await pollsCollection.findOne({ title: poll.title });
  //   console.log(existPoll);
  //   if (existPoll) {
  //     return res.status(409).send("A enquete já existe!");
  //   }

  // } catch (err) {
  //   res.status(500).send("Problema no servidor");
  // }

  res.locals.poll = poll;

  next();
}
