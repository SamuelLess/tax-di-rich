import { Avatar, Box, Container, Flex, Text } from "@mantine/core";
import { useLocation } from "react-router";

const Navbar = () => {
	const location = useLocation();
	return (
		<Flex h={60} p={10} align={"center"} gap={10}>
			<Avatar src="/logo.png" size={40} />
			<Text td="underline" size="lg">UNDER</Text>
		</Flex>
	);
}

export default Navbar;
