const errorHandler = (err, req, res, next) => {
	console.log("Error Handler: ", err.name, err);

	let statusCode = err.status || 500;
	switch (err.name) {
		case "SequelizeValidationError":
			res.status(400).json({ message: err.errors[0].message });
			break;
		case "SequelizeUniqueConstraintError":
			res.status(400).json({ message: err.errors[0].message });
			break;
		case "SequelizeDatabaseError":
			res.status(400).json({ message: "Something Wrong On Database" });
			break;
		case `${err.name}`:
			res.status(statusCode).json({ message: err.name });
		default:
			res.status(statusCode).json({ message: "Internal Server Error" });
			break;
	}
};

module.exports = errorHandler;
