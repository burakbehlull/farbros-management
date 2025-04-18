import { bot } from "../index.js"
import Bot from "../models/Bot.js"

const botList = []

const BotStart = async (req, res)=>{
    const { token } = req.body
    
    if (botList.find(b => b.token === token)) return res.json({ status: true, message: "Bu bot zaten çalışıyor." })

    try {
        await bot.login(token)
        botList.push({ token, client: bot })

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

const BotStop = async (req, res) => {
    const { token } = req.body;

    const index = botList.findIndex(b => b.token === token)
    if (index === -1) return res.json({ message: "Bu tokena ait çalışan bot yok." })

    await botList[index].client.destroy()
    botList.splice(index, 1)

    return res.json({ 
        status: true,
        message: "Bot durduruldu." 
    })
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
    BotStop,
    BotAdd,
    GetBots
}