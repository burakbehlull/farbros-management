export default async function checkFeature(panelId) {
    // const feature = await BotFeature.findOne({ name });
    const feature = botFeatureList.find((feature)=> feature.panelId === panelId)
    if(!feature || !feature.status) return false
    return feature.status
}