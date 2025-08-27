import { Box, Flex, Highlight } from '@chakra-ui/react';
import { TextUI, ButtonUI } from '@ui';
export default function Home() {
    return (
        <>
            <Flex
                alignItems="center"
                justifyContent="center"
                justifyItems="center"
                height="77vh"
                p={2}
                
            >
                <Box textAlign="center">
                    <TextUI fontSize="4xl" fontWeight="bold" mb={4}>
                        Farbros Management
                    </TextUI>

                    <TextUI fontSize="xl">
                        <Highlight
                        query="solution for all" styles={{ color: "teal.500" }}
                        >Your one-stop solution for all management needs.</Highlight>
                    </TextUI>

                    <Box mt={7}>
                        <ButtonUI size="lg">Start</ButtonUI>
                    </Box>
                </Box>
            </Flex>
        </>
    );
}
