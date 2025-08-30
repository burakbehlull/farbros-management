import { Avatar, Button, Card } from "@chakra-ui/react"

const CardUI = ({title, description, icon}) => {
    return (
        <Card.Root width="320px">
            <Card.Body gap="2">
                {icon && <Avatar.Root size="lg" shape="rounded"
                    bg={"white"}
                >
                    {icon && icon}
                </Avatar.Root>}
                <Card.Title mt="2">{title}</Card.Title>
                <Card.Description>
                    {description}
                </Card.Description>
                <Card.Description mt={3}>
                    Slash
                </Card.Description>
            </Card.Body>
            <Card.Footer justifyContent="flex-end">
                <Button variant="outline">Detay</Button>
                <Button>Ekle</Button>
            </Card.Footer>
        </Card.Root>
    )
}

export default CardUI
