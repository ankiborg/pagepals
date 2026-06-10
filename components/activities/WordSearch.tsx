"use client";

import { useEffect, useState } from "react";

interface WordSearchProps {
  words: string[];
  gridSize?: number;
  title: string;
}

type Cell = { letter: string; highlighted: boolean };

function generateGrid(words: string[], size: number): Cell[][] {
  const grid: string[][] = Array.from({ length: size }, () =>
    Array(size).fill("")
  );

  const directions = [
    [0, 1],   // right
    [1, 0],   // down
    [1, 1],   // diagonal down-right
    [0, -1],  // left
    [-1, 0],  // up
  ];

  for (const word of words) {
    const upper = word.toUpperCase();
    let placed = false;
    let attempts = 0;

    while (!placed && attempts < 200) {
      attempts++;
      const dir = directions[Math.floor(Math.random() * directions.length)];
      const row = Math.floor(Math.random() * size);
      const col = Math.floor(Math.random() * size);

      const endRow = row + dir[0] * (upper.length - 1);
      const endCol = col + dir[1] * (upper.length - 1);

      if (endRow < 0 || endRow >= size || endCol < 0 || endCol >= size)
        continue;

      let fits = true;
      for (let i = 0; i < upper.length; i++) {
        const r = row + dir[0] * i;
        const c = col + dir[1] * i;
        if (grid[r][c] !== "" && grid[r][c] !== upper[i]) {
          fits = false;
          break;
        }
      }

      if (fits) {
        for (let i = 0; i < upper.length; i++) {
          grid[row + dir[0] * i][col + dir[1] * i] = upper[i];
        }
        placed = true;
      }
    }
  }

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c] === "") {
        grid[r][c] = letters[Math.floor(Math.random() * letters.length)];
      }
    }
  }

  return grid.map((row) => row.map((letter) => ({ letter, highlighted: false })));
}

export default function WordSearch({ words, gridSize = 12, title }: WordSearchProps) {
  const [grid, setGrid] = useState<Cell[][]>([]);
  const upperWords = words.map((w) => w.toUpperCase());

  useEffect(() => {
    setGrid(generateGrid(words, gridSize));
  }, [words, gridSize]);

  return (
    <div className="font-mono">
      <h2 className="text-xl font-bold text-center mb-4 print:text-2xl">{title}</h2>

      {/* Grid */}
      <div
        className="inline-grid gap-0.5 border border-gray-300 p-2 bg-white"
        style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
      >
        {grid.map((row, r) =>
          row.map((cell, c) => (
            <div
              key={`${r}-${c}`}
              className="w-7 h-7 flex items-center justify-center text-sm font-bold select-none"
            >
              {cell.letter}
            </div>
          ))
        )}
      </div>

      {/* Word list */}
      <div className="mt-6">
        <p className="text-sm font-semibold text-gray-600 mb-2">Find these words:</p>
        <div className="flex flex-wrap gap-2">
          {upperWords.map((word) => (
            <span
              key={word}
              className="rounded border border-gray-300 px-2 py-0.5 text-sm font-medium"
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
