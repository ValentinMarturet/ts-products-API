import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

class ProductController {
  // get ---------------------------------------
  public async getAllProducts(req: Request, res: Response): Promise<void> {
    // Devuelve una lista con todos los productos
    try {
      const result = await prisma.product.findMany();
      res.json(result);
    } catch (e) {
      res.send("Ha ocurrido un error: " + e);
    }
  }

  public async getProductById(req: Request, res: Response) {
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
  }
  // post ---------------------------------------

  // put ---------------------------------------

  // delete ---------------------------------------
}
