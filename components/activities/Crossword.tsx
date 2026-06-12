"use client";

import { useEffect, useState } from "react";

interface CrosswordProps {
  clues: {
    across: Array<{ number: number; clue: string; answer: string }>;
    down: Array<{ number: number; clue: string; answer: string }>;
  };
  title: string;
}

type Direction = "across" | "down";

interface Cell {
  letter: string;
  number?: number;
  filled: boolean;
}

export default function Crossword({ clues, title }: CrosswordProps) {
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [currentDirection, setCurrentDirection] = useState<Direction>("across");

  const handleDirectionChange = (direction: string) => {
    // Fix: Properly type the newDirection variable
    const newDirection: Direction = direction as Direction;
    setCurrentDirection(newDirection);
  };

  useEffect(() => {
    // Initialize a basic grid for demonstration
    const size = 15;
    const initialGrid: Cell[][] = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => ({ letter: "", filled: false }))
    );
    setGrid(initialGrid);
  }, [clues]);

  return (
    <div className="font-mono">
      <h2 className="text-xl font-bold text-center mb-4 print:text-2xl">{title}</h2>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Grid */}
        <div className="flex-1">
          <div className="inline-grid gap-px border border-gray-300 p-2 bg-white">
            {grid.map((row, r) =>
              row.map((cell, c) => (
                <div
                  key={`${r}-${c}`}
                  className={`w-8 h-8 border border-gray-200 flex items-center justify-center text-sm font-bold select-none ${
                    cell.filled ? "bg-black" : "bg-white"
                  }`}
                >
                  {!cell.filled && (
                    <>
                      {cell.number && (
                        <span className="absolute text-xs font-normal top-0 left-0 ml-px mt-px">
                          {cell.number}
                        </span>
                      )}
                      {cell.letter}
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Clues */}
        <div className="lg:w-80">
          <div className="mb-4">
            <button
              onClick={() => handleDirectionChange("across")}
              className={`mr-2 px-3 py-1 rounded text-sm ${
                currentDirection === "across"
                  ? "bg-indigo-100 text-indigo-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              Across
            </button>
            <button
              onClick={() => handleDirectionChange("down")}
              className={`px-3 py-1 rounded text-sm ${
                currentDirection === "down"
                  ? "bg-indigo-100 text-indigo-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              Down
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Across</h3>
              <div className="space-y-1">
                {clues.across.map((clue) => (
                  <div key={clue.number} className="text-sm">
                    <span className="font-medium">{clue.number}.</span> {clue.clue}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Down</h3>
              <div className="space-y-1">
                {clues.down.map((clue) => (
                  <div key={clue.number} className="text-sm">
                    <span className="font-medium">{clue.number}.</span> {clue.clue}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}