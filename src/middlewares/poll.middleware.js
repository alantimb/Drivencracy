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

  res.locals.poll = poll;

  next();
}
