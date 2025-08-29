import { Flex, Box } from "@chakra-ui/react";
import { CardUI } from "@ui";
import { SlashIcon, EventIcon, PrefixIcon } from "@icons";

const Item = ({ title, description, icon }) => {
    return (
        <Box flex={{ base: "0 0 100%", sm: "0 0 calc(50% - 16px)", md: "0 0 calc(33.33% - 16px)", lg: "0 0 calc(25% - 16px)" }}>
            <CardUI title={title} description={description} icon={icon} />
        </Box>
    )
};

export default function AddFeatureToBot() {
  return (
    <Flex wrap="wrap" gap={4} mb={4} justify="flex-start">
      <Item title="Kart 1" description="Açıklama 1" />
      <Item title="Kart 2" description="Açıklama 2" icon={<SlashIcon />} />
      <Item title="Kart 3" description="Açıklama 3" icon={<EventIcon />} />
      <Item title="Kart 4" description="Açıklama 4" icon={<PrefixIcon />} />
    </Flex>
  );
}
