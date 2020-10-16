const express = require("express")
const router = express.Router();
const jwt = require("jsonwebtoken");
const pool = require("./pool/createPool")
const tokenVerify = require("../Functions/tokenVerify")

router.put("/editVacations",tokenVerify, async (req, res, next) => {
    try {
        if (req.user.role === "admin") {
            const { description, destination, img, from, to, departure, arrival, price, id } = req.body
            const updatedVacation = await updateVacation(description, destination, img, from, to, departure, arrival, price, id)
            return res.json({ message: "vacation changed" })
        }
        else {
            return res.status(401).json({message:"UNAUTHORIZED ACCESS"})
        }
    }
    catch (error) {
        console.log("editVacations catch error", error.message)
        return res.status(401).json({message:"UNAUTHORIZED ACCESS"})

    }
})

module.exports = router;

const updateVacation = async (description, destination, img, from, to, departure, arrival, price, id) => {
    const payload = [description, destination, img, from, to, departure, arrival, price, id]
    const vacationsToChangeQuery = vacationsChangeQuery()
    const result = await pool.execute(vacationsToChangeQuery, payload)
    return result
}

function vacationsChangeQuery() {
    return "UPDATE vacations.vacations SET `description`=? , `destination`=? , `img`=? , `from`=? , `to`=? ,`departure`=? ,`arrival`=?, `price`=? WHERE `idvacations` =?"
}