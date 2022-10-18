"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = require("express");
const product_controller_1 = require("../controllers/product_controller");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
// todas empiezan con /product
// getAllProducts
router.get("/all", product_controller_1.productController.getAllProducts);
// getProductById
router.get("/:id", product_controller_1.productController.getProductById);
//createProduct
router.post("/", product_controller_1.productController.createProduct);
// updateStock
router.put("/stock", product_controller_1.productController.updateStock);
// updateProductDetails
router.put("/", product_controller_1.productController.updateProductDetails);
// deleteProduct
router.delete("/", product_controller_1.productController.deleteProduct);
exports.default = router;
