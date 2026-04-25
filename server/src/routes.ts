import express from "express";
import {  readAllUsers } from "./controllers/UserController"; // é preciso agora exportar a classe e tirar de dentro dela as funções assincronas


const routes = express.Router();

routes.get("/users", readAllUsers);


export default routes;
