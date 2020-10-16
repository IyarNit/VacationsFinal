const express = require("express")
const router = express.Router();
const pool = require("./pool/createPool")
const bcrypt = require('bcryptjs');
const salt = "$2a$10$MxPcIeHj.YLc1dOwnykPiOZBs2Gzk91ydH9f2Q7GAIuRmvA/UxgSe"
const changePasswordValidation = require("../Functions/validations/validateUserPasswordChanger")
router.use(changePasswordValidation)

router.post("/changePassword", async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await isUserExist(email);
        if (!user) return res.json({ message: "user not found" })
        const updateUserPass = await updateUserPassword({ email, password })
        return res.json({ message: "Change succesful" })
    } catch (error) {
        console.log("changePassword catch Error", error.message)
        return res.status(401).json({ message: "no access" })
    }

})


module.exports = router;

async function isUserExist(email) {
    const payload = [email]
    const query = getUserExistQuery()
    const [result] = await pool.execute(query, payload)
    const [firstUser] = result;
    return firstUser;
}

function getUserExistQuery() {
    return "SELECT * FROM `vacations`.`users` where email = ?";
}

async function updateUserPassword(user) {
    const { email, password, } = user
    const [result] = await pool.execute(updateUserPasswordQuery(), [bcrypt.hashSync(password, salt), email])
    return result
}

function updateUserPasswordQuery() {
    return "UPDATE `vacations`.`users` SET password = ? where email = ?"
}


