import { Box, Flex, Highlight } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { TextUI, ButtonUI } from '@ui';

export default function Home() {

    const navigate = useNavigate();
    const handleNavigate = (path) => navigate(path);
    const isAuth = true
    
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

                    <Box mt={7} display={'flex'} gap={4} justifyContent={"center"}>
                        
                        {isAuth ? <ButtonUI size="lg" onClick={() => handleNavigate('/dashboard')}>Start</ButtonUI> :
                            <>
                            <ButtonUI 
                                size="lg" 
                                onClick={() => handleNavigate('/login')} bg="cyan.600"
                                _hover={{
                                    bg: "cyan.700"
                                }}
                            >Login</ButtonUI>

                            <ButtonUI 
                                size="lg" 
                                onClick={() => handleNavigate('/register')} bg="red.600"
                                _hover={{
                                    bg: "red.700"
                                }}
                            >Register</ButtonUI>
                            </>
                        }
                    </Box>
                </Box>
            </Flex>
        </>
    );
}
