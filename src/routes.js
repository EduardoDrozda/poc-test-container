import express from "express";
import taskController from "./application/tasks/task.controller";

const routes = express.Router();

routes.post("/tasks", taskController.store);
routes.get("/tasks", taskController.index);
routes.get("/tasks/:id", taskController.show);
routes.patch("/tasks/:id", taskController.update);
routes.patch("/tasks/:id/finish", taskController.finishTask);

export default routes;
