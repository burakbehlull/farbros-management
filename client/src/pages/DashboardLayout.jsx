
import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "@components";


export default function DashboardLayout() {
    console.log("DashboardLayout page");
    return (
        <Flex width="100%" height="85vh"
            direction={{ base: "column", md: "row" }}
        >
            <Box 
                flex="0 0 25%" 
                // bg="red.100" 
                p="4"
                display={"flex"}
                justifyContent="center"
            >
                <Sidebar />
            </Box>

            <Box flex="0 0 70%" p="4">
                <Outlet />
            </Box>
        </Flex>
    );
}