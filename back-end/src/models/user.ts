import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document
{
    _id : string;
    name: string;
    email: string;
    password: string;
}

export {IUser};

const UserSchema: Schema = new Schema
({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;