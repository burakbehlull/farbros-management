import { GatewayIntentBits } from "discord.js"

class Misc {
    IntensAll(){
        return Object.keys(GatewayIntentBits).map((intent) => GatewayIntentBits[intent])
    }
}


export default Misc