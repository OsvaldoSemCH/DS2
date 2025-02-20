interface ITask
{
    readonly _id : string
    title : string
    description : string
    completed : boolean
    readonly createdAt : Date
    readonly updatedAt : Date
}