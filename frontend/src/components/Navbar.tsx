import { Avatar, Divider, Flex, Text } from "@mantine/core";
import { useLocation } from "react-router";
import styles from "./Navbar.module.css";

const Navbar = () => {
	const location = useLocation();
	return (
		<>
			<Flex h={60} p={10} align={"center"} gap={10} className={styles.root}>
				<Avatar src="/logo.png" size={40} />
				<Text td="underline" size="lg">UNDER</Text>
			</Flex>
			<Divider opacity={0.5}/>
		</>
	);
}

export default Navbar;
