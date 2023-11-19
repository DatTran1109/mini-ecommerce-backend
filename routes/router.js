const express = require("express");
const productController = require("../controllers/product-controller");
const categoryController = require('../controllers/category-controller');
const router = express.Router();

router.get("/product/", productController.getAllProduct);
router.get("/product/:id", productController.getProduct);
router.post("/product/", productController.addProduct);
router.delete("/product/:id", productController.deleteProduct);
router.put("/product/:id", productController.updateProduct);

router.get("/category/", categoryController.getAllCategory);
router.get("/category/:id", categoryController.getCategory);
router.post("/category/", categoryController.addCategory);
router.delete("/category/:id", categoryController.deleteCategory);
router.put("/category/:id", categoryController.updateCategory);

module.exports = router;
