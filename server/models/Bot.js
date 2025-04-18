import { Schema, model } from "mongoose"

const featureSchema = new Schema({
    name: String,
    status: Boolean,
    value: String
})

const botSchema = new Schema({
    token: { 
        type: String, 
        unique: true, 
        required: true 
    },
    botId: { 
        type: String 
    },
    username: { 
        type: String 
    }, 
    features: [featureSchema]
})

export default model('Bot', botSchema)
