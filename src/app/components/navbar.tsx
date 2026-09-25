"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWorkouts } from "../context/WorkoutContext";
import { Dumbbell } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useWorkouts();

  return (
    <div className="navbar bg-darkbg border-b border-gray-800 px-4 md:px-8 py-3 flex justify-between">
      
    
      <div className="navbar-start w-auto">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-wider text-white uppercase">
          <Image 
            src="/assets/logo.png" // <-- Simplified this path! Next.js automatically looks in the "public" folder.
            alt="FitLog Logo" 
            width={32} 
            height={32} 
            className="w-8 h-8 object-contain" 
          /> FITLOG
        </Link>
      </div>
      
    
      <div className="navbar-center hidden lg:flex">
        <ul className="flex gap-2 text-sm font-medium text-gray-400">
          <li>
            <Link 
              href="/" 
              className={`px-4 py-2 rounded-full transition ${
                pathname === "/" ? "text-accent bg-[#ccff00]/10" : "hover:text-white"
              }`}
            >
              Workouts
            </Link>
          </li>
          <li>
            <Link 
              href="/my-plan" 
              className={`px-4 py-2 rounded-full transition ${
                pathname === "/my-plan" ? "text-accent bg-[#ccff00]/10" : "hover:text-white"
              }`}
            >
              My Plan
            </Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end w-auto flex gap-4 text-sm font-medium">
        <Link href="/my-plan" className="flex items-center gap-2 text-gray-300 hover:text-white">
          Plan
          <span className="bg-accent text-black px-2 py-0.5 rounded-full text-xs font-bold">
            {plan?.length || 0}
          </span>
        </Link>
        <Link href="/my-plan" className="flex items-center gap-2 text-gray-300 hover:text-white">
          Saved
          <span className="border border-gray-500 text-gray-300 px-2 py-0.5 rounded-full text-xs font-bold">
            {saved?.length || 0}
          </span>
        </Link>
      </div>
      
    </div>
  );
}