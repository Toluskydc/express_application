const express = require("express")

const {getUser, getUserById, createUser, updateUser, deleteUser, loginUser} = require("../controllers/user.controllers")
const authentication = require("../middlewares/auth.middlewares")

const route = express.Router()


route.get("/users", getUser)

route.get("/user", authentication, getUserById)

route.post("/users", createUser)


route.post("/login-user", loginUser)


route.put("/", updateUser)


route.delete("/", deleteUser)


module.exports = route