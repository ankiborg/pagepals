"use client";

import { useState } from "react";
import { Activity } from "@/types/activity";
import ActivityCard from "./ActivityCard";
import FilterBar from "./FilterBar";
import { getActivities } from "@/data/activities";

export default function ActivityGrid() {
  const [filters, setFilters] = useState({ type: "", theme: "", age: "" });

  const filtered = getActivities({
    type: filters.type || undefined,
    theme: filters.theme || undefined,
    age: filters.age ? parseInt(filters.age) : undefined,
  });

  return (
    <div>
      <FilterBar filters={filters} onChange={setFilters} />

      <div className="mt-6">
        {filtered.length === 0 ? (
          <p className="text-gray-400 text-sm mt-8">
            No activities match those filters yet. More coming soon!
          </p>
        ) : (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((activity: Activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
