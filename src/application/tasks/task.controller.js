import { HttpStatusEnum } from "../../shared/enums/http-status.enum";
import { TaskService } from "./task.service";

class TaskController {
  constructor() {
    this.taskService = new TaskService();
    this.index = this.index.bind(this);
    this.show = this.show.bind(this);
    this.store = this.store.bind(this);
    this.update = this.update.bind(this);
    this.finishTask = this.finishTask.bind(this);
  }

  async index(req, res) {
    const { query } = req;
    let filter = {};

    if (query.isDone) {
      filter = {
        ...filter,
        isDone: query.isDone,
      };
    }

    if (query.search) {
      filter = {
        ...filter,
        search: query.search,
      };
    }

    const result = await this.taskService.index(filter);
    return res.status(HttpStatusEnum.OK).json(result);
  }

  async show(req, res, next) {
    try {
      const { params } = req;
      const result = await this.taskService.show(params.id);
      return res.status(HttpStatusEnum.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async store(req, res) {
    const { body } = req;
    const result = await this.taskService.store(body);
    return res.status(HttpStatusEnum.CREATED).json(result);
  }

  async update(req, res, next) {
    try {
      const { body, params } = req;
      const result = await this.taskService.update(params.id, body);
      return res.status(HttpStatusEnum.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async finishTask(req, res, next) {
    try {
      const { params, body } = req;
      const result = await this.taskService.finishTask(params.id, body);
      return res.status(HttpStatusEnum.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { params } = req;
      await this.taskService.delete(params.id);
      return res.status(HttpStatusEnum.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  }
}

export default new TaskController();
