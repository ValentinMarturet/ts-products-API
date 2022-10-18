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
}
