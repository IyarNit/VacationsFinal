const express = require("express")
const router = express.Router();
const jwt = require("jsonwebtoken");
const pool = require("./pool/createPool")

const tokenVerify = require("../Functions/tokenVerify")



router.post("/likeVacations", tokenVerify, async (req, res, next) => {
    try {

        if (req.user.role === "admin") return res.status(401).json({ message: "UNAUTHORIZED ACCESS" })
        const { vacationId, userId, add } = req.body;
        let result = add ? await deleteVacLike(userId, vacationId) : await addLike(vacationId, userId)
        const payload = [userId]
        const duplicateQuery = dupliQuery()
        const result2 = await pool.execute(duplicateQuery, payload)
        const getter = await getVacations()
        return res.json({ message: "ok", items: result2[0], vacations: getter })
    }
    catch (error) {
        console.log("likeVacation catch error", error.message)
        return res.status(401).json({ message: "UNAUTHORIZED ACCESS" })

    }
})



router.get("/likeVacations", tokenVerify, async (req, res, next) => {
    try {
        if (req.user.role === "admin") return res.status(401).json({ message: "UNAUTHORIZED ACCESS" })
        const { userId } = req.query
        const philipo = await isVacationLiked(userId)
        return res.json({ message: philipo })
    }
    catch (error) {
        console.log("catch", error.message)
        return res.status(401).json({ message: "UNAUTHORIZED ACCESS" })

    }
})



module.exports = router


async function getVacations() {
    const query = getVacationsExistQuery()
    const [result] = await pool.execute(query)
    return result;
}


function getVacationsExistQuery() {
    return "SELECT count(vl.idvacations) as followers,vv.* FROM `vacations`.`liketable` vl  right join `vacations`.`vacations` vv on vl.idvacations = vv.idvacations group by vv.idvacations"
}

function dupliQuery() {
    return "SELECT `idvacations` FROM `vacations`.`liketable` WHERE idusers = ? ";
}



const isVacationLiked = async (userId) => {
    const payload = [userId]
    const duplicateQuery = dupliQuery()
    const result = await pool.execute(duplicateQuery, payload)
    return result[0]
}

const addLike = async (vacationId, userId) => {

    const payload = [userId, vacationId]
    const vacationsToLikeQuery = vacationsLikeQuery()
    const result = await pool.execute(vacationsToLikeQuery, payload)
    return result
}

function vacationsLikeQuery() {
    return "INSERT INTO `vacations`.`liketable` (`idusers`,`idvacations`) VALUES (?,?)";
}

const deleteVacLike = async (userId, vacationId) => {
    const payload = [userId, vacationId]
    const delvacQuery = deleteQuery()
    const result = await pool.execute(delvacQuery, payload)
    return result
}
function deleteQuery() {
    return "DELETE FROM `vacations`.`liketable` WHERE (`idusers` = ?) and (`idvacations` = ?) ";
}

