import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { CreateTaskDto } from './dto/create-task-dto';
import { FilterDto } from './dto/get-task-filter-dto';
import { UpdateTaskStatusDto } from './dto/update-task-status-dto';
import { Task } from './task.entity';

import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: FilterDto): Promise<Task[]> {
    return this.taskService.getTasks(filterDto);
  }
  // @Get()
  // gettasks(@Query() filterDto: FilterDto): Task[] {
  //   if (Object.keys(filterDto).length) {
  //     return this.taskService.getTasksFiltered(filterDto);
  //   }
  //   return this.taskService.getAllTasks();
  // }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }
  // @Get('/:id')
  // getTaskById(@Param('id') id: string): Task {
  //   return this.taskService.getTaskById(id);
  // }
  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): Promise<void> {
    return this.taskService.deleteTaskById(id);
  }
  // @Delete('/:id')
  // deleteTaskById(@Param('id') id: string) {
  //   this.taskService.deleteTaskById(id);
  // }
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }
  // @Post()
  // createTask(@Body() createTaskDto: CreateTaskDto): Task {
  //   return this.taskService.createTask(createTaskDto);
  // }

  @Patch('/:id/status')
  updateTaskById(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.taskService.updateTaskById(id, status);
  }
  // @Patch('/:id/status')
  // updateTaskById(
  //   @Param('id') id: string,
  //   @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  // ): Task {
  //   const { status } = updateTaskStatusDto;
  //   return this.taskService.updateTaskById(id, status);
  // }
}
