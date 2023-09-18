import { GetTaskDTO } from "./get-task.dto";
import { TaskEntity } from "./task.entity";

export class TaskMapper {
  static mapToDTO(entity) {
    return new GetTaskDTO(entity);
  }

  static maptToEntity(dto) {
    return new TaskEntity(dto);
  }
}
