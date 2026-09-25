"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export type Workout = {
  id: string;
  name: string;
  description?: string;
  image: string;
  tags: string[];
  equipment: string;
  difficulty?: string;
  sets?: number;
  reps?: string;
  duration: number;
  calories: number;
  rating: number;
  instructions?: string[];
};

type WorkoutContextType = {
  plan: Workout[];
  saved: Workout[];
  addToPlan: (workout: Workout) => void;
  addToSaved: (workout: Workout) => void;
  removeFromPlan: (id: string) => void;
  removeFromSaved: (id: string) => void;
  markAsDone: (id: string) => void;
};

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);

  // Load from local storage on refresh
  useEffect(() => {
    const localPlan = localStorage.getItem("fitlog_plan");
    const localSaved = localStorage.getItem("fitlog_saved");
    if (localPlan) setPlan(JSON.parse(localPlan));
    if (localSaved) setSaved(JSON.parse(localSaved));
  }, []);

  // Save to local storage when changed
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

  const removeFromPlan = (id: string) => {
    setPlan(plan.filter((w) => w.id !== id));
    toast.info("Removed from plan");
  };

  const removeFromSaved = (id: string) => {
    setSaved(saved.filter((w) => w.id !== id));
    toast.info("Removed from saved");
  };

  const markAsDone = (id: string) => {
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