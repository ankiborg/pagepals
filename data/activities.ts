import { Activity } from "@/types/activity";

export const activities: Activity[] = [];

export function getActivities(filters?: {
  type?: string;
  theme?: string;
  age?: number;
}): Activity[] {
  if (!filters) return activities;

  return activities.filter((a) => {
    if (filters.type && a.type !== filters.type) return false;
    if (filters.theme && a.theme !== filters.theme) return false;
    if (filters.age && (a.ageMin > filters.age || a.ageMax < filters.age))
      return false;
    return true;
  });
}

export function getActivityById(id: string): Activity | undefined {
  return activities.find((a) => a.id === id);
}

export const ACTIVITY_TYPES: { value: string; label: string }[] = [
  { value: "word-search", label: "Word Search" },
  { value: "maze", label: "Maze" },
  { value: "coloring", label: "Coloring Page" },
  { value: "crossword", label: "Crossword" },
  { value: "secret-code", label: "Secret Code" },
  { value: "spot-the-difference", label: "Spot the Difference" },
  { value: "bingo", label: "Bingo" },
  { value: "math", label: "Math" },
];

export const THEMES: { value: string; label: string }[] = [
  { value: "animals", label: "Animals" },
  { value: "space", label: "Space" },
  { value: "nature", label: "Nature" },
  { value: "food", label: "Food" },
  { value: "vehicles", label: "Vehicles" },
  { value: "sports", label: "Sports" },
  { value: "fantasy", label: "Fantasy" },
  { value: "seasons", label: "Seasons" },
  { value: "ocean", label: "Ocean" },
  { value: "dinosaurs", label: "Dinosaurs" },
];

export const AGE_RANGES = [
  { value: 4, label: "Age 4" },
  { value: 5, label: "Age 5" },
  { value: 6, label: "Age 6" },
  { value: 7, label: "Age 7" },
  { value: 8, label: "Age 8" },
  { value: 9, label: "Age 9" },
  { value: 10, label: "Age 10" },
  { value: 11, label: "Age 11" },
  { value: 12, label: "Age 12" },
];
