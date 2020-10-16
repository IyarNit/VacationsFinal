const express = require("express");
const api = express();
require("dotenv").config()
const bodyParser = require("body-parser")
const port = process.env.PORT
const cors = require("cors")
const { envCheaker } = require("./Functions/envCheaker")
envCheaker(["PORT"])

const authenticationRegisterRoute = require("./routes/authRegister")
const authenticationLoginRoute = require("./routes/authLogin")
const changePasswordRoute = require("./routes/changePassword")
const newVacationsRout = require("./routes/newVacation")
const getVacations = require("./routes/getVacations")
const editVacation = require("./routes/editVacations")
const deleteVacations = require("./routes/deleteVacation")
const likeVacations = require("./routes/likeVacations")
const userIdentifier = require("./routes/userIdentifier")

api.use(cors())
api.use(bodyParser.json())
api.use("/auth", authenticationRegisterRoute);
api.use("/auth2", authenticationLoginRoute)
api.use("/changePass", changePasswordRoute)
api.use("/", newVacationsRout)
api.use("/", getVacations)
api.use("/", editVacation)
api.use("/", deleteVacations)
api.use("/", likeVacations)
api.use("/", userIdentifier)

api.listen(port, (err) => {
    if (err) console.log("listen error:", err.message)
    console.log(`server runs on port ${port}`)
})
