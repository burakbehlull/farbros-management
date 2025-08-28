import { Box, Flex } from "@chakra-ui/react"
import { Layout } from "@pages"
import { Navbar } from "@components"

function App() {

  return (
    <>
      <Flex direction="column" padding="15px">
        <Box
          height="10vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
          // bg={{ base: "blue.500", _dark: "gray.800" }}
          px={{base: 0, sm: 8, md: 8}}
        >
          <Navbar />
        </Box>


          <Box
            flex="1"
            pt={4}
          >
            <Layout />
          </Box>
        </Flex>
      
    </>
  )
}

export default App
