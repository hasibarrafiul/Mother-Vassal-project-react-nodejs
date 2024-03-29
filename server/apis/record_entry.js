const { ToastRes } = require("./util");

function addRecord(req, res, db) {
	const {
		order_number,
		job_number,
		date_from_charpotro,
		cp_number_from_charpotro,
		LA_name,
		LV_name,
		dest_from,
		dest_to,
		capacity,
		rate,
		LV_master_name,
		LV_master_contact_number,
	} = req?.body;
	const date_created = new Date();
	const create_record =
		"INSERT INTO record_entry (order_number, job_number, date_from_charpotro, cp_number_from_charpotro, LA_name, LV_name, dest_from, dest_to, capacity, rate, LV_master_name, LV_master_contact_number, date_created) VALUES (?,?,?,?,?,?,?,?,?,?,?,?, ?)";
	db.query(
		create_record,
		[
			order_number,
			job_number,
			date_from_charpotro,
			cp_number_from_charpotro,
			LA_name,
			LV_name,
			dest_from,
			dest_to,
			capacity,
			rate,
			LV_master_name,
			LV_master_contact_number,
			date_created,
		],
		(err, result) => {
			res.json(
				err
					? ToastRes("error", "creating record")
					: ToastRes("create", `${order_number}`)
			);
		}
	);
}

function getRecord(req, res, db) {
	const order_number = req?.query.order_number;

	var sqlSelect = `SELECT 
                            id,
                            order_number, 
                            job_number, 
                            date_from_charpotro, 
                            cp_number_from_charpotro, 
                            LA_name, 
                            LV_name, 
                            dest_from, 
                            dest_to, 
                            capacity, 
                            rate, 
                            LV_master_name, 
                            LV_master_contact_number, 
                            date_created,
                            (
                                select 
                                    commodity
                                from
                                    job_entry
                                where
                                    job_entry.order_number = record_entry.order_number

                            ) as commodity 
                        from 
                            record_entry 
								`;

	if (order_number !== "undefined")
		sqlSelect += `where order_number = '${order_number}'`;

	db.query(sqlSelect, (err, result) => {
		res.send(result);
	});
}

function updateRecord(req, res, db) {
	const {
		id,
		order_number,
		job_number,
		date_from_charpotro,
		cp_number_from_charpotro,
		LA_name,
		LV_name,
		dest_from,
		dest_to,
		capacity,
		rate,
		LV_master_name,
		LV_master_contact_number,
	} = req?.body;

	const sqlUpdate =
		"UPDATE record_entry SET order_number=?, job_number=?, date_from_charpotro=?, cp_number_from_charpotro=?, LA_name=?, LV_name=?, dest_from=?, dest_to=?, capacity=?, rate=?, LV_master_name=?, LV_master_contact_number=? where id= ?";
	db.query(
		sqlUpdate,
		[
			order_number,
			job_number,
			date_from_charpotro,
			cp_number_from_charpotro,
			LA_name,
			LV_name,
			dest_from,
			dest_to,
			capacity,
			rate,
			LV_master_name,
			LV_master_contact_number,
			id,
		],
		(err, result) => {
			res.json(
				err
					? ToastRes("error", "updating record")
					: ToastRes("update", `${order_number}`)
			);
		}
	);
}

function deleteRecord(req, res, db) {
	const id = req?.body.record_id;
	const sqlDelete = "DELETE from record_entry where id= ?";
	db.query(sqlDelete, [id], (err, result) => {
		// res.json(
		//     err
		//         ? ToastRes("error", "deleting record")
		//         : ToastRes("delete", `${order_number + "-" + job_number}`)
		// );
		res.send(result);
	});
}

function fetchJobNumber(req, res, db) {
	var order_number = req?.query.order_number;
	const sqlSelect = `SELECT job_number as 'value' from record_entry where order_number = '${order_number}'`;
	db.query(sqlSelect, (err, result) => {
		res.send(result);
	});
}

function getCharpotroCpLaLvRate(req, res, db) {
	var order_job_number = req?.query.order_job_number;
	const sqlSelect = `SELECT date_from_charpotro, cp_number_from_charpotro, LA_name, LV_name, rate, dest_from, dest_to from record_entry where CONCAT(order_number, '-', job_number) = '${order_job_number}'`;

	db.query(sqlSelect, [order_job_number], (err, result) => {
		res.send(result);
	});
}

function getMaxCapacity(req, res, db) {
	var order_number = req?.query.order_number;
	const sqlSelect = `
    select 
        (bl_quantity - (
            Select 
                IFNULL(SUM(capacity), 0)
            from record_entry 
            where order_number = '${order_number}'
        )) as 'max_capacity'
    from job_entry
    where order_number = '${order_number}'
    `;

	db.query(sqlSelect, [order_number], (err, result) => {
		res.send(result);
	});
}

function getLVname(req, res, db) {
	const sqlSelect = `
    select 
       DISTINCT LV_name as value
    from pre_defined_ship
    WHERE status = 1
    ORDER BY LV_name ASC
    `;
	db.query(sqlSelect, (err, result) => {
		res.send(result);
	});
}

module.exports.addRecord = addRecord;
module.exports.getRecord = getRecord;
module.exports.updateRecord = updateRecord;
module.exports.deleteRecord = deleteRecord;
module.exports.fetchJobNumber = fetchJobNumber;
module.exports.getCharpotroCpLaLvRate = getCharpotroCpLaLvRate;
module.exports.getMaxCapacity = getMaxCapacity;
module.exports.getLVname = getLVname;
