import { Icon } from "@chakra-ui/react"
import { TbSlash } from "react-icons/tb";

const IconUI = ({ as, boxSize, color, bg }) => {
    return (
        <Icon as={as} boxSize={boxSize ? boxSize : "6"} color={color ? color : "black"} bg={bg ? bg : "white"} />
    )
}

const TbSlashIcon = () => {
    return <IconUI as={TbSlash} />
}

export { 
    IconUI, 
    
    // icons
    TbSlashIcon 
}