import { Icon } from "@chakra-ui/react"
import { TbSlash } from "react-icons/tb";
import { VscSymbolEvent } from "react-icons/vsc";
import { TbTilde } from "react-icons/tb";


const IconUI = ({ as, boxSize, color, bg }) => {
    return (
        <Icon as={as} boxSize={boxSize ? boxSize : "6"} color={color ? color : "black"} bg={bg ? bg : "white"} />
    )
}

const TbSlashIcon = () => {
    return <IconUI as={TbSlash} />
}
const VscSymbolEventIcon = () => {
    return <IconUI as={VscSymbolEvent} />
}

const TbTildeIcon = () => {
    return <IconUI as={TbTilde} />
}

export { 
    IconUI, 

    // icons
    TbSlashIcon as SlashIcon,
    VscSymbolEventIcon as EventIcon,
    TbTildeIcon as PrefixIcon
}