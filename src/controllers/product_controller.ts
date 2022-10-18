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

  public async getProductById(req: Request, res: Response): Promise<void> {
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

  public async createProduct(req: Request, res: Response): Promise<void> {
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
  }

  // put ---------------------------------------

  public async updateStock(req: Request, res: Response): Promise<void> {
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
  }

  public async updateProductDetails(
    req: Request,
    res: Response
  ): Promise<void> {
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
  }

  // delete ---------------------------------------

  public async deleteProduct(req: Request, res: Response): Promise<void> {
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
  }
}

export const productController = new ProductController();
