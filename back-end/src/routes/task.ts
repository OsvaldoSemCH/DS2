import express, { Request, Response, Router } from 'express';
import TaskModel, {ITask} from '../models/task.ts';

const TaskRoutes : Router = express.Router();

TaskRoutes.post('/', async (req: Request, res: Response) =>
{
    const Task : ITask = req.body;
    try
    {
        Task.createdAt = new Date();
        Task.updatedAt = new Date();
        const T = new TaskModel(Task);
        await T.save();
        res.status(201).json(T);
    }catch(error)
    {
        res.status(400).json({message: 'Could not create task', error});
    }
});

TaskRoutes.get('/', async (req: Request, res: Response) =>
{
    try
    {
        const T = await TaskModel.find();
        res.status(201).json(T);
    }catch(error)
    {
        res.status(400).json({message: 'Could not retrieve data', error});
    }
});

TaskRoutes.get('/:id', async (req: Request, res: Response) =>
{
    const id = req.params.id;
    try
    {
        const T = await TaskModel.findById(id);
        if(T)
        {
            res.status(201).json(T);
        }else
        {
            res.status(404).json({message: 'Task not found'});
        }
    }catch(error)
    {
        res.status(400).json({message: 'Could not retrieve data', error});
    }
});

TaskRoutes.put('/:id', async (req: Request, res: Response) =>
{
    const id = req.params.id;
    let Task : ITask = req.body;
    try
    {
        Task.updatedAt = new Date();
        const T = await TaskModel.findByIdAndUpdate(id, Task, { new: true });
        if(T)
        {
            res.status(200).json(T);
        }else
        {
            res.status(404).json({message: 'Task not found'});
        }
    }catch(error)
    {
        res.status(400).json({message: 'Could not update data', error});
    }
});

TaskRoutes.delete('/:id', async (req: Request, res: Response) =>
{
    const id = req.params.id;
    try
    {
        const T = await TaskModel.findByIdAndDelete(id);
        if(T)
        {
            res.status(200).json({message: 'Task deleted successfully'});
        }else
        {
            res.status(404).json({message: 'Task not found'});
        }
    } catch (error)
    {
        res.status(400).json({message: 'Could not delete data', error});
    }
});

export default TaskRoutes;