import express, { Request, Response, Router } from 'express';
import TaskModel, {ITask} from '../models/task.ts';
import MongoTaskController from '../controllers/taskMongo.ts';

const TaskRoutes : Router = express.Router();

TaskRoutes.post('/', async (req: Request, res: Response) => MongoTaskController.CreateTask(req, res));

TaskRoutes.get('/', async (req: Request, res: Response) => MongoTaskController.GetTasks(req, res))

TaskRoutes.get('/:id', async (req: Request, res: Response) => MongoTaskController.GetTaskByID(req, res));

TaskRoutes.put('/:id', async (req: Request, res: Response) => MongoTaskController.UpdateTask(req, res));

TaskRoutes.delete('/:id', async (req: Request, res: Response) => MongoTaskController.DeleteTask(req, res));

export default TaskRoutes;