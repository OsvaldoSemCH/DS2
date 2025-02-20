import mongoose, { Schema, Document } from 'mongoose';

interface ITask extends Document
{
    _id : string
    title : string
    description : string
    completed : boolean
    createdAt : Date
    updatedAt : Date
}

export {ITask};

const TaskSchema: Schema = new Schema
({
    title: { type: String, required: true },
    description: { type: String, required: false },
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
});

const TaskModel = mongoose.model<ITask>('Task', TaskSchema);

export default TaskModel;