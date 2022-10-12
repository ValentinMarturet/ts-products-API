import dotenv from "dotenv";
import Server from "./Server/server";

dotenv.config();

const server = new Server();

server.listen();
