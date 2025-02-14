import { Express } from 'express';
import express from 'express';
import TaskRoutes from './task.ts';

export default function InitRoutes(app: Express)
{
    app.use(express.json())
    app.use('/tasks', TaskRoutes)
}