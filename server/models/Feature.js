import mongoose from "mongoose";

const featureSchema = new mongoose.Schema({
    name: { 
		type: String, 
		required: true 
	},
    description: { 
		type: String, 
		default: "" 
	}, 
    type: { 
		type: String, 
		enum: ["prefix-command", "slash-command", "event"], 
		required: true 
	},
});

export default mongoose.model("Feature", featureSchema)
