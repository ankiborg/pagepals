import { getActivityById } from "@/data/activities";
import { notFound } from "next/navigation";
import WordSearch from "@/components/activities/WordSearch";
import PrintButton from "@/components/PrintButton";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ActivityPage({ params }: Props) {
  const { id } = await params;
  const activity = getActivityById(id);
  if (!activity) notFound();

  return (
    <main className="min-h-screen bg-amber-50">
      <header className="bg-white border-b border-gray-100 shadow-sm print:hidden">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/" className="text-indigo-600 hover:underline text-sm">
            ← Back
          </Link>
          <span className="text-gray-300">|</span>
          <span className="text-sm font-medium text-gray-700">{activity.title}</span>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Meta bar */}
        <div className="flex flex-wrap gap-2 mb-6 print:hidden">
          <span className="rounded-full bg-indigo-100 text-indigo-700 px-3 py-1 text-xs font-medium capitalize">
            {activity.type.replace("-", " ")}
          </span>
          <span className="rounded-full bg-purple-100 text-purple-700 px-3 py-1 text-xs font-medium capitalize">
            {activity.theme}
          </span>
          <span className="rounded-full bg-gray-100 text-gray-600 px-3 py-1 text-xs font-medium">
            Ages {activity.ageMin}–{activity.ageMax}
          </span>
          <span className="rounded-full bg-green-100 text-green-700 px-3 py-1 text-xs font-medium capitalize">
            {activity.difficulty}
          </span>
        </div>

        {/* Print button */}
        <PrintButton />

        {/* Activity content */}
        <div className="bg-white rounded-2xl shadow-sm p-8 print:shadow-none print:p-0">
          {activity.type === "word-search" && activity.tags && (
            <WordSearch
              words={activity.tags}
              title={activity.title}
              gridSize={12}
            />
          )}

          {activity.type !== "word-search" && (
            <div className="text-center text-gray-400 py-16">
              <p className="text-4xl mb-3">🚧</p>
              <p className="font-medium">This activity is coming soon!</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
