import { botService } from "#services";
import { Client } from "discord.js";
import { intentsAll, findClientByToken } from "#helpers";

const { addBot, getAllBots, getBotById } = botService
export const botList = [];

export const BotAdd = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ message: "Token zorunludur." });
    }

    const exists = await getAllBots();
	const isToken = findClientByToken(exists, token)
    if (isToken) return res.status(409).json({ message: "Bu bot zaten kayıtlı." });
    

    const botClient = new Client({ intents: intentsAll() });
    await botClient.login(token);

    const newBotData = {
      token,
      botId: botClient.user.id,
      username: botClient.user.username,
    };

    const newBot = await addBot(newBotData);
    await botClient.destroy();

    return res.status(201).json({ message: "Bot kaydedildi.", bot: newBot });
  } catch (err) {
    console.error("[bot controller - BotAdd]:", err);
    return res.status(500).json({ message: "Token geçersiz ya da bot bağlanamadı.", error: err.message });
  }
};

export const GetBots = async (req, res) => {
  try {
    const bots = await getAllBots();
    return res.status(200).json(bots);
  } catch (err) {
    console.error("[bot controller - GetBots]:", err);
    return res.status(500).json({ message: "Botlar alınırken hata oluştu.", error: err.message });
  }
};

export const BotStart = async (req, res) => {
  try {
    const { id } = req.params;
    const bot = await getBotById(id);
    if (!bot) return res.status(404).json({ message: "Bot bulunamadı." });

    if (findClientByToken(botList, bot.token)) {
      return res.status(200).json({ status: true, message: "Bot zaten çalışıyor." });
    }

    const client = new Client({ intents: intentsAll() });
    await client.login(bot.token);

    botList.push({ token: bot.token, client });
    return res.status(200).json({ status: true, message: "Bot başlatıldı." });
  } catch (err) {
    console.error("[bot controller - BotStart]:", err);
    return res.status(500).json({ message: "Bot bağlanamadı.", error: err.message });
  }
};

export const BotStop = async (req, res) => {
  try {
    const { id } = req.params;
    const bot = await getBotById(id);
    if (!bot) return res.status(404).json({ message: "Bot bulunamadı." });

    const index = botList.findIndex(b => b.token === bot.token);
    if (index === -1) return res.status(400).json({ message: "Bot zaten çalışmıyor." });

    await botList[index].client.destroy();
    botList.splice(index, 1);

    return res.status(200).json({ status: true, message: "Bot durduruldu." });
  } catch (err) {
    console.error("[bot controller - BotStop]:", err);
    return res.status(500).json({ status: false, message: "Bot durdurulamadı.", error: err.message });
  }
};
