"use client";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="mb-8 rounded-full bg-indigo-600 text-white px-5 py-2 text-sm font-medium hover:bg-indigo-700 transition print:hidden"
    >
      🖨️ Print this activity
    </button>
  );
}
