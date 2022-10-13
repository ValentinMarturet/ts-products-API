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
router.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.product.findMany();
    res.json(result);
}));
router.get("/:id", (req, res) => {
    const { id } = req.params;
    res.send("producto de id: " + id);
});
router.post("/", (req, res) => {
    // nuevo producto creado
    res.send("nuevo producto creado");
});
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    res.send("producto de id: " + id + " eliminado.");
    // IMPORTANTE: debe autenticar al ususario y chequear que sea admin
});
exports.default = router;
