function addChq_due(req, res, db){
    //console.log("submit in backend");
    const order_number = req.body.order_number;
    const LA = req.body.LA;
    const LV_name = req.body.LV_name;
    const commodity = req.body.commodity;
    const mode = req.body.mode;
    const chq_amount = req.body.chq_amount;
    const part_pay = req.body.part_pay;
    const balance = req.body.balance;
    const chq_issue_date = req.body.chq_issue_date;
    const init_amount = req.body.init_amount;
    const payment = req.body.payment;
    const final_amount = req.body.final_amount;
    const create_chq =
        "INSERT INTO chq_due_list (order_number, LA, LV_name, commodity, mode, chq_amount, part_pay, balance, chq_issue_date, init_amount, payment, final_amount) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
    db.query(
        create_chq,
        [
            order_number,
            LA,
            LV_name,
            commodity,
            mode,
            chq_amount,
            part_pay,
            balance,
            chq_issue_date,
            init_amount,
            payment,
            final_amount,
        ],
        (err, result) => {
            if (err) console.log(err);
            console.log(result);
            res.send(result);
        }
    );
}
function getChq_due(req, res, db){
    const sqlSelect = "SELECT * from chq_due_list";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
}
function updateChq_due(req, res, db){
    //console.log("update job info in backend");
    const id = req.body.id;
    const order_number = req.body.new_order_number;
    const LA = req.body.new_LA;
    const LV_name = req.body.new_LV_name;
    const commodity = req.body.new_commodity;
    const mode = req.body.new_mode;
    const chq_amount = req.body.new_chq_amount;
    const part_pay = req.body.new_part_pay;
    const balance = req.body.new_balance;
    const chq_issue_date = req.body.new_chq_issue_date;
    const init_amount = req.body.new_init_amount;
    const payment = req.body.new_payment;
    const final_amount = req.body.new_final_amount;
    const sqlUpdate =
        "UPDATE chq_due_list SET order_number=?, LA=?, LV_name=?, commodity=?, mode=?, chq_amount=?, part_pay=?, balance=?, chq_issue_date=?, init_amount=?, payment=?, final_amount=? WHERE id=?";
    db.query(
        sqlUpdate,
        [
            order_number,
            LA,
            LV_name,
            commodity,
            mode,
            chq_amount,
            part_pay,
            balance,
            chq_issue_date,
            init_amount,
            payment,
            final_amount,
            id,
        ],
        (err, result) => {
            if (err) console.log(err);
            console.log(result);

            res.send(result);
        }
    );
}
function deleteChq_due(req, res, db){
    console.log("Delete status in backend");
    const id = req.body.Chq_id;
    const sqlDelete = "DELETE from chq_due_list where id= ?";
    db.query(sqlDelete, [id], (err, result) => {
        if (err) console.log(err);
        //console.log(result)
        if (!err) {
            res.send("success");
        }
    });
}

module.exports.addChq_due = addChq_due;
module.exports.getChq_due = getChq_due;
module.exports.updateChq_due = updateChq_due;
module.exports.deleteChq_due = deleteChq_due;