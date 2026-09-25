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

  