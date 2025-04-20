import { readdirSync } from 'fs';
import path from 'path';
import { pathToFileURL, fileURLToPath } from 'url';
import { Client, GatewayIntentBits } from 'discord.js';

import BotFeature from "../models/BotFeature.js";
import Features from '../models/Features.js';
import Bot from '../models/Bot.js';


export const addBotFeature = async (req, res) => {
    const { botId, featureId, status, value } = req.body;
    if (!botId || !featureId) return res.status(400).json({ message: "botId ve featureId zorunlu." });

    const exists = await BotFeature.findOne({ bot: botId, feature: featureId });
    if (exists) return res.json({ message: "Bu özellik zaten eklenmiş." });

    const botFeature = new BotFeature({ bot: botId, feature: featureId, status, value });
    await botFeature.save();
    res.json({ message: "Bot'a özellik eklendi.", botFeature });
};

export const updateBotFeatureStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await BotFeature.findByIdAndUpdate(id, { status }, { new: true });
    if (!updated) return res.status(404).json({ message: "Özellik bulunamadı." });
    res.json({ message: "Durum güncellendi.", updated });
};

export const getBotFeatures = async (req, res) => {
    const { botId } = req.params;
    const features = await BotFeature.find({ bot: botId }).populate('feature');
    res.json(features);
};

export const saveFeatures = async (req, res) => {
    try {
        const filename = fileURLToPath(import.meta.url);
        const dirname = path.dirname(filename);

        const folders = [
            { type: 'prefix-command', path: path.join(dirname, '../commands/prefix-commands') },
            { type: 'slash-command', path: path.join(dirname, '../commands/slash-commands') },
            { type: 'event', path: path.join(dirname, '../events') }
        ];

        const saved = [];

        for (const folder of folders) {
            const files = readdirSync(folder.path).filter(file => file.endsWith('.js'));

            for (const file of files) {
                const name = file.replace('.js', '');

                // Features tablosuna kaydet veya mevcut kaydı bul
                let feature = await Features.findOne({ name, type: folder.type });
                if (!feature) {
                    feature = new Features({
                        name,
                        type: folder.type
                    });
                    await feature.save();
                    saved.push(name);
                }
            }
        }

        res.status(200).json({
            message: 'Features başarıyla kaydedildi.',
            saved
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Bir hata oluştu.' });
    }
}

export const saveBotFeatures = async (req, res) => {
    try {
        const botId = req.params.botId;

        if (!botId) {
            return res.status(400).json({ error: 'Bot ID gereklidir!' });
        }

        // Bot ID'sine göre botu kontrol et
        const bot = await Bot.findOne({ botId: botId });  // Botu botId'ye göre bul
        if (!bot) {
            return res.status(404).json({ error: 'Bot bulunamadı!' });
        }

        // Bot'un veritabanındaki ObjectId'yi al
        const botObjectId = bot._id;  // Bot'un _id'si

        // Features koleksiyonundaki tüm özellikleri al
        const features = await Features.find({});
        const savedBotFeatures = [];

        // Her bir özellik için BotFeature kaydını kontrol et ve kaydet
        for (const feature of features) {
            // BotFeature kaydını kontrol et (bu bot için var mı?)
            const existing = await BotFeature.findOne({ feature: feature._id, bot: botObjectId });
            if (!existing) {
                const botFeature = new BotFeature({
                    feature: feature._id,
                    bot: botObjectId,  // Bot'un _id'si burada kullanılıyor
                    status: false, // Varsayılan olarak false
                    value: ""      // Varsayılan olarak boş
                });
                await botFeature.save();
                savedBotFeatures.push({ feature: feature.name, botId });
            }
        }

        res.status(200).json({
            message: 'BotFeatures başarıyla kaydedildi.',
            savedBotFeatures
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Bir hata oluştu.' });
    }
}