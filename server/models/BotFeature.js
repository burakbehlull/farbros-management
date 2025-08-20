import mongoose from "mongoose";

const botFeatureSchema = new mongoose.Schema({
    panelId: { type: String, required: true },
	feature: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Feature", 
        required: true 
    },
    bot: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Bot", 
        required: false 
    },
    status: { type: Boolean, default: false },
});

export default mongoose.model("BotFeature", botFeatureSchema);
