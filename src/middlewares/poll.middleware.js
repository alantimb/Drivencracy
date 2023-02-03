import dayjs from "dayjs";
import { pollSchema } from "../schema/poll.schema.js";

export async function pollValidation(req, res, next) {
  const { title, expireAt } = req.body;

  const poll = { title, expireAt };

  const { error } = pollSchema.validate(poll, { abortEarly: false });

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return res.status(422).send(errorMessages);
  } else if (poll.expireAt === "" || poll.expireAt === null) {
    const expireAtDate = dayjs().add(30, "day").format("YYYY-MM-DD HH:mm");

    const poll = { title, expireAt: expireAtDate };

    res.locals.poll = poll;

    return next();
  }
  res.locals.poll = poll;

  next();
}
