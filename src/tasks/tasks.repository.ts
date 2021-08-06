import { EntityRepository, Repository } from 'typeorm';
import { FilterDto } from './dto/get-task-filter-dto';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTasks(filterDto: FilterDto): Promise<Task[]> {
    const { status, search } = filterDto;

    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status=:status', { status }); //status:'OPEN' hard coded!
    }
    if (search) {
      query.orWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        { search: `%${search}%` }, // looking not for the exact search word
      );
    }
    const tasks = await query.getMany();
    return tasks;
  }
}
