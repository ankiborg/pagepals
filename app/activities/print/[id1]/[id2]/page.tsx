import { getActivityById } from "@/data/activities";
import { notFound } from "next/navigation";
import WordSearch from "@/components/activities/WordSearch";
import PrintButton from "@/components/PrintButton";
import Link from "next/link";

interface Props {
  params: Promise<{ id1: string; id2: string }>;
}

export default async function TwoActivityPrintPage({ params }: Props) {
  const { id1, id2 } = await params;
  const activity1 = getActivityById(id1);
  const activity2 = getActivityById(id2);
  
  if (!activity1 || !activity2) notFound();

  return (
    <main className="min-h-screen bg-amber-50">
      <header className="bg-white border-b border-gray-100 shadow-sm print:hidden">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/" className="text-indigo-600 hover:underline text-sm">
            ← Back
          </Link>
          <span className="text-gray-300">|</span>
          <span className="text-sm font-medium text-gray-700">
            {activity1.title} + {activity2.title}
          </span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Print button */}
        <PrintButton />

        {/* Two activities side by side */}
        <div className="bg-white rounded-2xl shadow-sm p-8 print:shadow-none print:p-0 print-two-column">
          {/* First Activity */}
          <div>
            {activity1.type === "word-search" && activity1.tags && (
              <WordSearch
                words={activity1.tags}
                title={activity1.title}
                gridSize={12}
              />
            )}
            
            {activity1.type !== "word-search" && (
              <div className="text-center text-gray-400 py-16">
                <p className="text-4xl mb-3">🚧</p>
                <p className="font-medium">This activity is coming soon!</p>
              </div>
            )}
          </div>

          {/* Second Activity */}
          <div>
            {activity2.type === "word-search" && activity2.tags && (
              <WordSearch
                words={activity2.tags}
                title={activity2.title}
                gridSize={12}
              />
            )}
            
            {activity2.type !== "word-search" && (
              <div className="text-center text-gray-400 py-16">
                <p className="text-4xl mb-3">🚧</p>
                <p className="font-medium">This activity is coming soon!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}