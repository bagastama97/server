const express = require("express");
const router = express.Router();
const userRouter = require("./userRouter");
const productRouter = require("./productRouter");
const categoryRouter = require("./categoryRoute");
router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/category", categoryRouter);

module.exports = router;
