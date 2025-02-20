"use client"
import { Concert_One } from "next/font/google";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home()
{
    const [Tasks, SetTasks] = useState<ITask[]>([]);
    const [ShowNew, SetShowNew] = useState<boolean>(false);
    const [ShowRequired, SetShowRequired] = useState<boolean>(false);
    const [ShowDelete, SetShowDelete] = useState<ITask | null>(null);
    const [Title, SetTitle] = useState<string>("");
    const [Description, SetDescription] = useState<string>("");
    
    useEffect(() =>
    {
        fetch("http://localhost:8080/tasks")
        .then((res) => (res.json()))
        .then((data) => SetTasks(data))
        .catch((error) => {console.log(error)})
    }, [Tasks])

    Tasks.sort((T1, T2) => (new Date(T2.createdAt).getTime() - new Date(T1.createdAt).getTime()))

    function ToggleCompleted(Task : ITask)
    {
        Task.completed = !Task.completed;
        fetch
        (
            `http://localhost:8080/tasks/${Task._id}`,
            {
                method: "PUT",
                body: JSON.stringify(Task),
                headers:
                {
                    'Content-Type': 'application/json'
                }
            }
        )
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((error) => {console.log(error)});
    }

    function DeleteTask(Task : ITask)
    {
        fetch
        (
            `http://localhost:8080/tasks/${Task._id}`,
            {
                method: "DELETE"
            }
        )
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((error) => {console.log(error)});
    }

    function CreateTask()
    {
        if(Title == ""){SetShowRequired(true); return;}
        let Task = {title:Title, description: Description}
        fetch
        (
            `http://localhost:8080/tasks`,
            {
                method: "POST",
                body: JSON.stringify(Task),
                headers:
                {
                    'Content-Type': 'application/json'
                }
            }
        )
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((error) => {console.log(error)});

        /*
        SetTitle("");
        SetDescription("");
        */
    }

    return(
        <>
        <div className="flex justify-center mt-24">
            {
                ShowDelete == null ? <></> :
                <div className="fixed bg-black bg-opacity-50 z-50 inset-0 flex justify-center items-center">
                    <div className="bg-blue-700 rounded-xl w-64 h-48 text-white flex flex-col justify-evenly items-center">
                        <p className="text-xl font-bold">Are you sure?</p>
                        <div className="flex gap-6">
                            <button onClick={() => {DeleteTask(ShowDelete); SetShowDelete(null)}} className="bg-red-600 h-8 w-16 mt-12 rounded-lg">
                                Delete
                            </button>
                            <button onClick={() => SetShowDelete(null)} className="bg-blue-300 h-8 w-16 mt-12 rounded-lg text-black">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            }
            <div className="w-96 px-12">
                <button onClick={() => SetShowNew(!ShowNew)} className="bg-blue-300 h-8 w-24 mt-12 rounded-lg">
                    {ShowNew ? "Hide" : "Create New"}
                </button>
                {
                    ShowNew ?
                    <div className="flex flex-col">
                        <p>Title <span className="text-red-600">*</span>:</p>
                        <input onChange={(text) => SetTitle(text.target.value)} type="text" className="border border-black"/>
                        <p>Description:</p>
                        <input onChange={(text) => SetDescription(text.target.value)} type="text" className="border border-black"/>
                        {ShowRequired ? <p>Title is required</p> : <></>}
                        <button onClick={() => CreateTask()} className="bg-blue-300 h-8 w-24 mt-12 rounded-lg">
                            Create
                        </button>
                    </div>
                    :
                    <></>
                }
            </div>
            <table className="">
                <thead>
                    <tr>
                        <th className="border border-black border-solid p-4 text-center min-w-32">Title</th>
                        <th className="border border-black border-solid p-4 text-center min-w-32">Description</th>
                        <th className="border border-black border-solid p-4 text-center min-w-32">Completed</th>
                        <th className="border border-black border-solid p-4 text-center min-w-32">Created</th>
                        <th className="border border-black border-solid p-4 text-center min-w-32">Updated</th>
                        <th className="border border-black border-solid p-4 text-center min-w-32">Deletema</th>
                    </tr>
                </thead>
                <tbody>
                {Tasks.map((item, index) =>
                {
                    let tdstyle = "border border-black border-solid p-4 text-center min-w-32 "
                    if(index & 0b1)
                    {
                        tdstyle += "bg-blue-400"
                    }else
                    {
                        tdstyle += "bg-blue-200"
                    }
                    return(
                    <tr key={index}>
                        <td className={tdstyle}>{item.title}</td>
                        <td className={tdstyle}>{item.description}</td>
                        <td className={tdstyle} onClick={() => ToggleCompleted(item)}>{item.completed ? "✅" : "❌"}</td>
                        <td className={tdstyle}>{new Date(item.createdAt).toLocaleString("pt-BR")}</td>
                        {
                            item.updatedAt == item.createdAt ?
                            <td className={tdstyle}>N/A</td>
                            :
                            <td className={tdstyle}>{new Date(item.updatedAt).toLocaleString("pt-BR")}</td>
                        }
                        <td className={tdstyle} onClick={() => SetShowDelete(item)}>🗑</td>
                    </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
        </>
    );
}
