import { GetTaskDTO } from "./get-task.dto";

export class TaskMapper {
  static mapToDTO(entity) {
    console.log(entity);
    return new GetTaskDTO(entity);
  }
}
