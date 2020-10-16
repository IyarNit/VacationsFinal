const express = require("express")
const router = express.Router();
const jwt = require("jsonwebtoken");
const pool = require("./pool/createPool")



router.get("/userIdentifier", async (req, res, next) => {
    try {
        const token = req.headers.authorization
        const isUser = await isUserCheck(token)
        const vacationsArr = await getVacations()
        return res.json({ user: isUser, vacationsArr })
    } catch (error) {
        console.log("userIdentifier catch error", error.message);
        return res.json({ message: "jwt expired" })
    }
})


module.exports = router


const getVacations = async () => {
    const query = getVacationsExistQuery()
    const [result] = await pool.execute(query)
    return result;
}

function getVacationsExistQuery() {
    return "SELECT count(vl.idvacations) as followers,vv.* FROM `vacations`.`liketable` vl  right join `vacations`.`vacations` vv on vl.idvacations = vv.idvacations group by vv.idvacations order by vv.idvacations"
}
const isUserCheck = async (token) => {

    let decoded = await jwt.verify(token, process.env.SECRET);
    return decoded
}