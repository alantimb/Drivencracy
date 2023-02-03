import { Router } from "express";
import { createChoice, findChoices } from "../controllers/choice.controller.js";
import { choiceValidation } from "../middlewares/choice.middleware.js";

const router = Router();

router.post("/choice", choiceValidation, createChoice);
router.get("/poll/:id/choice", findChoices);

export default router;
