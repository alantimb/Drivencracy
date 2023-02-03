import joi from "joi";
import date from "@joi/date";

const JoiDate = joi.extend(date);

export const pollSchema = joi.object({
  title: joi.string().min(3).required(),
  expireAt: JoiDate.date().empty("").format("YYYY-MM-DD HH:mm"),
});
