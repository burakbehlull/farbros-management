import mongoose from "mongoose";

const botFeatureSchema = new mongoose.Schema({
    // panelId: { type: String, required: true },
	feature: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Feature", 
        required: true 
    },
    bot: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Bot", 
        required: true 
    },
    status: { type: Boolean, default: true },
});

export default mongoose.model("BotFeature", botFeatureSchema);
