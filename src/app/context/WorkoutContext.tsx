"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export type Workout = {
  id: number;
  name: string;
  description?: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty?: string;
  sets?: number;
  reps?: string;
  duration: number;
  caloriesBurned: number;
  rating: number;
  instructions?: string[];
};


type WorkoutContextType = {
  plan: Workout[];
  saved: Workout[];
  addToPlan: (workout: Workout) => void;
  addToSaved: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  markAsDone: (id: number) => void;
};

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);

  useEffect(() => {
    const localPlan = localStorage.getItem("fitlog_plan");
    const localSaved = localStorage.getItem("fitlog_saved");
    if (localPlan) setPlan(JSON.parse(localPlan));
    if (localSaved) setSaved(JSON.parse(localSaved));
  }, []);

  useEffect(() => {
    localStorage.setItem("fitlog_plan", JSON.stringify(plan));
    localStorage.setItem("fitlog_saved", JSON.stringify(saved));
  }, [plan, saved]);

  const addToPlan = (workout: Workout) => {
    if (plan.find((w) => w.id === workout.id)) {
      toast.warning("Already in today's plan!");
      return;
    }
    setPlan([...plan, workout]);
    toast.success("Added to today's plan!");
  };

  const addToSaved = (workout: Workout) => {
    if (saved.find((w) => w.id === workout.id)) {
      toast.warning("Already saved!");
      return;
    }
    setSaved([...saved, workout]);
    toast.success("Saved for later!");
  };

  // FIXED: Parameter is now 'id: number'
  const removeFromPlan = (id: number) => {
    setPlan(plan.filter((w) => w.id !== id));
    toast.info("Removed from plan");
  };

  
  const removeFromSaved = (id: number) => {
    setSaved(saved.filter((w) => w.id !== id));
    toast.info("Removed from saved");
  };

  
  const markAsDone = (id: number) => {
    setPlan(plan.filter((w) => w.id !== id));
    toast.success("Great job! Workout marked as done.");
  };

  return (
    <WorkoutContext.Provider value={{ plan, saved, addToPlan, addToSaved, removeFromPlan, removeFromSaved, markAsDone }}>
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkouts = () => {
  const context = useContext(WorkoutContext);
  if (!context) throw new Error("useWorkouts must be used within a WorkoutProvider");
  return context;
};