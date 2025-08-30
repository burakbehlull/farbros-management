import { Box } from "@chakra-ui/react";
import { CardUI } from "@ui";
import { SlashIcon, EventIcon, PrefixIcon } from "@icons";

const CardItemUI = ({ title, description, icon, ...props }) => {
    return (
        <Box flex={{ base: "0 0 100%", sm: "0 0 calc(50% - 16px)", md: "0 0 calc(33.33% - 16px)", lg: "0 0 calc(25% - 16px)" }}>
            <CardUI title={title} description={description} icon={icon} {...props} />
        </Box>
    )
};

const controlIconType = (type) => {
        switch(type){
            case 'prefix':
                return <PrefixIcon />;
            case 'slash':
                return <SlashIcon />;
            case 'event':
                return <EventIcon />;
            default:
                return null;
        }
    }

export {
    CardItemUI,
    controlIconType
}