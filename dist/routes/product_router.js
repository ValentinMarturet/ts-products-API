"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = require("express");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
// todas empiezan con /product
// getAllProducts
router.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Devuelve una lista con todos los productos
    try {
        const result = yield prisma.product.findMany();
        res.json(result);
    }
    catch (e) {
        res.send("Ha ocurrido un error: " + e);
    }
}));
// getProductById
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Devuelve un producto especifico
    const { id } = req.params;
    try {
        const result = yield prisma.product.findFirst({
            where: { id },
        });
        res.json(result);
    }
    catch (e) {
        res.send("Producto no existe. ID: " + id);
    }
}));
//createProduct
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Crear un nuevo producto
    const { name, price, stock, sizes, description, tags } = req.body;
    try {
        const product = yield prisma.product.create({
            data: {
                name,
                price,
                stock,
                sizes,
                description,
                tags,
            },
        });
        res.json(product);
    }
    catch (e) {
        res.send("Error al crear el producto: " + e);
    }
}));
// updateStock
router.put("/stock", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // recibe stockChange como valor numerico positivo o negativo, esa es la variación en el stock anterior
    const { id, stockChange } = req.body;
    try {
        if (stockChange > 0) {
            const result = yield prisma.product.update({
                where: { id },
                data: {
                    stock: {
                        increment: stockChange,
                    },
                },
            });
            res.json(result);
        }
        else {
            const result = yield prisma.product.update({
                where: { id },
                data: {
                    stock: {
                        increment: stockChange,
                    },
                },
            });
            res.json(result);
        }
    }
    catch (e) {
        res.send("Error al cambiar el stock del producto de ID: " + id + "Error: " + e);
    }
}));
// updateProductDetails
router.put("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //actualiza los datos de un producto
    const { id, changes } = req.body;
    try {
        const result = yield prisma.product.update({
            where: { id },
            data: Object.assign({}, changes),
        });
        res.json(result);
    }
    catch (e) {
        res.send("Error al cambiar datos del producto de ID: " + id + "Error: " + e);
    }
}));
// deleteProduct
router.delete("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        const result = yield prisma.product.delete({
            where: { id },
        });
        res.json(result);
    }
    catch (e) {
        res.send("Ha ocurrido un error al eliminar el producto: " + e);
    }
    // IMPORTANTE: debe autenticar al ususario y chequear que sea admin
}));
exports.default = router;
