import express, { Request, Response } from "express";
import cors from "cors";

class Server {
  private _app: express.Application;
  private _port: string;

  private _paths = {
    users: "/api/users",
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
    this._app.use(this._paths.users, async (req: Request, res: Response) => {
      res.send("hola");
    });
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
