import { Box, VStack } from "@chakra-ui/react";
import { ButtonUI, TextUI } from "@ui";


export default function Sidebar() {
  return (
    <Box
      width="15vw"
      height="60vh"
      bg="white"
      p="4"
      justifyContent="center"
      borderStyle="solid"
      borderRightWidth={"1px"}
      // borderTopWidth={"1px"}
      borderColor="gray.300"
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
          leftIcon={<h1>file</h1>}
          justifyContent="flex-start"
          variant="ghost"
          _hover={{ bg: "gray.100" }}
        >
          Bot Oluştur
        </ButtonUI>

        <ButtonUI
          leftIcon={<h1>Bell</h1>}
          justifyContent="flex-start"
          variant="ghost"
          _hover={{ bg: "gray.100" }}
        >
          Botlar
        </ButtonUI>

        <ButtonUI
          leftIcon={<h1>s</h1>}
          justifyContent="flex-start"
          variant="ghost"
          _hover={{ bg: "gray.100" }}
        >
          Bota Özellik Ekle
        </ButtonUI>

        <ButtonUI
          leftIcon={<h1>c</h1>}
          justifyContent="flex-start"
          variant="ghost"
          _hover={{ bg: "gray.100" }}
        >
          Ayarlar
        </ButtonUI>
      </VStack> 
    </Box>
  );
}
