const express = require("express")
const router = express.Router();
const pool = require("./pool/createPool")
const jwt = require("jsonwebtoken");
const tokenVerify = require("../Functions/tokenVerify")

router.get("/getVacations", tokenVerify, async (req, res, next) => {
    try {
        const vacationsArr = await getVacations();
        if (!vacationsArr) return res.status(401).send("vacations error")
        return res.json({ message: "Vacations Exists", vacationsArr })
    } catch (error) {
        console.log("getVacations catch error", error.message)
        return res.status(401).json({ message: "invalid request" })
    }
})

module.exports = router;

const getVacations = async () => {
    const query = getVacationsExistQuery()
    const [result] = await pool.execute(query)
    return result;
}

function getVacationsExistQuery() {
    return "SELECT count(vl.idvacations) as followers,vv.* FROM `vacations`.`liketable` vl  right join `vacations`.`vacations` vv on vl.idvacations = vv.idvacations group by vv.idvacations"
}
