export class GetTaskDTO {
  constructor({ id, name, description, isDone, created_at, updated_at }) {
    Object.assign(this, {
      id,
      name,
      description,
      isDone,
      created_at,
      updated_at,
    });
  }
}
