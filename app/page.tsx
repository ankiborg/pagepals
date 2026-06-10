import ActivityGrid from "@/components/ActivityGrid";

export default function Home() {
  return (
    <main className="min-h-screen bg-amber-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-3">
          <span className="text-3xl">📄</span>
          <div>
            <h1 className="text-xl font-bold text-indigo-700 leading-none">
              PagePals
            </h1>
            <p className="text-xs text-gray-400">
              Free printable activities for kids
            </p>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-indigo-600 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold">
            Printable fun for every child 🎉
          </h2>
          <p className="mt-2 text-indigo-200 text-lg max-w-xl">
            Word searches, mazes, bingo, math sheets and more — ready to print
            in seconds.
          </p>
        </div>
      </section>

      {/* Activities */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-5">
          Browse activities
        </h2>
        <ActivityGrid />
      </section>
    </main>
  );
}
