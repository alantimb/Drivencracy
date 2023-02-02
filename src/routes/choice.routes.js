import { Router } from "express";
import { createChoice } from "../controllers/choice.controller.js";
import { choiceValidation } from "../middlewares/choice.middleware.js";

const router = Router();

router.post("/choice", choiceValidation, createChoice);

export default router;
