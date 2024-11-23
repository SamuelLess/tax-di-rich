import { Car, FlagCheckered } from "@phosphor-icons/react";
import { divIcon, PointExpression } from "leaflet";
import { ReactNode } from "react";
import { renderToString } from "react-dom/server";

const LeafletIcon = (icon: ReactNode, anchor: PointExpression) => {
	const iconMarkup = renderToString(icon);
	return divIcon({
	  html: iconMarkup,
	  className: 'custom-icon',
	  iconSize: [32, 32],
	  iconAnchor: anchor,
	});
};

const LCarIcon = () => {
	return LeafletIcon(<Car size={32} color="#000000" weight="fill" />, [16, 16]);
};

const LFlagIcon = () => {
	return LeafletIcon(<FlagCheckered size={32} color="#000000" weight="fill" />, [5, 28]);
}

export { LCarIcon, LFlagIcon };
