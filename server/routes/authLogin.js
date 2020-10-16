const express = require("express")
const router = express.Router();
const jwt = require("jsonwebtoken");
const pool = require("./pool/createPool")
const bcrypt = require('bcryptjs');
const salt = "$2a$10$MxPcIeHj.YLc1dOwnykPiOZBs2Gzk91ydH9f2Q7GAIuRmvA/UxgSe"

router.post("/userLogin", async (req, res, next) => {
    try {
        const { email, userName, password } = req.body
        const user = await isUserExistLogin(email, userName, password);
        if (!user) return res.json({ message: "Login Error" })
        const { idusers } = user
        const userAdminCheck = await isUserAdmin(email, password)
        if (userAdminCheck === "member") {
            const membersVacations = await getLikedVacations(idusers)
            const jwtToken = await getJwt({ ...user, password: null })
            return res.json({ message: "Login succesful", token: jwtToken, user: { ...user, password: null }, adminStatus: userAdminCheck, like: membersVacations })
        }
        else {
            const jwtToken = await getJwt({ ...user, password: null })
            return res.json({ message: "Login succesful", token: jwtToken, user: { ...user, password: null }, adminStatus: userAdminCheck })
        }
    } catch (error) {
        console.log("userLogin catch erroe", error.message)
    }

})

router.get("/tokenVerify", async (req, res, next) => {
    try {
        setTimeout(() => {
            const token = req.headers.authorization
            jwt.verify(token, process.env.SECRET, (err, decoded) => {
                if (err) return res.json({ status: false })
                return res.json({ status: true })
            })
        }, 1000);
    } catch (error) {
        console.log("tokenVerify catch error", error.message)
        return res.json({ status: false })
    }
})

module.exports = router

const getJwt = async (u) => {
    return new Promise((resolve, reject) => {
        jwt.sign(u, process.env.SECRET, { expiresIn: "1h" }, (err, token) => {
            if (err) reject("error")
            resolve(token)
        })
    })
}

const isUserExistLogin = async (email, userName, password = null) => {
    const payload = [email, userName, bcrypt.hashSync(password, salt)]
    const query = getUserPasswordExistQuery()
    const [result] = await pool.execute(query, payload)
    const [aUser] = result;
    return aUser;
}

const isUserAdmin = async (email, password = null) => {
    const adminQuery = getIsUserAdminQuery()
    const payload = [email, bcrypt.hashSync(password, salt)]
    const result = await pool.execute(adminQuery, payload)
    const res = result[0][0].role
    return res
}

function getUserPasswordExistQuery() {
    return "SELECT * FROM `vacations`.`users` where email = ? and userName = ? and password = ?";
}

function getIsUserAdminQuery() {
    return "SELECT role FROM `vacations`.`users` where email=? and password = ?"
}

const getLikedVacations = async (idusers) => {
    const payload = [idusers]
    const membersLikedVacations = getVacations()
    const result = await pool.execute(membersLikedVacations, payload)
    const allVacations = result[0].map((v) => { return v.idvacations })
    return allVacations
}

function getVacations() {
    return "SELECT * FROM `vacations`.`liketable` WHERE `idusers` = ?";
}

