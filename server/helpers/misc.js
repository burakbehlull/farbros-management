import { GatewayIntentBits } from "discord.js"

export function findClientByToken(data, token) {
    return botList.find(b => b.token === token);
}

export function intentsAll() {
	return Object.keys(GatewayIntentBits).map((intent) => GatewayIntentBits[intent])
}