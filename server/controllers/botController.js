import Bot from "../models/Bot.js";
import Feature from "../models/Feature.js";
import { Client, GatewayIntentBits } from "discord.js";

const botList = [];

function findClientByToken(token) {
    return botList.find(b => b.token === token);
}

export const BotAdd = async (req, res) => {
    const { token } = req.body;
    if (!token) return res.status(400).json({ message: "Token zorunlu." });

    let existing = await Bot.findOne({ token });
    if (existing) return res.json({ message: "Bu bot zaten kayıtlı." });

    try {
        const tempClient = new Client({ intents: [GatewayIntentBits.Guilds] });
        await tempClient.login(token);

        const newBot = new Bot({
            token,
            botId: tempClient.user.id,
            username: tempClient.user.username
        });

        await newBot.save();
        await tempClient.destroy();

        res.json({ message: "Bot kaydedildi.", bot: newBot });
    } catch (err) {
        res.status(500).json({ message: "Token geçersiz ya da bot bağlanamadı.", error: err.message });
    }
};

export const BotStart = async (req, res) => {
    const { id } = req.params;
    const bot = await Bot.findById(id);
    if (!bot) return res.status(404).json({ message: "Bot bulunamadı." });

    if (findClientByToken(bot.token)) {
        return res.json({ status: true, message: "Bu bot zaten çalışıyor." });
    }

    const client = new Client({
        intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
    });

    client.on("messageCreate", async message => {
        if (message.author.bot) return;

        const features = await Feature.find({ bot: bot._id });

        for (const feature of features) {
            if (!feature.status) continue;

            if (feature.name === "hello" && message.content === "hello") {
                message.channel.send(feature.value || "Hello there!");
            }
        }
    });

    try {
        await client.login(bot.token);
        botList.push({ token: bot.token, client });
        res.json({ status: true, message: `Bot başlatıldı: ${client.user.tag}` });
    } catch (err) {
        res.status(500).json({ status: false, message: "Bot başlatılamadı", error: err.message })
    }
};

export const BotStop = async (req, res) => {
    const { id } = req.params
    const bot = await Bot.findById(id)
    if (!bot) return res.status(404).json({ message: "Bot bulunamadı." })

    const index = botList.findIndex(b => b.token === bot.token)
    if (index === -1) return res.json({ message: "Bot zaten çalışmıyor." })

    await botList[index].client.destroy()
    botList.splice(index, 1)
    res.json({ message: "Bot durduruldu." })
}

export const GetBots = async (req, res) => {
    const bots = await Bot.find()
    res.json(bots)
}
