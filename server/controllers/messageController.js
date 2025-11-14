import Message from '../libs/Message.js';
import { botList } from './botController.js';

import { botService } from "#services";
const { getBotById } = botService


const CreateMessage = async(req, res) => {
    const { botId, userId, messageId, serverId, channelId, content, type, genre } = req.body;
   

    try {

        const bot = await getBotById(botId);
        if (!bot) return res.status(404).json({ message: "Bot bulunamadı." });

        const index = botList.findIndex(b => b.token === bot.token);
        if (index === -1) return res.status(400).json({ message: "Bot zaten çalışmıyor." });

        const client = botList[index].client
        

        const message = new Message(client, {
            userId: userId,
            serverId: serverId,
            messageId: messageId,
            channelId: channelId,
            content: content
        });

        switch (type) {
            case 'send':
                message.send(genre)
            case 'reply':
                message.reply(genre)
        }

        return res.status(200).json({
            status: true,
            message: 'Mesaj işlemi başarılı.'
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: 'Mesaj işlemi başarısız.',
            error: error.message
        });
    }
}


const GetMessages = async(req, res) => {
    const { botId, userId, serverId, channelId, type } = req.body;
    try {

        const bot = await getBotById(botId);
        if (!bot) return res.status(404).json({ message: "Bot bulunamadı." });

        const index = botList.findIndex(b => b.token === bot.token);
        if (index === -1) return res.status(400).json({ message: "Bot zaten çalışmıyor." });

        const client = botList[index].client
        const message = new Message(client, {
            userId: userId,
            serverId: serverId,
            channelId: channelId
        });
        const messages = await message.getMessages(type);
        return res.status(200).json({
            status: true,
            message: 'Mesajlar başarıyla alındı.',
            data: messages
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: 'Mesajlar alınırken hata oluştu.',
            error: error.message
        });
    }
}

export { 
    CreateMessage, 
    GetMessages
};