"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
// FIXED: Using relative path to go up two folders (../../) 
import { useWorkouts, Workout } from "../../context/WorkoutContext";
import { CalendarPlus, Bookmark } from "lucide-react";

export default function WorkoutDetails() {
  const { id } = useParams();
  const { addToPlan, addToSaved } = useWorkouts();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setWorkout(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="flex justify-center py-32"><span className="loading loading-spinner loading-lg text-accent"></span></div>;
  if (!workout) return <div className="text-center py-32 text-xl font-oswald uppercase">Workout Not Found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 flex flex-col lg:flex-row gap-12">
      <div className="flex-1">
        <img src={workout.image} alt={workout.name} className="w-full h-auto rounded-2xl object-cover shadow-2xl" />
      </div>
      
      <div className="flex-1 space-y-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-oswald font-bold uppercase mb-4">{workout.name}</h1>
          <p className="text-gray-400 text-lg mb-4">{workout.description}</p>
          <div className="flex gap-2">
            {/* FIXED: Added the question mark here to prevent the map error */}
            {workout.muscleGroups?.map(tag => (
              <span key={tag} className="bg-accent text-black text-xs font-bold px-3 py-1 rounded-full uppercase">{tag}</span>
            ))}
          </div>
        </div>

        <div className="bg-darkcard rounded-xl divide-y divide-gray-800 border border-gray-800">
          {[
            { label: "Equipment", value: workout.equipment },
            { label: "Difficulty", value: workout.difficulty },
            { label: "Sets", value: workout.sets },
            { label: "Reps", value: workout.reps },
            { label: "Duration", value: `${workout.duration} min` },
            { label: "Calories", value: `${workout.calories} kcal` },
            { label: "Rating", value: workout.rating },
          ].map((stat, i) => (
            <div key={i} className="flex justify-between items-center p-4 text-sm">
              <span className="text-gray-400 uppercase font-bold tracking-wider">{stat.label}</span>
              <span className="text-white">{stat.value}</span>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-xl font-oswald font-bold uppercase mb-4">Instructions</h3>
          <ol className="list-decimal list-inside space-y-3 text-gray-300">
            {workout.instructions?.map((step, i) => (
              <li key={i} className="leading-relaxed">{step}</li>
            ))}
          </ol>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button onClick={() => addToPlan(workout)} className="btn bg-accent text-black hover:bg-[#aacc00] border-none flex-1 flex items-center gap-2 rounded-md">
            <CalendarPlus className="w-5 h-5" /> Add to today's plan
          </button>
          <button onClick={() => addToSaved(workout)} className="btn btn-outline border-gray-600 text-white hover:bg-gray-800 flex-1 flex items-center gap-2 rounded-md">
            <Bookmark className="w-5 h-5" /> Save for later
          </button>
        </div>
      </div>
    </div>
  );
}