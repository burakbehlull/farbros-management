import mongoose from "mongoose";

const botFeatureSchema = new mongoose.Schema({
	feature: { type: mongoose.Schema.Types.ObjectId, ref: "Features", required: true },
    bot: { type: mongoose.Schema.Types.ObjectId, ref: "Bot", required: false },
    status: { 
		type: Boolean, 
		default: false 
	}, 
    value: { 
		type: String, 
		default: "" 
	}
});

export default mongoose.model("BotFeature", botFeatureSchema);
