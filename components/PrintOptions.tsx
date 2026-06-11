"use client";

import Link from "next/link";
import { Activity } from "@/types/activity";
import { getActivities } from "@/data/activities";

interface PrintOptionsProps {
  currentActivity: Activity;
}

export default function PrintOptions({ currentActivity }: PrintOptionsProps) {
  const allActivities = getActivities();
  const otherWordSearches = allActivities.filter(
    (activity) => 
      activity.type === "word-search" && 
      activity.id !== currentActivity.id
  );

  return (
    <div className="mb-6 print:hidden">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Print Options:</h3>
      
      <div className="flex flex-wrap gap-2">
        {/* Single activity print */}
        <button
          onClick={() => window.print()}
          className="rounded-full bg-indigo-600 text-white px-4 py-2 text-sm font-medium hover:bg-indigo-700 transition"
        >
          🖨️ Print Portrait (Single)
        </button>

        {/* Two activities print dropdown */}
        {otherWordSearches.length > 0 && (
          <div className="relative group">
            <button className="rounded-full bg-purple-600 text-white px-4 py-2 text-sm font-medium hover:bg-purple-700 transition">
              📄 Print Landscape (Two Activities) ▼
            </button>
            
            <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-10 min-w-64 hidden group-hover:block">
              <div className="py-2">
                <div className="px-3 py-1 text-xs text-gray-500 border-b">
                  Choose second activity:
                </div>
                {otherWordSearches.slice(0, 5).map((activity) => (
                  <Link
                    key={activity.id}
                    href={`/activities/print/${currentActivity.id}/${activity.id}`}
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                  >
                    {activity.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}