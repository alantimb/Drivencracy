import dayjs from "dayjs";
import { pollSchema } from "../schema/poll.schema.js";

export async function pollValidation(req, res, next) {
  const { title, expireAt } = req.body;

  const { error } = pollSchema.validate(
    { title, expireAt },
    { abortEarly: false }
  );

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return req.status()
  }

  next();
}
