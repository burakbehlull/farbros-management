import { Flex, Group } from "@chakra-ui/react";
import { InputAndTextUI, ButtonUI, TextUI } from "@ui"

export default function BotCreatePage(){
    return (
        <Flex direction="column" align="flex-start" justify="center">
            <Group mb={4} width="100%" display="flex" justifyContent={{
                base: "center",
                sm: "center",
                md: "flex-start"
            }}>
                <TextUI fontSize="2xl" fontWeight="bold" mb={4}>
                    Bot Oluştur
                </TextUI>
            </Group>
            <Group 
                mt={4}
                width={{
                    base: "90vw",
                    sm: "90vw",
                    md: "600px"
                }}
                spacing={4} 
                gap={10}
                p={4}
                height="auto"
                display="flex"
                flexDirection={{
                    base: "column",
                    sm: "column",
                    md: "column"
                }}
            >
                <InputAndTextUI label="Bot Token" placeholder="Enter bot token" />
                <ButtonUI>Oluştur</ButtonUI>
            </Group>
        </Flex>
    );
}