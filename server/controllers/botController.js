import { botFeatureService, botService, featureService } from "#services";
import { Client, Collection } from "discord.js";
import { intentsAll, findClientByToken, allowToFeatures, loadEvents, loadPrefixCommands, loadSlashCommands, eventExecuter } from "#helpers";

const { addBot, getAllBots, getBotById } = botService
const { getFeatureList, addManyFeatures } = featureService
const { getFeaturesByBotId } = botFeatureService

export const botList = [];


const BotAdd = async (req, res) => {
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

const GetBots = async (req, res) => {
  try {
    const bots = await getAllBots();
    return res.status(200).json(bots);
  } catch (err) {
    console.error("[bot controller - GetBots]:", err);
    return res.status(500).json({ message: "Botlar alınırken hata oluştu.", error: err.message });
  }
};

const BotStart = async (req, res) => {
  try {
    const { id } = req.params;
    const bot = await getBotById(id);
    
    if (!bot) return res.status(404).json({ message: "Bot bulunamadı." });

    if (findClientByToken(botList, bot.token)) {
      return res.status(200).json({ status: true, message: "Bot zaten çalışıyor." });
    }

    const client = new Client({ intents: intentsAll() });

    client.prefixCommands = new Collection()
    client.slashCommands = new Collection()

    const events = await loadEvents();
    const prefixCommands = await loadPrefixCommands();
    const slashCommands = await loadSlashCommands();

    const featureList = [...events, ...prefixCommands, ...slashCommands];
    const botFeatures = await getFeaturesByBotId(bot._id);

    if (botFeatures.length === 0) return res.status(200).json({ status: true, message: "Lütfen özellik ekleyiniz." });

    const allowedFeatures = allowToFeatures(featureList, botFeatures);

    const eventTypeControl = allowedFeatures.filter(af => af.type === 'event');


    // executers
    eventExecuter(client, eventTypeControl);

    for (const commands1 of allowedFeatures) {
      if (commands1.type === 'prefix') {
        client.prefixCommands.set(commands1.name, commands1.execute);
      }
    }

    for (const commands2 of allowedFeatures) {
      if (commands2.type === 'slash') {
        client.slashCommands.set(commands2.data.name, commands2.execute);
      }
    }


    await client.login(bot.token);

    botList.push({ token: bot.token, client });
    return res.status(200).json({ status: true, message: "Bot başlatıldı." });
  } catch (err) {
    console.error("[bot controller - BotStart]:", err);
    return res.status(500).json({ message: "Bot bağlanamadı.", error: err.message });
  }
};

const BotStop = async (req, res) => {
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


export {
	BotAdd,
	GetBots,
	BotStart,
	BotStop
}