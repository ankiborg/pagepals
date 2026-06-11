"use client";

import { useEffect, useState } from "react";

interface CrosswordProps {
  title: string;
  clues?: { clue: string; answer: string; direction: 'across' | 'down' }[];
}

interface Cell {
  letter: string;
  isBlack: boolean;
  number?: number;
  isStart: boolean;
}

interface PlacedWord {
  word: string;
  row: number;
  col: number;
  direction: 'across' | 'down';
  number: number;
  clue: string;
}

function generateCrosswordGrid(clues: { clue: string; answer: string; direction: 'across' | 'down' }[]): {
  grid: Cell[][],
  placedWords: PlacedWord[]
} {
  const gridSize = 7;
  const grid: Cell[][] = Array.from({ length: gridSize }, () =>
    Array.from({ length: gridSize }, () => ({
      letter: '',
      isBlack: true,
      isStart: false
    }))
  );

  const placedWords: PlacedWord[] = [];
  const words = clues.map(c => ({ ...c, answer: c.answer.toUpperCase().replace(/\s/g, '') }));
  
  // Sort words by length (longest first for better placement)
  words.sort((a, b) => b.answer.length - a.answer.length);

  let currentNumber = 1;

  // Place the first word in the center
  if (words.length > 0) {
    const firstWord = words[0];
    const startRow = Math.floor(gridSize / 2);
    const startCol = Math.floor((gridSize - firstWord.answer.length) / 2);
    
    // Place across
    for (let i = 0; i < firstWord.answer.length; i++) {
      grid[startRow][startCol + i] = {
        letter: firstWord.answer[i],
        isBlack: false,
        number: i === 0 ? currentNumber : undefined,
        isStart: i === 0
      };
    }

    placedWords.push({
      word: firstWord.answer,
      row: startRow,
      col: startCol,
      direction: 'across',
      number: currentNumber,
      clue: firstWord.clue
    });

    currentNumber++;
  }

  // Try to place remaining words
  for (let wordIndex = 1; wordIndex < words.length; wordIndex++) {
    const currentWord = words[wordIndex];
    let placed = false;

    // Try to find intersection with existing words
    for (const placedWord of placedWords) {
      if (placed) break;

      for (let i = 0; i < currentWord.answer.length; i++) {
        for (let j = 0; j < placedWord.word.length; j++) {
          if (currentWord.answer[i] === placedWord.word[j]) {
            // Found potential intersection
            let newRow, newCol, newDirection;

            if (placedWord.direction === 'across') {
              // Place current word down
              newDirection = 'down';
              newRow = placedWord.row - i;
              newCol = placedWord.col + j;
            } else {
              // Place current word across
              newDirection = 'across';
              newRow = placedWord.row + j;
              newCol = placedWord.col - i;
            }

            // Check if word fits
            if (newDirection === 'across') {
              if (newRow >= 0 && newRow < gridSize && 
                  newCol >= 0 && newCol + currentWord.answer.length <= gridSize) {
                
                // Check for conflicts
                let canPlace = true;
                for (let k = 0; k < currentWord.answer.length; k++) {
                  const cell = grid[newRow][newCol + k];
                  if (!cell.isBlack && cell.letter !== currentWord.answer[k]) {
                    canPlace = false;
                    break;
                  }
                }

                if (canPlace) {
                  // Place the word
                  for (let k = 0; k < currentWord.answer.length; k++) {
                    grid[newRow][newCol + k] = {
                      letter: currentWord.answer[k],
                      isBlack: false,
                      number: k === 0 ? currentNumber : grid[newRow][newCol + k].number,
                      isStart: k === 0
                    };
                  }

                  placedWords.push({
                    word: currentWord.answer,
                    row: newRow,
                    col: newCol,
                    direction: newDirection,
                    number: currentNumber,
                    clue: currentWord.clue
                  });

                  currentNumber++;
                  placed = true;
                  break;
                }
              }
            } else { // down
              if (newCol >= 0 && newCol < gridSize && 
                  newRow >= 0 && newRow + currentWord.answer.length <= gridSize) {
                
                // Check for conflicts
                let canPlace = true;
                for (let k = 0; k < currentWord.answer.length; k++) {
                  const cell = grid[newRow + k][newCol];
                  if (!cell.isBlack && cell.letter !== currentWord.answer[k]) {
                    canPlace = false;
                    break;
                  }
                }

                if (canPlace) {
                  // Place the word
                  for (let k = 0; k < currentWord.answer.length; k++) {
                    grid[newRow + k][newCol] = {
                      letter: currentWord.answer[k],
                      isBlack: false,
                      number: k === 0 ? currentNumber : grid[newRow + k][newCol].number,
                      isStart: k === 0
                    };
                  }

                  placedWords.push({
                    word: currentWord.answer,
                    row: newRow,
                    col: newCol,
                    direction: newDirection,
                    number: currentNumber,
                    clue: currentWord.clue
                  });

                  currentNumber++;
                  placed = true;
                  break;
                }
              }
            }
          }
        }
        if (placed) break;
      }
    }
  }

  return { grid, placedWords };
}

