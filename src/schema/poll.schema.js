import joi from "joi";

export const pollSchema = joi.object({
  title: joi.string().min(8).required(),
  expireAt: joi.string().required(),
});
