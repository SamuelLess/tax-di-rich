import { Avatar } from "@catalyst/avatar";
import { Navbar as CNav, NavbarDivider, NavbarItem, NavbarLabel, NavbarSection, NavbarSpacer } from "@catalyst/navbar";
import { useLocation } from "react-router";

const Navbar = () => {
	const location = useLocation();
	return (
		<CNav>
			<div></div>
			<Avatar src="/logo.png" style={{ height: 35, width: 35 }} />
			<NavbarLabel className="font-bold">UNDER</NavbarLabel>
			<NavbarDivider />
			<NavbarSection>
				<NavbarItem href="/" current={location.pathname === "/"}>
					Home
				</NavbarItem>
				<NavbarItem href="/other" current={location.pathname === "/other"}>
					Other
				</NavbarItem>
			</NavbarSection>
			<NavbarSpacer />
		</CNav>
	);
}

export default Navbar;
