import express from "express";
import { UserControl } from "./controllers/UserController";
import { CalcadoControl } from "./controllers/CalcadoController";

const userControl = new UserControl();
const calcadoControl = new CalcadoControl();
const routes = express.Router();

routes.post("/users", userControl.createUser)
routes.get("/users",userControl.readAllUsers)
routes.put("/users:id", userControl.updateUser)
routes.delete("/users:id",userControl.deleteUser)

routes.post("/calcados",calcadoControl.createCalcado)
routes.get("/calcados", calcadoControl.readAllCalcados)
routes.put("/calcados:id",calcadoControl.updateCalcado)
routes.delete("/calcados:id",calcadoControl.deleteCalcado)


export default routes;
