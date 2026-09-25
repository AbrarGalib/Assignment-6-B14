"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";
import { Workout } from "@/context/WorkoutContext";

export default function Home() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.abcz.workers.dev/api/fitlog")
      .then((res) => res.json())
      .then((data) => {
        setWorkouts(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="bg-darkcard rounded-3xl p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center gap-12">
          
          <div className="flex-1 space-y-6">
            <p className="text-accent font-bold tracking-widest text-sm uppercase">Workout Library</p>
           <h1 className="text-5xl md:text-6xl lg:text-5xl font-oswald font-bold uppercase leading-[1.1] text-white">
              Train with intent. Log <br />
              every set.
            </h1>
            <p className="text-gray-400 text-lg max-w-lg">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.
            </p>
            <button 
              onClick={() => document.getElementById("library")?.scrollIntoView({ behavior: "smooth" })}
              className="btn bg-accent text-black border-none hover:bg-[#aacc00] px-8 rounded-md uppercase font-bold"
            >
              Browse Workouts
            </button>
          </div>
          
          <div className="flex-1 flex justify-center md:justify-end">
            
            <img 
              src="/assets/banner.png" 
              alt="Hero Banner" 
              className="w-full max-w-lg h-auto object-contain" 
            />
          </div>
          
        </div>
      </section>

      {/* LIBRARY SECTION */}
      <section id="library" className="max-w-7xl mx-auto px-4 md:px-8 py-16 border-t border-gray-800">
        <h2 className="text-3xl font-oswald font-bold uppercase mb-2">The Library</h2>
        <p className="text-gray-400 mb-10">Twelve lifts covering every major muscle group.</p>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <span className="loading loading-spinner loading-lg text-accent"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workouts.map((workout) => (
              <Link href={`/workout/${workout.id}`} key={workout.id} className="bg-darkcard border border-transparent rounded-xl overflow-hidden hover:border-accent transition-colors cursor-pointer group flex flex-col">
                <div className="h-64 overflow-hidden">
                  <img src={workout.image} alt={workout.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {workout.muscleGroups?.map(tag => (
                      <span key={tag} className="bg-accent text-black text-xs font-bold px-2 py-1 rounded-full uppercase">{tag}</span>
                    ))}
                  </div>
                  <h3 className="text-xl font-oswald font-bold uppercase mb-1 text-white">{workout.name}</h3>
                  <p className="text-sm text-gray-400 mb-6 flex-grow">{workout.equipment}</p>
                  
                  <div className="flex justify-between items-center text-sm text-gray-300 mt-auto">
                    <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> {workout.duration} min</div>
                    <div className="flex items-center gap-1"><Flame className="w-4 h-4" /> {workout.calories} kcal</div>
                    <div className="flex items-center gap-1"><Star className="w-4 h-4 text-accent" /> {workout.rating}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}