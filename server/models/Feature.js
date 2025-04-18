import mongoose from "mongoose"

const featureSchema = new mongoose.Schema({
    bot: { 
		type: mongoose.Schema.Types.ObjectId, 
		ref: "Bot", 
		required: true 
	},
    name: { 
		type: String, 
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
})

export default mongoose.model("Feature", featureSchema)
