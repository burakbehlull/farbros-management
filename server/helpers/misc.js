import { GatewayIntentBits } from "discord.js"

function findClientByToken(data, token) {
    return data.find(b => b.token === token);
}

function intentsAll() {
	return Object.keys(GatewayIntentBits).map((intent) => GatewayIntentBits[intent])
}

export {
    findClientByToken,
    intentsAll
}