import { Activity } from "@/types/activity";

export const activities: Activity[] = [
  {
    id: "word-search-animals-easy",
    title: "Animal Word Search",
    type: "word-search",
    theme: "animals",
    ageMin: 5,
    ageMax: 8,
    difficulty: "easy",
    generated: true,
    description: "Find 8 animal names hidden in the grid.",
    tags: ["cat", "dog", "fox", "owl", "bee", "ant", "hen", "cow"],
  },
  {
    id: "word-search-space-medium",
    title: "Space Word Search",
    type: "word-search",
    theme: "space",
    ageMin: 7,
    ageMax: 11,
    difficulty: "medium",
    generated: true,
    description: "Discover planets, stars, and rockets hidden in the grid.",
    tags: ["mars", "moon", "star", "comet", "orbit", "solar", "venus", "pluto"],
  },
  {
    id: "bingo-animals-easy",
    title: "Animal Bingo",
    type: "bingo",
    theme: "animals",
    ageMin: 4,
    ageMax: 7,
    difficulty: "easy",
    generated: true,
    description: "Classic 5×5 bingo with animal pictures.",
  },
  {
    id: "math-addition-easy",
    title: "Addition Practice",
    type: "math",
    theme: "animals",
    ageMin: 5,
    ageMax: 8,
    difficulty: "easy",
    generated: true,
    description: "20 simple addition problems with a fun animal theme.",
  },
  {
    id: "maze-forest-easy",
    title: "Forest Maze",
    type: "maze",
    theme: "nature",
    ageMin: 4,
    ageMax: 7,
    difficulty: "easy",
    generated: true,
    description: "Help the rabbit find its way through the forest.",
  },
  {
    id: "word-search-dinosaurs-easy",
    title: "Dinosaur Word Search",
    type: "word-search",
    theme: "dinosaurs",
    ageMin: 6,
    ageMax: 10,
    difficulty: "easy",
    generated: true,
    description: "Find 10 prehistoric dinosaur names hidden in the grid.",
    tags: ["trex", "stego", "raptor", "tricera", "diplo", "bronto", "rex", "saur", "fossil", "dino"],
  },
  {
    id: "word-search-ocean-medium",
    title: "Ocean Word Search",
    type: "word-search",
    theme: "ocean",
    ageMin: 7,
    ageMax: 11,
    difficulty: "medium",
    generated: true,
    description: "Discover 9 sea creatures and ocean terms hidden in the grid.",
    tags: ["whale", "shark", "dolphin", "coral", "wave", "tide", "fish", "octopus", "seahorse"],
  },
  {
    id: "word-search-food-easy",
    title: "Food Word Search",
    type: "word-search",
    theme: "food",
    ageMin: 5,
    ageMax: 9,
    difficulty: "easy",
    generated: true,
    description: "Find 8 delicious food items hidden in the grid.",
    tags: ["pizza", "apple", "cake", "bread", "cheese", "pasta", "cookie", "banana"],
  },
  {
    id: "word-search-vehicles-medium",
    title: "Vehicle Word Search",
    type: "word-search",
    theme: "vehicles",
    ageMin: 6,
    ageMax: 10,
    difficulty: "medium",
    generated: true,
    description: "Find 10 different vehicles hidden in the grid.",
    tags: ["car", "truck", "plane", "train", "bike", "bus", "boat", "rocket", "scooter", "ship"],
  },
];

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
