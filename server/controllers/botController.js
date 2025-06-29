import { Bot } from "#models"
import { Client } from "discord.js"
import { intentsAll, findClientByToken } from "#helpers"

export const botList = [] 

export const Test = async (req, res) => {
	
	res.status(200).json({status: true})
}

export const BotAdd = async (req, res) => {
	try {
		const { token } = req.body
		if (!token) return res.status(400).json({ message: "Token zorunludur." })
	    
		const botDoc = await Bot.findOne({ token })
        if (botDoc) return res.status(409).json({ message: "Bu bot zaten kayıtlı." })
	
		const botClient = new Client({ intents: intentsAll() })
		await botClient.login(token)
		
		const newBot = new Bot({
            token,
            botId: botClient.user.id,
            username: botClient.user.username
        });
		
		await newBot.save();
        await botClient.destroy();
        res.status(201).json({ message: "Bot kaydedildi.", bot: newBot });
	
	} catch(err) {
		console.error("[bot controller - BotAdd]: ", err)
        res.status(500).json({ message: "Token geçersiz ya da bot bağlanamadı.", error: err.message });
	}
}


export const GetBots = async (req, res) => {
    try {
        const bots = await Bot.find({})
        res.status(200).json(bots)
    } catch (err) {
        console.error("[bot controller - GetBots]: Botları çekme hatası:", err)
        res.status(500).json({ message: "Botlar alınırken hata oluştu.", error: err.message })
    }
};

export const BotStart = async (req, res) => {
	try {
		const { id } = req.params;
		const bot = await Bot.findOne({ botId: id });
        if (!bot) return res.status(404).json({ message: "Bot bulunamadı." });

        if (findClientByToken(botList, bot.token)) {
            return res.status(200).json({ status: true, message: "Bot zaten çalışıyor." });
        }

        const client = new Client({ intents: intentsAll() });
        await client.login(bot.token);

        botList.push({ token: bot.token, client });

        res.status(200).json({ status: true, message: "Bot başlatıldı." });
	} catch(err){
        console.error("[bot controller - BotStart]: Botu başlatma hatası:", err)
        res.status(500).json({ message: "Bot bağlanamadı.", error: err.message });
		
	}
}


