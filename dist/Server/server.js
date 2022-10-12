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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const product_router_1 = __importDefault(require("../routes/product_router"));
class Server {
    constructor() {
        this._paths = {
            product: "/api/product",
        };
        // aplicacion de express
        this._app = (0, express_1.default)();
        // puerto
        this._port = process.env.PORT || "5000";
        //inicializar metodos de conexion, middlewares y ruteos
        this.dbConnection();
        this.middlewares();
        this.routes();
    }
    // metodo de conexion
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // await connect();
            }
            catch (error) { }
        });
    }
    //middlewares
    middlewares() {
        this._app.use((0, cors_1.default)());
        this._app.use(express_1.default.json());
    }
    // ruteo
    routes() {
        this._app.use(this._paths.product, product_router_1.default);
        // this._app.use(this._paths.users, tokenValidator ,userController)
    }
    // metodo de escucha
    listen() {
        this._app.listen(this._port, () => {
            console.log(`Server running on port ${this._port}`);
        });
    }
}
exports.default = Server;
