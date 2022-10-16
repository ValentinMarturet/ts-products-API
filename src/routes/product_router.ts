import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { Request, Response } from "express";

const router = Router();

const prisma = new PrismaClient();

// todas empiezan con /product
router.get("/all", async (req: Request, res: Response) => {
  // Devuelve una lista con todos los productos
  try {
    const result = await prisma.product.findMany();
    res.json(result);
  } catch (e) {
    res.send("Ha ocurrido un error: " + e);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  // Devuelve un producto especifico
  const { id } = req.params;
  try {
    const result = await prisma.product.findFirst({
      where: { id },
    });
    res.json(result);
  } catch (e) {
    res.send("Producto no existe. ID: " + id);
  }
});

router.post("/", async (req: Request, res: Response) => {
  // Crear un nuevo producto
  const { name, price, stock, sizes, description, tags } = req.body;
  try {
    const product = await prisma.product.create({
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
  } catch (e) {
    res.send("Error al crear el producto: " + e);
  }
});

router.put("/stock", async (req: Request, res: Response) => {
  // recibe stockChange como valor numerico positivo o negativo, esa es la variación en el stock anterior
  const { id, stockChange } = req.body;
  try {
    if (stockChange > 0) {
      const result = await prisma.product.update({
        where: { id },
        data: {
          stock: {
            increment: stockChange,
          },
        },
      });
      res.json(result);
    } else {
      const result = await prisma.product.update({
        where: { id },
        data: {
          stock: {
            increment: stockChange,
          },
        },
      });
      res.json(result);
    }
  } catch (e) {
    res.send(
      "Error al cambiar el stock del producto de ID: " + id + "Error: " + e
    );
  }
});

router.put("/", async (req: Request, res: Response) => {
  //actualiza los datos de un producto
  const { id, changes } = req.body;
  try {
    const result = await prisma.product.update({
      where: { id },
      data: {
        ...changes,
      },
    });
    res.json(result);
  } catch (e) {
    res.send(
      "Error al cambiar datos del producto de ID: " + id + "Error: " + e
    );
  }
});

router.delete("/", async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const result = await prisma.product.delete({
      where: { id },
    });
    res.json(result);
  } catch (e) {
    res.send("Ha ocurrido un error al eliminar el producto: " + e);
  }

  // IMPORTANTE: debe autenticar al ususario y chequear que sea admin
});

export default router;
