const express = require("express")
const router = express.Router();
const jwt = require("jsonwebtoken");
const pool = require("./pool/createPool")
const tokenVerify = require("../Functions/tokenVerify")

router.post("/deleteVacations", tokenVerify,async (req, res, next) => {
    try {
   
        if (req.user.role === "admin") {
            const { id } = req.body
            const removeFromLikeTable = await removerFromLikes(id)
            const vacationToDelete = await deleteVacation(id)
            return res.json({ message: "vacation deleted" })
        }
        else {
            return res.status(401).json({ message: "UNAUTHORIZED ACCESS" })
        }
    }
    catch (error) {
        console.log("deleteVacations catch Error", error.message)
        return res.status(401).json({ message: "UNAUTHORIZED ACCESS" })
    }
})


module.exports = router

const deleteVacation = async (id) => {
    const payload = [id]
    const vacationsToDeleteQuery = vacationsDeleteQuery()
    const result = await pool.execute(vacationsToDeleteQuery, payload)
    return result
}

function vacationsDeleteQuery() {
    return "DELETE FROM `vacations`.`vacations` WHERE `idvacations` =?";
}


const removerFromLikes = async (id) => {
    const payload = [id]
    const removeLikesQuery = removerFromLikesQuery()
    const result = await pool.execute(removeLikesQuery, payload)
    return result
}

function removerFromLikesQuery() {
    return "DELETE FROM `vacations`.`liketable` WHERE `idvacations` = ? ";
}