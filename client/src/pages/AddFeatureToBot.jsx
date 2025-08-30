import { Flex, Group } from "@chakra-ui/react";

import { PaginationUI, TextUI } from "@ui";
import { SlashIcon, EventIcon, PrefixIcon } from "@icons";
import { CardItemUI } from "@misc";

export default function AddFeatureToBot() {
    return (
        <Flex direction="column" p={4}>

            <Group mb={4} width="100%" display="flex" justifyContent={{
                base: "center",
                sm: "center",
                md: "flex-start"
            }}>
                <TextUI fontSize="2xl" fontWeight="bold" mb={4}>
                    Özellikler
                </TextUI>
            </Group>
            <Flex wrap="wrap" gap={4} mb={4} justify="flex-start">
                <CardItemUI title="Kart 1" description="Açıklama 1" icon={<PrefixIcon />} />
                <CardItemUI title="Kart 2" description="Açıklama 2" icon={<SlashIcon />} />
                <CardItemUI title="Kart 3" description="Açıklama 3" icon={<EventIcon />} />
                <CardItemUI title="Kart 4" description="Açıklama 4" icon={<PrefixIcon />} />
            </Flex>
            <Flex mt={10} justify="center">
                <PaginationUI />
            </Flex>
        </Flex>
    );
}
