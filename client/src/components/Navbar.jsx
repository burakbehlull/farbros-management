import { Box, Flex, Link } from "@chakra-ui/react";
import { TextUI } from "@ui";

export default function Navbar() {
    return (
            <Flex
                as="nav"
                align="center"
                justify="space-between"
                wrap="wrap"
                padding="1rem"
                width="100%"
            >
                <Box flex="1">
                    <TextUI fontSize="xl" fontWeight="bold" color={{ base: "black", _dark: "white" }}>
                    Farbros Management
                    </TextUI>
                </Box>

                <Flex flex="1" justify="center" gap="2rem">
                    <Link>Home</Link>
                    <Link>About</Link>
                    <Link>Contact</Link>
                </Flex>

                <Box flex="1">
                </Box>
            </Flex>
    );
}
