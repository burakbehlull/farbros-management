import { Box, Flex, Link } from "@chakra-ui/react";
import { TextUI } from "@ui";
import { useNavigate } from "react-router-dom"

export default function Navbar() {
    const navigate = useNavigate();
    const handleNavigate = (path) => navigate(path);
    
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
                    <Link onClick={()=> handleNavigate('/')}>Home</Link>
                    <Link onClick={() => handleNavigate("/about")}>About</Link>
                    <Link onClick={() => handleNavigate("/contact")}>Contact</Link>
                </Flex>

                <Box flex="1">
                </Box>
            </Flex>
    );
}
