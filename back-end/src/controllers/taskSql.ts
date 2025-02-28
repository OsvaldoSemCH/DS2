import TaskModel, { ITask } from "../models/task.ts";
import express, { Request, Response, Router } from 'express';
import { prisma } from "../lib/prisma.ts";

export default class SqlTaskController
{
    static async GetTasks(req : Request, res : Response)
    {
        try
        {
            const T = prisma.task.findMany();
            res.status(201).json(T);
        }catch(error)
        {
            res.status(400).json({message: 'Could not retrieve data', error});
        }
    }

    static async CreateTask(req : Request, res : Response)
    {
        const Task : ITask = req.body;
        try
        {
            Task.createdAt = new Date();
            Task.updatedAt = new Date();
            const T = await prisma.task.create({data: {title: Task.title, description: Task.description}})
            res.status(201).json(T);
        }catch(error)
        {
            res.status(400).json({message: 'Could not create task', error});
        }
    }

    static async GetTaskByID(req : Request, res : Response)
    {
        const id = req.params.id;
        try
        {
            const T = await prisma.task.findUnique({where: {id: parseInt(id)}});
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
    }

    static async UpdateTask(req : Request, res : Response)
    {
        const id = req.params.id;
        let Task : ITask = req.body;
        try
        {
            Task.updatedAt = new Date();
            const T = await prisma.task.update({where: {id: parseInt(id)}, data: Task});
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
    }

    static async DeleteTask(req : Request, res : Response)
    {
        const id = req.params.id;
        try
        {
            const T = await prisma.task.delete({where: {id: parseInt(id)}})
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
    }
}