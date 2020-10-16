const express = require("express")
const router = express.Router();
const jwt = require("jsonwebtoken");
const pool = require("./pool/createPool")

const tokenVerify = require("../Functions/tokenVerify")

router.post("/vacations",tokenVerify,async (req, res, next) => {
    try {
        if (req.user.role === "admin") {
            const { description, destination, img, from, to, departureFlight, arrivalFlight, price } = req.body
            const saveVacation = await saveVacations(description, destination, img, from, to, departureFlight, arrivalFlight, price)
            return res.json({ message: "vacation added!" })
        }
        else {
            return res.status(401).json({ message: "UNAUTHORIZED ACCESS" })
        }
    }
    catch (error) {
        console.log("newVacations catch error", error.message)
        return res.status(401).json({ message: "invalid user" })

    }
})




module.exports = router;



const saveVacations = async (description, destination, img, from, to, departureFlight, arrivalFlight, price) => {
    const payload = [description, destination, img, from, to, departureFlight.split("-").reverse().join("-"), arrivalFlight.split("-").reverse().join("-"), price]
    const vacationsQuery = vacationsInsertQuery()
    const [result] = await pool.execute(vacationsQuery, payload)
    return result
}




function vacationsInsertQuery() {
    return "INSERT INTO `vacations`.`vacations` (`description`, `destination`, `img`, `from`, `to`,`departure`,`arrival`, `price`) VALUES (?, ?, ?, ?, ?, ?, ?, ?);"
}

