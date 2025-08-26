import { Button } from "@chakra-ui/react";

export default function ButtonUI({ children, ...props }) {
    return (
        <Button {...props} size={"sm" ?? props.size}>
            {children}
        </Button>
    );
}
