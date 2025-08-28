
import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";


export default function DashboardLayout() {
    console.log("DashboardLayout page");
    return (
        <Flex width="100%" height="85vh">
            <Box flex="0 0 30%" bg="red.100" p="4">
                Dashboard Sidebar
            </Box>

            <Box flex="0 0 70%" bg="blue" p="4">
                <Outlet />
            </Box>
        </Flex>
    );
}