const { ToastRes } = require("./util");

function addJob(req, res, db) {
	const {
		order_number,
		importer_name,
		mother_vessel_name,
		eta,
		commodity,
		mv_location,
		bl_quantity,
		stevedore_name,
		stevedore_contact_number,
	} = req?.body;
	const time_stamp = new Date();

	const create_job =
		"INSERT INTO job_entry (order_number, importer_name, mother_vessel_name, eta, commodity, mv_location, bl_quantity, stevedore_name, stevedore_contact_number, time_stamp) VALUES (?,?,?,?,?,?,?,?,?,?)";
	db.query(
		create_job,
		[
			order_number,
			importer_name,
			mother_vessel_name,
			eta,
			commodity,
			mv_location,
			bl_quantity,
			stevedore_name,
			stevedore_contact_number,
			time_stamp,
		],
		(err, result) => {
			res.json(
				err
					? ToastRes("error", "creating job")
					: ToastRes("create", `${order_number}`)
			);
		}
	);
}

function getJob(req, res, db) {
	const sqlSelect = "SELECT * from job_entry";
	db.query(sqlSelect, (err, result) => {
		res.send(result);
	});
}

function updateJob(req, res, db) {
	const {
		id,
		order_number,
		importer_name,
		mother_vessel_name,
		eta,
		commodity,
		mv_location,
		bl_quantity,
		stevedore_name,
		stevedore_contact_number,
	} = req?.body;
	const time_stamp = new Date();

	const sqlUpdate =
		"UPDATE job_entry SET order_number=?, importer_name=?, mother_vessel_name=?, eta=?, commodity=?, mv_location=?, bl_quantity=?, stevedore_name=?, stevedore_contact_number=?, time_stamp=? where id= ?";
	db.query(
		sqlUpdate,
		[
			order_number,
			importer_name,
			mother_vessel_name,
			eta,
			commodity,
			mv_location,
			bl_quantity,
			stevedore_name,
			stevedore_contact_number,
			time_stamp,
			id,
		],
		(err, result) => {
			res.json(
				err
					? ToastRes("error", "updating job")
					: ToastRes("update", `${order_number}`)
			);
		}
	);
}

function deleteJob(req, res, db) {
	const id = req?.body.job_id;
	const order_number = req?.body.job_order_number;

	const sqlDelete = "DELETE from job_entry where id= ?";

	db.query(sqlDelete, [id], (err, result) => {
		res.json(
			err
				? ToastRes("error", "deleting job")
				: ToastRes("delete", `${order_number}`)
		);
	});
}

function getCommodity(req, res, db) {
	var order_number = req?.query.order_number;
	const sqlSelect = `SELECT commodity from job_entry where order_number =  '${order_number}'`;
	db.query(sqlSelect, [order_number], (err, result) => {
		res.send(result);
	});
}

function fetchOrderNumber(req, res, db) {
	const sqlSelect =
		"SELECT order_number as 'value' from job_entry order by order_number";
	// change the order number to value
	db.query(sqlSelect, (err, result) => {
		res.send(result);
	});
}

function getMvName(req, res, db) {
	var order_job_number = req?.query.order_job_number;
	var order_number_split = order_job_number.split("-");
	var order_number = "";
	for (var i = 0; i < order_number_split.length - 1; i++) {
		order_number += order_number_split[i] + "-";
	}
	order_number = order_number.substring(0, order_number.length - 1);

	const sqlSelect = `SELECT mother_vessel_name as MV_name from job_entry where order_number = '${order_number}'`;

	db.query(sqlSelect, [order_number], (err, result) => {
		res.send(result);
	});
}

module.exports.addJob = addJob;
module.exports.getJob = getJob;
module.exports.updateJob = updateJob;
module.exports.deleteJob = deleteJob;
module.exports.getCommodity = getCommodity;
module.exports.fetchOrderNumber = fetchOrderNumber;
module.exports.getMvName = getMvName;
