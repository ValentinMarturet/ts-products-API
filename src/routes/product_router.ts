import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { Request, Response } from "express";

const router = Router();

const prisma = new PrismaClient();

// todas empiezan con /product
router.get("/all", async (req: Request, res: Response) => {
  const result = await prisma.product.findMany();

  res.json(result);
});

router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  res.send("producto de id: " + id);
});

router.post("/", (req: Request, res: Response) => {
  // nuevo producto creado
  res.send("nuevo producto creado");
});

router.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  res.send("producto de id: " + id + " eliminado.");

  // IMPORTANTE: debe autenticar al ususario y chequear que sea admin
});

export default router;
