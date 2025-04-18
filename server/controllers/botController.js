import { bot } from "../index.js"
import Bot from "../models/Bot.js"
const BotStart = async (req, res)=>{
    const { token } = req.body
    try {
        await bot.login(token)
        res.json({
            status: true,
            message: `Bot bağlandı: ${client.user.tag}` 
        });

    } catch (err) {
        console.log(err)
        res.status(500).json({
            status: false,
            message: "Bot giriş yapmadı"
        })
    }
}

const BotAdd = async (req,res)=> {
    const { token, features } = req.body
    if (!token) return res.status(400).json({ message: "Token zorunlu." })

    let bot = await Bot.findOne({ token })
    if (bot) return res.json({ message: "Bu bot zaten kayıtlı." })

    bot = new Bot({ token, features: features || [] })
    await bot.save();

    res.json({ message: "Bot kaydedildi.", bot })
}

const GetBots = async(req,res)=> {
    const bots = await Bot.find({});
    res.json(bots)
}

export {
    BotStart,
    BotAdd,
    GetBots
}