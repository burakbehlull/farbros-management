import { bot } from "../index.js"

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

export {
    BotStart
}