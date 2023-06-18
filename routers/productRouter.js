const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const Authentication = require("../middlewares/authentication");
router.get("/", productController.products);
router.get("/:id", productController.viewProduct);
router.put("/:id", Authentication, productController.editProduct);
router.post("/", Authentication, productController.createProduct);
router.delete("/:id", Authentication, productController.deleteProduct);

module.exports = router;
