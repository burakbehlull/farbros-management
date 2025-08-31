import { Avatar, Button, Card } from "@chakra-ui/react"

const CardUI = ({title, description, subtitle, icon, detailButton, detailClick, addButton, addClick}) => {
    return (
        <Card.Root width="320px">
            <Card.Body gap="2">
                {icon && <Avatar.Root size="lg" shape="rounded"
                    bg={"white"}
                >
                    {icon && icon}
                </Avatar.Root>}
                <Card.Title mt="2">{title}</Card.Title>
                {description &&<Card.Description>
                    {description}
                </Card.Description> }
                {subtitle && <Card.Description mt={3}>
                    {subtitle}
                </Card.Description>}
            </Card.Body>
            <Card.Footer justifyContent="flex-end">
                {detailButton && <Button variant="outline" onClick={detailClick}>{detailButton}</Button>}
                {addButton && <Button onClick={addClick}>{addButton}</Button>}
            </Card.Footer>
        </Card.Root>
    )
}

export default CardUI
