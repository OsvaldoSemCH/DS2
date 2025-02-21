import express, { Request, Response, Router } from 'express';
import TaskModel, {ITask} from '../models/task.ts';
import TaskController from '../controllers/task.ts';

const TaskRoutes : Router = express.Router();

TaskRoutes.post('/', async (req: Request, res: Response) => TaskController.CreateTask(req, res));

TaskRoutes.get('/', async (req: Request, res: Response) => TaskController.GetTasks(req, res))

TaskRoutes.get('/:id', async (req: Request, res: Response) => TaskController.GetTaskByID(req, res));

TaskRoutes.put('/:id', async (req: Request, res: Response) => TaskController.UpdateTask(req, res));

TaskRoutes.delete('/:id', async (req: Request, res: Response) => TaskController.DeleteTask(req, res));

export default TaskRoutes;