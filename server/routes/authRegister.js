const express = require("express")
const router = express.Router();
const jwt = require("jsonwebtoken");
const pool = require("./pool/createPool")
const bcrypt = require('bcryptjs');
const userValidation = require("../Functions/validations/validateUser")
const salt = "$2a$10$MxPcIeHj.YLc1dOwnykPiOZBs2Gzk91ydH9f2Q7GAIuRmvA/UxgSe"
router.use(userValidation)


router.post("/register", async (req, res, next) => {
    const { email, userName, password } = req.body
    const user = await isUserExistRegister(email, userName);
    if (!user) return res.json({ message: "user(email) already exist" })
    const insertId = await saveUser(req.body)
    if (insertId) return res.json({ message: "register Success" })
    return res.json({ message: "error!" })
})

module.exports = router;

async function isUserExistRegister(email, userName) {
    const payload1 = [email]
    const emailQuery = getUserEmailExistQuery()
    const [result1] = await pool.execute(emailQuery, payload1)
    const payload2 = [userName]
    const userNameQuery = getUserNameExistQuery()
    const [result2] = await pool.execute(userNameQuery, payload2)
    if (result1.length > 0 || result2.length > 0) return false
    if (result1.length === 0 || result2.length === 0) return true
}

const saveUser = async (payload) => {
    const { firstName, lastName, email, userName, password } = payload
    const [result] = await pool.execute(getUserInsertionQuery(), [firstName, lastName, email, userName, bcrypt.hashSync(password, salt)])
    return result.insertId
}

function getUserEmailExistQuery() {
    return "SELECT * FROM `vacations`.`users` where email = ?";
}

function getUserNameExistQuery() {
    return "SELECT * FROM `vacations`.`users` where userName = ?";
}

function getUserInsertionQuery() {
    return "INSERT INTO `vacations`.`users` (`firstName`,`lastName`,`email`,`userName`,`password`) VALUES (?,?,?,?,?)"
}




