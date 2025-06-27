const express = require("express");
const { createKYC, getOneKyc } = require("../controllers/kyc.controller");
const authentication = require("../middlewares/auth.middlewares");
const route = express.Router();

route.post("/kycs", authentication, createKYC);
route.get("/kycs", getOneKyc);

module.exports = route;