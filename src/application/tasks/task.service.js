import NotFoundException from "../../shared/exceptions/not-found.exception";
import TaskRepository from "./task.repository";

const NOT_FOUND_MESSAGE = "Task not found";
export class TaskService {
  constructor() {
    this.repository = new TaskRepository();
  }

  async index(filters = {}) {
    return this.repository.findAll(filters);
  }

  async show(id) {
    const result = await this.findById(id);

    if (!result) {
      throw new NotFoundException(NOT_FOUND_MESSAGE);
    }

    return result;
  }

  async findById(id) {
    return this.repository.findById(id);
  }

  async store({ name, description }) {
    return this.repository.create({ name, description });
  }

  async update(id, { name, description }) {
    await this.findById(id);
    return await this.updateById(id, { name, description });
  }

  async updateById(id, data) {
    return this.repository.updateById(id, data);
  }

  async finishTask(id, { isDone }) {
    return this.updateById(id, { isDone });
  }

  async delete(id) {
    await this.findById(id);
    await this.repository.delete(id);
  }
}
