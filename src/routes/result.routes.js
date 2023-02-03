import { Router } from "express";
import { giveResult } from "../controllers/result.controller.js";

const router = Router();

router.get("/poll/:id/result", giveResult);

export default router;
