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
exports.productController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ProductController {
    // get ---------------------------------------
    getAllProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Devuelve una lista con todos los productos
            try {
                const result = yield prisma.product.findMany();
                res.json(result);
            }
            catch (e) {
                res.send("Ha ocurrido un error: " + e);
            }
        });
    }
    getProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    // post ---------------------------------------
    createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    // put ---------------------------------------
    updateStock(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    updateProductDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    // delete ---------------------------------------
    deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
}
exports.productController = new ProductController();
