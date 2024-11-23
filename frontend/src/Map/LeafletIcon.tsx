import L, { PointExpression } from "leaflet";

const LeafletIcon = (url: string, anchor: PointExpression) => {
	return L.icon({
	  iconUrl: url,
	  className: 'custom-icon',
	  iconSize: [32, 32],
	  iconAnchor: anchor,
	});
};

const LCarIcon = () => {
	return LeafletIcon("/car.svg", [16, 16]);
};

// const LFlagIcon = () => {
// 	return LeafletIcon(<FlagCheckered size={32} color="#000000" weight="fill" />, [5, 28]);
// }

const LCustomerIcon = () => {
	return LeafletIcon("/user.svg", [16, 16]);
}

export { LCarIcon, LCustomerIcon };
