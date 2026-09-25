"use client";
import { useState } from "react";
import Link from "next/link";
// FIXED: Using relative path to go up one folder (../)
import { useWorkouts } from "../context/WorkoutContext";
import { Clock, Flame, Star, Check, X } from "lucide-react";

export default function MyPlan() {
  const { plan, saved, removeFromPlan, removeFromSaved, markAsDone } = useWorkouts();
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const [sortBy, setSortBy] = useState<"duration" | "calories" | "rating">("duration");

  const currentList = activeTab === "plan" ? plan : saved;
  
  const sortedList = [...currentList].sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    // FIXED: Updated to use caloriesBurned to match the API
    if (sortBy === "calories") return b.caloriesBurned - a.caloriesBurned; 
    return b.duration - a.duration; // default duration descending
  });

  const totalDuration = currentList.reduce((acc, curr) => acc + curr.duration, 0);
  // FIXED: Updated to use caloriesBurned to match the API so math doesn't break
  const totalCalories = currentList.reduce((acc, curr) => acc + (curr.caloriesBurned || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-oswald font-bold uppercase mb-2">My Plan</h1>
        <p className="text-gray-400">Cap of five lifts for today. Finish them, then load more.</p>
      </div>

      <div className="bg-darkcard border border-gray-800 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-800 mb-8">
        <div className="flex-1 py-4 md:py-0 md:px-8 first:pl-0 last:pr-0">
          <p className="text-gray-400 text-sm mb-1">Exercises</p>
          <p className="text-4xl font-oswald font-bold text-accent">{currentList.length}</p>
        </div>
        <div className="flex-1 py-4 md:py-0 md:px-8">
          <p className="text-gray-400 text-sm mb-1">Minutes</p>
          <p className="text-4xl font-oswald font-bold text-white">{totalDuration}</p>
        </div>
        <div className="flex-1 py-4 md:py-0 md:px-8">
          <p className="text-gray-400 text-sm mb-1">Calories</p>
          <p className="text-4xl font-oswald font-bold text-white">{totalCalories}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="bg-darkcard p-1 rounded-lg border border-gray-800 inline-flex">
          <button onClick={() => setActiveTab("plan")} className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === "plan" ? "bg-gray-800 text-white" : "text-gray-500 hover:text-gray-300"}`}>
            Today's Plan
          </button>
          <button onClick={() => setActiveTab("saved")} className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === "saved" ? "bg-gray-800 text-white" : "text-gray-500 hover:text-gray-300"}`}>
            Saved
          </button>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <span className="text-gray-400">Sort By</span>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value as any)}
            className="select select-sm select-bordered bg-darkcard border-gray-700 text-white"
          >
            <option value="duration">Duration</option>
            <option value="calories">Calories</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {sortedList.length === 0 ? (
        <div className="border border-dashed border-gray-700 rounded-2xl py-24 flex flex-col items-center justify-center text-center">
          <h3 className="text-2xl font-oswald font-bold uppercase mb-2">Nothing Here Yet</h3>
          <p className="text-gray-400 mb-6">Browse the library and add a lift to get today moving.</p>
          <Link href="/" className="btn bg-accent text-black border-none hover:bg-[#aacc00] px-8 rounded-md font-bold">
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedList.map(workout => (
            <div key={workout.id} className="bg-darkcard border border-gray-800 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-6">
              <img src={workout.image} alt={workout.name} className="w-full sm:w-32 h-24 object-cover rounded-lg" />
              <div className="flex-1 w-full text-center sm:text-left">
                <h3 className="text-xl font-oswald font-bold uppercase mb-1">{workout.name}</h3>
                <p className="text-sm text-gray-400 mb-3">{workout.equipment}</p>
                <div className="flex justify-center sm:justify-start items-center gap-4 text-xs text-gray-300">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-accent" /> {workout.duration} min</span>
                  {/* FIXED: Updated to use caloriesBurned here as well */}
                  <span className="flex items-center gap-1"><Flame className="w-3 h-3 text-accent" /> {workout.caloriesBurned} kcal</span>
                  <span className="flex items-center gap-1"><Star className="w-3 h-3 text-accent" /> {workout.rating}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto mt-4 sm:mt-0">
                <Link href={`/workout/${workout.id}`} className="btn btn-sm btn-outline text-gray-300 hover:text-white border-gray-700 rounded flex-1 sm:flex-none">
                  View Details
                </Link>
                {activeTab === "plan" && (
                  <button onClick={() => markAsDone(workout.id)} className="btn btn-sm bg-accent text-black hover:bg-[#aacc00] border-none rounded flex-1 sm:flex-none">
                    <Check className="w-4 h-4" /> Mark as Done
                  </button>
                )}
                <button 
                  onClick={() => activeTab === "plan" ? removeFromPlan(workout.id) : removeFromSaved(workout.id)} 
                  className="btn btn-sm btn-square btn-ghost text-gray-500 hover:text-red-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}