import { Box, VStack } from "@chakra-ui/react";
import { ButtonUI, TextUI } from "@ui";
import { useLocation, useNavigate } from "react-router-dom";


export default function Sidebar() {

  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname.split('/');
  
  const handleNavigation = (path) => {
    navigate(path);
  };

  console.log(`${currentPath[1]} - ${currentPath[2]}`);

  return (
    <Box
      width={{
        base: "100%",
        md: "260px",
        lg: "260px",
      }}
      height={{
        base: "auto",
        md: "60vh",
        lg: "60vh",
      }}
      bg="white"
      p="4"
      justifyContent="center"
      borderStyle="solid"
      borderRightWidth={{
        base: "0px",
        md: "1px",
        lg: "1px",
      }}
      // borderTopWidth={"1px"}
      // borderColor="gray.300"
      borderRadius="md"
    >
      
      <VStack align="stretch" spacing={2}>
        
        <TextUI
            fontSize="sm"
            fontWeight="bold"
            color="black"
            mb="4"
        >
            Menü
        </TextUI>

        <ButtonUI
          //leftIcon={<h1>file</h1>}
          justifyContent="flex-start"
          variant="ghost"   
          bg={currentPath[1] === 'dashboard' & currentPath[2]===undefined && 'gray.800'}
          color={currentPath[1] === 'dashboard' & currentPath[2]===undefined && 'white'}
          _hover={{ bg: "gray.100" }}
          onClick={() => handleNavigation('/dashboard')}
        >
          Anasayfa
        </ButtonUI>

        
        <ButtonUI
          // leftIcon={<h1>file</h1>}
          justifyContent="flex-start"
          variant="ghost"   
          bg={currentPath[2] === 'create-bot' && 'gray.800'}
          color={currentPath[2] === 'create-bot' && 'white'}
          _hover={{ bg: "gray.100" }}
          onClick={() => handleNavigation('/dashboard/create-bot')}
        >
          Bot Ekle
        </ButtonUI>

        <ButtonUI
          //leftIcon={<h1>Bell</h1>}
          justifyContent="flex-start"
          variant="ghost"
          bg={currentPath[2] === 'bots' && 'gray.800'}
          color={currentPath[2] === 'bots' && 'white'}

          _hover={{ bg: "gray.100" }}
          onClick={() => handleNavigation('/dashboard/bots')}
        >
          Botlar
        </ButtonUI>

        <ButtonUI
          // leftIcon={<h1>s</h1>}
          justifyContent="flex-start"
          variant="ghost"
          bg={currentPath[2] === 'add-feature' && 'gray.800'}
          color={currentPath[2] === 'add-feature' && 'white'}

          _hover={{ bg: "gray.100" }}
          onClick={() => handleNavigation('/dashboard/add-feature')}
        >
          Özellik Ekle
        </ButtonUI>

        <ButtonUI
          // leftIcon={<h1>c</h1>}
          justifyContent="flex-start"
          variant="ghost"

          bg={currentPath[2] === 'settings' && 'gray.800'}
          color={currentPath[2] === 'settings' && 'white'}

          _hover={{ bg: "gray.100" }}
          onClick={() => handleNavigation('/dashboard/settings')}
        >
          Ayarlar
        </ButtonUI>
      </VStack> 
    </Box>
  );
}
