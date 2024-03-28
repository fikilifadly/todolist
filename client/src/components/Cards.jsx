import Card from "./Card";

const Cards = ({ data }) => {
	return <div className="grid grid-cols-1 md:grid-cols-3 gap-10">{data && data.map((item, index) => <Card data={item} key={index} />)}</div>;
};

export default Cards;
