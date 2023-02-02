import { Router } from "express";
import { createPoll, findPolls } from "../controllers/poll.controlller.js";
import { pollValidation } from "../middlewares/poll.middleware.js";

const router = Router();

router.post("/poll", pollValidation, createPoll);
router.get("/poll", findPolls);

export default router;
