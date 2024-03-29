import Card from "./Card";
import TaskCard from "./TaskCard";

const Cards = ({ data, type = "home", idModal, getDataByIdHandler, completeHandler, completeHandlerSubtask }) => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-10">
			{data?.length > 0 && type == "home"
				? data?.map((item, index) => <Card data={item} key={index} />)
				: data?.map((item, index) => (
						<TaskCard
							data={item}
							getDataByIdHandler={getDataByIdHandler}
							idModal={idModal}
							completeHandler={completeHandler}
							completeHandlerSubtask={completeHandlerSubtask}
							key={index}
						/>
						// eslint-disable-next-line no-mixed-spaces-and-tabs
				  ))}
		</div>
	);
};

export default Cards;
