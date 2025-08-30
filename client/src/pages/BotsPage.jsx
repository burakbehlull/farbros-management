import { Flex, Group } from "@chakra-ui/react";
import { PaginationUI, TextUI } from "@ui";
import { CardItemUI } from "@misc";
import { userAPI } from "../helpers/requests";
import { useEffect, useState } from "react";

export default function BotsPage() {
    const [bots, setBots] = useState([]);

    useEffect(() => {
        const fetchBots = async () => {
            const response = await userAPI.getUserBots('68ae0bbe6642cd4b63ed9dcd')
            console.log(response);
            setBots(response.bots.bots);
        };
        
        fetchBots();
    }, []);

    return (
        <Flex direction="column" p={4}>
            <Group mb={4} width="100%" display="flex" justifyContent={{
                base: "center",
                sm: "center",
                md: "flex-start"
            }}>
                <TextUI fontSize="2xl" fontWeight="bold" mb={4}>
                    Botlar
                </TextUI>
            </Group>
            <Flex wrap="wrap" gap={4} mb={4} justify="flex-start">
                {bots.length > 0 ? bots.map((bot) => (
                    <CardItemUI key={bot.id} title={bot.username} subtitle={`id: ${bot.botId} | prefix: ${bot.prefix}`} />
                )) : (
                    <TextUI>Botunuz yok.</TextUI>
                )}
            </Flex>
            <Flex mt={10} justify="center">
                <PaginationUI />
            </Flex>
        </Flex>
    );
}