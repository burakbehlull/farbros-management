import { Text } from "@chakra-ui/react"

const TextUI = ({children,...props}) => {
	return <Text {...props}
		_dark={{color: "white"}}
	>{children}</Text>
}

export default TextUI