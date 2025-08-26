import mongoose from "mongoose"

const botSchema = new mongoose.Schema({
    token: { type: String, unique: true, required: true },
    botId: { type: String },
    username: { type: String },
    prefix: { type: String, default: "." },

    // user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
})

export default mongoose.model("Bot", botSchema)