"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// todas empiezan con /product
router.get("/all", (req, res) => {
    res.send("Todos los productos");
});
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
