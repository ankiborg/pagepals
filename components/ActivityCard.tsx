import Link from "next/link";
import { Activity } from "@/types/activity";

const TYPE_EMOJI: Record<string, string> = {
  "word-search": "🔤",
  maze: "🌀",
  coloring: "🎨",
  crossword: "✏️",
  "secret-code": "🔐",
  "spot-the-difference": "🔍",
  bingo: "🎱",
  math: "🔢",
};

const DIFFICULTY_COLOR: Record<string, string> = {
  easy: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  hard: "bg-red-100 text-red-700",
};

interface ActivityCardProps {
  activity: Activity;
}

export default function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <Link
      href={`/activities/${activity.id}`}
      className="group block rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md hover:border-indigo-200"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-3xl">{TYPE_EMOJI[activity.type] ?? "📄"}</span>
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${DIFFICULTY_COLOR[activity.difficulty]}`}
        >
          {activity.difficulty}
        </span>
      </div>

      <h3 className="mt-3 font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
        {activity.title}
      </h3>
      <p className="mt-1 text-sm text-gray-500 line-clamp-2">
        {activity.description}
      </p>

      <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-400">
        <span className="capitalize">📌 {activity.theme}</span>
        <span>
          👶 Ages {activity.ageMin}–{activity.ageMax}
        </span>
      </div>
    </Link>
  );
}
