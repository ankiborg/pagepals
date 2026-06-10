"use client";

import { ACTIVITY_TYPES, AGE_RANGES, THEMES } from "@/data/activities";

interface Filters {
  type: string;
  theme: string;
  age: string;
}

interface FilterBarProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

export default function FilterBar({ filters, onChange }: FilterBarProps) {
  const selectClass =
    "rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer";

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <select
        className={selectClass}
        value={filters.type}
        onChange={(e) => onChange({ ...filters, type: e.target.value })}
      >
        <option value="">All types</option>
        {ACTIVITY_TYPES.map((t) => (
          <option key={t.value} value={t.value}>
            {t.label}
          </option>
        ))}
      </select>

      <select
        className={selectClass}
        value={filters.theme}
        onChange={(e) => onChange({ ...filters, theme: e.target.value })}
      >
        <option value="">All themes</option>
        {THEMES.map((t) => (
          <option key={t.value} value={t.value}>
            {t.label}
          </option>
        ))}
      </select>

      <select
        className={selectClass}
        value={filters.age}
        onChange={(e) => onChange({ ...filters, age: e.target.value })}
      >
        <option value="">All ages</option>
        {AGE_RANGES.map((a) => (
          <option key={a.value} value={a.value}>
            {a.label}
          </option>
        ))}
      </select>

      {(filters.type || filters.theme || filters.age) && (
        <button
          onClick={() => onChange({ type: "", theme: "", age: "" })}
          className="text-sm text-indigo-600 hover:underline"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
