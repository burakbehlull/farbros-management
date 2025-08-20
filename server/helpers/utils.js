import BotFeature from "./models/BotFeature.js";
import { Bot, BotFeature } from "#models";

async function checkFeature(panelId, botId) {
    const bot = await Bot.findOne({ botId });
    if (!bot) return false;

    const feature = await BotFeature.findOne({ panelId, bot: bot._id });
    if (!feature || !feature.status) return false;

    return feature.status;
}

export {
    checkFeature
}