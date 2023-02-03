import joi from "joi";
import date from "@joi/date";

const joiDate = joi.extend(date);

export const voteSchema = joi.object({
  createdAt: joiDate.date().format("YYYY-MM-DD HH:mm"),
  choiceId: joi.string().alphanum().required(),
});

