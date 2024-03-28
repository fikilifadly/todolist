const Card = ({ data }) => {
	return (
		<>
			<div className="flex flex-col justify-between p-5 shadow-[0px_6px_24px_0px_rgba(0,0,0,0.05),0px_0px_0px_1.5px_rgba(0,0,0,0.08)] rounded-md">
				<div className="flex justify-between">
					<span>{data.title}</span>
				</div>

				<div className="mt-5">
					{data.loading ? (
						<span className="loading loading-spinner loading-md"></span>
					) : (
						<div className="flex justify-between items-center">
							<span className="text-4xl font-bold text-green-600">{data.total}</span>
							<div className="flex flex-col gap-2">
								<span className="text-lg font-bold text-green-600">Complete: {data.complete}</span>
								<span className="text-lg font-bold text-blue-400">Ongoing: {data.ongoing}</span>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default Card;
