import knexInstance from "../../database/knex";
import { TaskMapper } from "./task.mapper";

const TABLE_NAME = "tasks";

export default class TaskRepository {
  constructor() {
    this.database = knexInstance.table(TABLE_NAME);
  }

  async findAll(filters = {}) {
    const tasks = await this.database.modify(function (queryBuilder) {
      const { isDone, search } = filters;

      if (isDone !== undefined && isDone !== null) {
        queryBuilder.where("isDone", /true/.test(isDone));
      }

      if (search) {
        queryBuilder
          .whereRaw("LOWER(name) LIKE ?", [`%${search}%`])
          .orWhereRaw("LOWER(description) LIKE ?", [`%${search}%`]);
      }
    });

    return tasks.map((task) => TaskMapper.mapToDTO(task));
  }

  async findById(id) {
    const [result] = await this.database.where({ id });

    return TaskMapper.mapToDTO(result);
  }

  async create({ name, description }) {
    const [result] = await knexInstance
      .table(TABLE_NAME)
      .returning("*")
      .insert({ name, description });

    return TaskMapper.mapToDTO(result);
  }

  async updateById(id, data) {
    const [result] = await this.database
      .returning("*")
      .update(data)
      .where({ id });

    return TaskMapper.mapToDTO(result);
  }

  async delete(id) {
    return this.database.where({ id }).delete();
  }
}
