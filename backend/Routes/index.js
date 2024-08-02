const express = require("express");
require("dotenv").config();
const userRouter = require("./user");
const accountRouter = require("./accounts");

const router = express.Router();

// routes
router.use("/user", userRouter);
router.use("/account", accountRouter);

module.exports = router;
