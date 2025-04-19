import mongoose from "mongoose";

const botFeatureSchema = new mongoose.Schema({
    bot: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Bot", 
        required: true 
    },
    feature: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Feature", 
        required: true 
    },
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
