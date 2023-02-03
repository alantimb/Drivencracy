import joi from "joi";
import date from "@joi/date";

const joiDate = joi.extend(date);

export const pollSchema = joi.object({
  title: joi.string().min(3).required(),
  expireAt: joiDate.date().empty("").format("YYYY-MM-DD HH:mm"),
});
