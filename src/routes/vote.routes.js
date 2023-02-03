import { Router } from "express";
import { toVote } from "../controllers/vote.controller.js";
import { voteValidation } from "../middlewares/vote.middleware.js";

const router = Router();

router.post("/choice/:id/vote", voteValidation, toVote);

export default router;
