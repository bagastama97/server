const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const Authentication = require("../middlewares/authentication");

router.get("/", Authentication, categoryController.categories);
router.post("/", Authentication, categoryController.createCategory);
router.delete("/:id", Authentication, categoryController.deleteCategory);

module.exports = router;
