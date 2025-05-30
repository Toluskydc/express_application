const express = require("express")

const {getUser, createUser, updateUser, deleteUser, loginUser} = require("../controllers/user.controllers")

const route = express.Router()


route.get("/", getUser)


route.post("/", createUser)


route.post("/login-user", loginUser)


route.put("/", updateUser)


route.delete("/", deleteUser)


module.exports = route