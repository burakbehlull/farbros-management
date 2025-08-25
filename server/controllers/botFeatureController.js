// feature codes..
import { botFeatureService } from "#services";

const { getFeaturesByBotId } = botFeatureService


// Get Bot Feature By Id
const GetBotFeatureById = async (req,res) => {
    try {
        const features = await getFeaturesByBotId(req.body.botId);
        return res.status(200).json({ status: true, data: features });
    } catch (err) {
        console.error("[bot feature controller  - Get Bot Features]:", err);
        return res.status(500).json({ message: "Özellikler getirilemedi.", error: err.message });
    }
}

export {
    GetBotFeatureById
}