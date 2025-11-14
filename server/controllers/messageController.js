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

        return {
            status: true,
            message: 'Mesaj işlemi başarılı.'
        }
    } catch (error) {
        return {
            status: false,
            message: 'Mesaj işlemi başarısız.',
            error: error.message
        }
    }
}


export { CreateMessage };