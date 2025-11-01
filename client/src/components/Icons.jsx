import { Icon } from "@chakra-ui/react"
import { TbSlash } from "react-icons/tb";
import { VscSymbolEvent, VscDebugStart, VscDebugStop } from "react-icons/vsc";
import { TbTilde } from "react-icons/tb";
import { BiLeftArrowAlt } from "react-icons/bi";


const IconUI = ({ as, boxSize, color, bg, ...props }) => {
    return (
        <Icon as={as} boxSize={boxSize ? boxSize : "6"} color={color ? color : "black"} bg={bg ? bg : "white"} {...props} />
    )
}

const TbSlashIcon = () => {
    return <IconUI as={TbSlash} />
}

const BiLeftArrowAltIcon = ({...props}) => {
    return <IconUI as={BiLeftArrowAlt} {...props} />
}
const VscSymbolEventIcon = () => {
    return <IconUI as={VscSymbolEvent} />
}

const TbTildeIcon = () => {
    return <IconUI as={TbTilde} />
}

const VscDebugStartIcon = ({...props}) => {
    return <IconUI as={VscDebugStart} {...props} />
}

const VscDebugStopIcon = ({...props}) => {
    return <IconUI as={VscDebugStop} {...props} />
}

export { 
    IconUI, 

    // icons
    TbSlashIcon as SlashIcon,
    VscSymbolEventIcon as EventIcon,
    TbTildeIcon as PrefixIcon,

    VscDebugStartIcon,
    VscDebugStopIcon,
	BiLeftArrowAltIcon
}