import { Box, Flex, Link } from "@chakra-ui/react";
import { TextUI, ButtonUI } from "@ui";
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
                margin={{
                    base: "1rem",
                    md: "0",
                    sm: "0"
                }}
                width="100%"
                gap={5}
                mt={{
                    base: 10,
                    md: 0,
                    lg: 0,
                }}
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

                <Box flex="1" display="flex" gap={4}>
                    
                </Box>
            </Flex>
    );
}
