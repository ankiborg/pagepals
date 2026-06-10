export type ActivityType =
  | "word-search"
  | "maze"
  | "coloring"
  | "crossword"
  | "secret-code"
  | "spot-the-difference"
  | "bingo"
  | "math";

export type Theme =
  | "animals"
  | "space"
  | "nature"
  | "food"
  | "vehicles"
  | "sports"
  | "fantasy"
  | "seasons"
  | "ocean"
  | "dinosaurs";

export type Difficulty = "easy" | "medium" | "hard";

export interface Activity {
  id: string;
  title: string;
  type: ActivityType;
  theme: Theme;
  ageMin: number;
  ageMax: number;
  difficulty: Difficulty;
  /** true = rendered by a React component; false = links to a static file in /public */
  generated: boolean;
  /** path to static file if generated = false */
  filePath?: string;
  description: string;
  tags?: string[];
}
