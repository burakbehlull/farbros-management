import { Bot } from "#models"
import { Client, GatewayIntentBits } from "discord.js"

export const BotAdd = async (req,res) => {
	try {
		const { token } = req.body
		if (!token) return res.status(400).json({ message: "Token zorunludur." })
	    
		const botDoc = await Bot.findOne({ token })
        if (botDoc) return res.status(409).json({ message: "Bu bot zaten kayıtlı." })
	
		const botClient = new Client({ intents: Object.keys(GatewayIntentBits).map((intent) => GatewayIntentBits[intent]) })
	
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

