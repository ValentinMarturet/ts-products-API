import express, { Request, Response } from "express";
import cors from "cors";
import productRoutes from "../routes/product_router";

class Server {
  private _app: express.Application;
  private _port: string;

  private _paths = {
    product: "/api/product",
  };
  constructor() {
    // aplicacion de express
    this._app = express();
    // puerto
    this._port = process.env.PORT || "5000";

    //inicializar metodos de conexion, middlewares y ruteos
    this.dbConnection();
    this.middlewares();
    this.routes();
  }

  // metodo de conexion
  private async dbConnection() {
    try {
      // await connect();
    } catch (error) {}
  }
  //middlewares
  private middlewares() {
    this._app.use(cors());
    this._app.use(express.json());
  }

  // ruteo
  private routes() {
    this._app.use(this._paths.product, productRoutes);
    // this._app.use(this._paths.users, tokenValidator ,userController)
  }

  // metodo de escucha
  public listen() {
    this._app.listen(this._port, () => {
      console.log(`Server running on port ${this._port}`);
    });
  }
}

export default Server;
