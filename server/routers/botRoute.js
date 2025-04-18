import express from "express";
import {
    BotAdd,
    BotStart,
    BotStop,
    GetBots
} from "../controllers/botController.js";

const router = express.Router();

router.post("/", BotAdd);
router.post("/:id/start", BotStart);
router.post("/:id/stop", BotStop);
router.get("/", GetBots);

export default router;
