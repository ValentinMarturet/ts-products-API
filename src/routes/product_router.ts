import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { Request, Response } from "express";
import { productController } from "../controllers/product_controller";

const router = Router();

const prisma = new PrismaClient();

// todas empiezan con /product
// getAllProducts
router.get("/all", productController.getAllProducts);

// getProductById
router.get("/:id", productController.getProductById);

//createProduct
router.post("/", productController.createProduct);

// updateStock
router.put("/stock", productController.updateStock);

// updateProductDetails
router.put("/", productController.updateProductDetails);

// deleteProduct
router.delete("/", productController.deleteProduct);

export default router;
