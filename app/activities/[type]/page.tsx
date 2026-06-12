"use client";

import { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import { getActivities, ACTIVITY_TYPES, THEMES } from "@/data/activities";
import { Activity, Difficulty } from "@/types/activity";
import WordSearch from "@/components/activities/WordSearch";
import PrintButton from "@/components/PrintButton";
import Link from "next/link";

interface Props {
  params: Promise<{ type: string }>;
}

const DIFFICULTY_OPTIONS: { value: Difficulty; label: string }[] = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

export default function ActivityTypePage({ params }: Props) {
  const [resolvedParams, setResolvedParams] = useState<{ type: string } | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<string>("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>("easy");
  const [currentActivity, setCurrentActivity] = useState<Activity | null>(null);

  // Resolve params on client side
  useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  // Validate activity type
  const isValidType = resolvedParams && ACTIVITY_TYPES.some(t => t.value === resolvedParams.type);
  if (resolvedParams && !isValidType) {
    notFound();
  }

  const activityType = ACTIVITY_TYPES.find(t => t.value === resolvedParams?.type);

  // Get available activities for this type
  const availableActivities = resolvedParams ? getActivities({ type: resolvedParams.type }) : [];
  
  // Get unique themes available for this activity type
  const availableThemes = [...new Set(availableActivities.map(a => a.theme))];
  
  // Filter activities based on current selections
  const filteredActivities = availableActivities.filter(activity => {
    const matchesTheme = !selectedTheme || activity.theme === selectedTheme;
    const matchesDifficulty = activity.difficulty === selectedDifficulty;
    return matchesTheme && matchesDifficulty;
  });

  // Update current activity when filters change
  useEffect(() => {
    if (filteredActivities.length > 0) {
      setCurrentActivity(filteredActivities[0]);
    } else {
      setCurrentActivity(null);
    }
  }, [filteredActivities, selectedTheme, selectedDifficulty]);

  // Set initial theme when activities load
  useEffect(() => {
    if (availableThemes.length > 0 && !selectedTheme) {
      setSelectedTheme(availableThemes[0]);
    }
  }, [availableThemes, selectedTheme]);

  if (!resolvedParams) {
    return <div>Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-amber-50">
      <header className="bg-white border-b border-gray-100 shadow-sm print:hidden">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/" className="text-indigo-600 hover:underline text-sm">
            ← Back
          </Link>
          <span className="text-gray-300">|</span>
          <span className="text-sm font-medium text-gray-700">
            {activityType?.label || resolvedParams.type}
          </span>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Activity Type Header */}
        <div className="text-center mb-8 print:hidden">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {activityType?.label || resolvedParams.type}
          </h1>
          <p className="text-gray-600">
            Select a theme and difficulty to generate your activity
          </p>
        </div>

        {/* Theme and Difficulty Selectors */}
        <div className="flex flex-wrap gap-4 mb-6 print:hidden justify-center">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Theme:</label>
            <select
              className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer min-w-[120px]"
              value={selectedTheme}
              onChange={(e) => setSelectedTheme(e.target.value)}
            >
              <option value="">Any theme</option>
              {availableThemes.map((theme) => {
                const themeInfo = THEMES.find(t => t.value === theme);
                return (
                  <option key={theme} value={theme}>
                    {themeInfo?.label || theme}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Difficulty:</label>
            <select
              className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer min-w-[120px]"
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value as Difficulty)}
            >
              {DIFFICULTY_OPTIONS.map((difficulty) => (
                <option key={difficulty.value} value={difficulty.value}>
                  {difficulty.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Current Activity Meta */}
        {currentActivity && (
          <div className="flex flex-wrap gap-2 mb-6 print:hidden justify-center">
            <span className="rounded-full bg-indigo-100 text-indigo-700 px-3 py-1 text-xs font-medium capitalize">
              {currentActivity.type.replace("-", " ")}
            </span>
            <span className="rounded-full bg-purple-100 text-purple-700 px-3 py-1 text-xs font-medium capitalize">
              {currentActivity.theme}
            </span>
            <span className="rounded-full bg-gray-100 text-gray-600 px-3 py-1 text-xs font-medium">
              Ages {currentActivity.ageMin}–{currentActivity.ageMax}
            </span>
            <span className="rounded-full bg-green-100 text-green-700 px-3 py-1 text-xs font-medium capitalize">
              {currentActivity.difficulty}
            </span>
          </div>
        )}

        {/* Print button */}
        <div className="flex justify-center mb-6 print:hidden">
          <PrintButton />
        </div>

        {/* Activity content */}
        <div className="bg-white rounded-2xl shadow-sm p-8 print:shadow-none print:p-0">
          {currentActivity ? (
            <>
              {currentActivity.type === "word-search" && currentActivity.tags && (
                <WordSearch
                  words={currentActivity.tags}
                  title={currentActivity.title}
                  gridSize={12}
                />
              )}

              {currentActivity.type !== "word-search" && (
                <div className="text-center text-gray-400 py-16">
                  <p className="text-4xl mb-3">🚧</p>
                  <p className="font-medium">This activity type is coming soon!</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {currentActivity.title} - {currentActivity.description}
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center text-gray-400 py-16">
              <p className="text-4xl mb-3">🔍</p>
              <p className="font-medium">No activities found</p>
              <p className="text-sm text-gray-500 mt-2">
                Try selecting a different theme or difficulty
              </p>
            </div>
          )}
        </div>

        {/* Available alternatives */}
        {currentActivity && filteredActivities.length > 1 && (
          <div className="mt-6 print:hidden">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Other {activityType?.label} activities with this theme and difficulty:
            </h3>
            <div className="flex flex-wrap gap-2">
              {filteredActivities.slice(1, 4).map((activity) => (
                <button
                  key={activity.id}
                  onClick={() => setCurrentActivity(activity)}
                  className="text-sm bg-gray-100 hover:bg-indigo-100 px-3 py-2 rounded-full transition-colors"
                >
                  {activity.title}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}