import { Routes } from "@/constants/routes";
import Link from "next/link";

export default function Header()
{
    return(
        <header className="flex flex-row flex-wrap justify-center items-center bg-blue-700 w-full min-h-16 gap-4">
            {
            //<Link href={Routes.Home} className="p-2 bg-blue-400 rounded-lg min-w-20 text-center font-bold">Home</Link>
            }
        </header>
    )
}