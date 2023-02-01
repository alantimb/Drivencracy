import { Router } from "express";
import { createPoll } from "../controllers/poll.controlller.js";
import { pollValidation } from "../middlewares/poll.middleware.js";

const router = Router();

router.post("/poll", pollValidation, createPoll);
router.get("/poll", (req, res) => {});

export default router;
