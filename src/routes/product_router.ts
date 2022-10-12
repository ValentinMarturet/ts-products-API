import { Router } from "express";
import { Request, Response } from "express";

const router = Router();
// todas empiezan con /product
router.get("/all", (req: Request, res: Response) => {
  res.send("Todos los productos");
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
