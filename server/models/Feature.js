import mongoose from "mongoose";

const featureSchema = new mongoose.Schema({
    panelId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
});

export default mongoose.model("Feature", featureSchema);
