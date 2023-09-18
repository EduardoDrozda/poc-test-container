import dotenv from "dotenv";
import express from "express";
import routes from "./routes";
import errorHandlingMiddleware from "./shared/middlewares/error-handling.middleware";

dotenv.config();

export default class Application {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use("/api", routes);
  }

  exceptionHandler() {
    this.app.use(errorHandlingMiddleware);
  }

  startup() {
    const port = process.env.APP_PORT;
    this.app.listen(port, () =>
      console.log(
        `\n 🚀 [server]: Server is running at https://localhost:${port} 🚀 \n`
      )
    );
  }
}
