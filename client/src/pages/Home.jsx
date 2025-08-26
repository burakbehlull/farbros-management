import { Box, Flex } from '@chakra-ui/react';
import { TextUI, ButtonUI } from '@ui';
export default function Home() {
    return (
        <>
            <Flex direction="column" height="100vh" padding="15px"
                justifyContent={"center"}
                alignItems={"center"}
            >
                <Box textAlign="center">
                    <TextUI fontSize="3xl" fontWeight="bold" mb={4}>
                        Farbros Management
                    </TextUI>

                    <TextUI fontSize="lg">
                        Your one-stop solution for all management needs.
                    </TextUI>

                    <Box mt={5}>
                        <ButtonUI size="lg">Start</ButtonUI>
                    </Box>
                </Box>
            </Flex>
        </>
    );
}