export default function Crossword({ title, clues = [] }: CrosswordProps) {
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [placedWords, setPlacedWords] = useState<PlacedWord[]>([]);

  // Default clues if none provided
  const defaultClues = [
    { clue: "Man's best friend", answer: "DOG", direction: 'across' as const },
    { clue: "Feline pet", answer: "CAT", direction: 'down' as const },
    { clue: "Flying mammal", answer: "BAT", direction: 'across' as const },
    { clue: "Farm animal that moos", answer: "COW", direction: 'down' as const },
    { clue: "Buzzing insect", answer: "BEE", direction: 'across' as const },
    { clue: "Woolly farm animal", answer: "SHEEP", direction: 'down' as const },
    { clue: "Slow garden creature", answer: "SNAIL", direction: 'across' as const }
  ];

  const activeClues = clues.length > 0 ? clues : defaultClues;

  useEffect(() => {
    const { grid: newGrid, placedWords: newPlacedWords } = generateCrosswordGrid(activeClues);
    setGrid(newGrid);
    setPlacedWords(newPlacedWords);
  }, [activeClues]);

  const acrossClues = placedWords.filter(w => w.direction === 'across').sort((a, b) => a.number - b.number);
  const downClues = placedWords.filter(w => w.direction === 'down').sort((a, b) => a.number - b.number);

  return (
    <div className="font-mono">
      <h2 className="text-xl font-bold text-center mb-6 print:text-2xl">{title}</h2>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Grid */}
        <div className="flex-shrink-0">
          <div
            className="inline-grid gap-0.5 border-2 border-gray-400 p-1 bg-white"
            style={{ gridTemplateColumns: `repeat(7, 1fr)` }}
          >
            {grid.map((row, r) =>
              row.map((cell, c) => (
                <div
                  key={`${r}-${c}`}
                  className={`w-8 h-8 border border-gray-300 flex items-center justify-center text-sm font-bold relative ${
                    cell.isBlack ? 'bg-black' : 'bg-white'
                  }`}
                >
                  {!cell.isBlack && (
                    <>
                      {cell.number && (
                        <span className="absolute top-0 left-0 text-xs leading-none p-0.5 text-gray-600">
                          {cell.number}
                        </span>
                      )}
                      <span className="text-center">{cell.letter}</span>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Clues */}
        <div className="flex-1 min-w-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Across */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Across</h3>
              <div className="space-y-2">
                {acrossClues.map((word) => (
                  <div key={`across-${word.number}`} className="text-sm">
                    <span className="font-medium">{word.number}.</span>{' '}
                    <span>{word.clue}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Down */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Down</h3>
              <div className="space-y-2">
                {downClues.map((word) => (
                  <div key={`down-${word.number}`} className="text-sm">
                    <span className="font-medium">{word.number}.</span>{' '}
                    <span>{word.clue}</span>
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