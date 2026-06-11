"use client";

import { useEffect, useState } from "react";

interface CrosswordProps {
  words: string[];
  title: string;
  gridSize?: number;
}

type Direction = "across" | "down";

interface CrosswordClue {
  number: number;
  word: string;
  direction: Direction;
  row: number;
  col: number;
  clue: string;
}

interface Cell {
  letter: string;
  number?: number;
  isBlank: boolean;
  isHighlighted: boolean;
}

function generateCrossword(words: string[], size: number): {
  grid: Cell[][];
  clues: CrosswordClue[];
} {
  const grid: Cell[][] = Array.from({ length: size }, () =>
    Array(size).fill(null).map(() => ({
      letter: "",
      isBlank: true,
      isHighlighted: false,
    }))
  );

  const clues: CrosswordClue[] = [];
  let clueNumber = 1;

  // Simple crossword generation - place first word horizontally, others vertically
  const placedWords: Array<{
    word: string;
    row: number;
    col: number;
    direction: Direction;
    number: number;
  }> = [];

  // Place first word horizontally in the middle
  if (words.length > 0) {
    const firstWord = words[0].toUpperCase();
    const startRow = Math.floor(size / 2);
    const startCol = Math.floor((size - firstWord.length) / 2);

    for (let i = 0; i < firstWord.length; i++) {
      grid[startRow][startCol + i] = {
        letter: firstWord[i],
        number: i === 0 ? clueNumber : undefined,
        isBlank: false,
        isHighlighted: false,
      };
    }

    placedWords.push({
      word: firstWord,
      row: startRow,
      col: startCol,
      direction: "across",
      number: clueNumber,
    });

    clues.push({
      number: clueNumber,
      word: firstWord,
      direction: "across",
      row: startRow,
      col: startCol,
      clue: `${firstWord.toLowerCase()} (${firstWord.length} letters)`,
    });

    clueNumber++;
  }

  // Place remaining words vertically, trying to intersect with placed words
  for (let wordIndex = 1; wordIndex < Math.min(words.length, 5); wordIndex++) {
    const word = words[wordIndex].toUpperCase();
    let placed = false;

    // Try to find intersection with existing words
    for (const placedWord of placedWords) {
      if (placed) break;

      for (let i = 0; i < word.length; i++) {
        for (let j = 0; j < placedWord.word.length; j++) {
          if (word[i] === placedWord.word[j]) {
            let targetRow: number;
            let targetCol: number;

            if (placedWord.direction === "across") {
              targetRow = placedWord.row - i;
              targetCol = placedWord.col + j;
            } else {
              targetRow = placedWord.row + j;
              targetCol = placedWord.col - i;
            }

            // Check if word fits
            if (
              targetRow >= 0 &&
              targetRow + word.length <= size &&
              targetCol >= 0 &&
              targetCol < size
            ) {
              let fits = true;

              // Check if all positions are available or match
              for (let k = 0; k < word.length; k++) {
                const cell = grid[targetRow + k][targetCol];
                if (!cell.isBlank && cell.letter !== word[k]) {
                  fits = false;
                  break;
                }
              }

              if (fits) {
                // Place the word
                for (let k = 0; k < word.length; k++) {
                  grid[targetRow + k][targetCol] = {
                    letter: word[k],
                    number: k === 0 ? clueNumber : grid[targetRow + k][targetCol].number,
                    isBlank: false,
                    isHighlighted: false,
                  };
                }

                placedWords.push({
                  word,
                  row: targetRow,
                  col: targetCol,
                  direction: "down",
                  number: clueNumber,
                });

                clues.push({
                  number: clueNumber,
                  word,
                  direction: "down",
                  row: targetRow,
                  col: targetCol,
                  clue: `${word.toLowerCase()} (${word.length} letters)`,
                });

                clueNumber++;
                placed = true;
                break;
              }
            }
          }
        }
      }
    }
  }

  return { grid, clues };
}

export default function Crossword({ words, gridSize = 15, title }: CrosswordProps) {
  const [puzzle, setPuzzle] = useState<{ grid: Cell[][]; clues: CrosswordClue[] }>({
    grid: [],
    clues: [],
  });
  const [userGrid, setUserGrid] = useState<string[][]>([]);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [currentDirection, setCurrentDirection] = useState<Direction>("across");

  useEffect(() => {
    const generated = generateCrossword(words, gridSize);
    setPuzzle(generated);
    setUserGrid(
      Array.from({ length: gridSize }, () => Array(gridSize).fill(""))
    );
  }, [words, gridSize]);

  const handleCellClick = (row: number, col: number) => {
    if (puzzle.grid[row][col].isBlank) return;

    setSelectedCell({ row, col });
  };

  const handleKeyDown = (e: React.KeyboardEvent, row: number, col: number) => {
    if (puzzle.grid[row][col].isBlank) return;

    if (e.key >= "A" && e.key <= "Z") {
      const newGrid = [...userGrid];
      newGrid[row][col] = e.key.toUpperCase();
      setUserGrid(newGrid);
    } else if (e.key === "Backspace") {
      const newGrid = [...userGrid];
      newGrid[row][col] = "";
      setUserGrid(newGrid);
    } else if (e.key === "ArrowRight" || e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      let newDirection: string;
      
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        newDirection = "across";
      } else {
        newDirection = "down";
      }
      
      // This is line 171 - Fix the TypeScript error by casting to the correct union type
      setCurrentDirection(newDirection as Direction);
      
      // Move selection
      let newRow = row;
      let newCol = col;
      
      if (e.key === "ArrowRight") newCol++;
      else if (e.key === "ArrowLeft") newCol--;
      else if (e.key === "ArrowDown") newRow++;
      else if (e.key === "ArrowUp") newRow--;
      
      if (newRow >= 0 && newRow < gridSize && newCol >= 0 && newCol < gridSize && !puzzle.grid[newRow][newCol].isBlank) {
        setSelectedCell({ row: newRow, col: newCol });
      }
    }
  };

  const acrossClues = puzzle.clues.filter(clue => clue.direction === "across");
  const downClues = puzzle.clues.filter(clue => clue.direction === "down");

  return (
    <div className="font-mono">
      <h2 className="text-xl font-bold text-center mb-4 print:text-2xl">{title}</h2>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Grid */}
        <div className="flex-1">
          <div
            className="inline-grid gap-px border-2 border-gray-800 bg-gray-800"
            style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
          >
            {puzzle.grid.map((row, r) =>
              row.map((cell, c) => (
                <div
                  key={`${r}-${c}`}
                  className={`
                    relative w-8 h-8 flex items-center justify-center text-xs font-bold select-none cursor-pointer
                    ${cell.isBlank 
                      ? "bg-gray-800" 
                      : selectedCell?.row === r && selectedCell?.col === c
                        ? "bg-yellow-200 border-2 border-blue-500"
                        : "bg-white border border-gray-300"
                    }
                  `}
                  onClick={() => handleCellClick(r, c)}
                  onKeyDown={(e) => handleKeyDown(e, r, c)}
                  tabIndex={cell.isBlank ? -1 : 0}
                >
                  {!cell.isBlank && (
                    <>
                      {cell.number && (
                        <span className="absolute top-0 left-0 text-[8px] leading-none font-normal text-gray-700">
                          {cell.number}
                        </span>
                      )}
                      <span className="text-gray-900">
                        {userGrid[r][c] || ""}
                      </span>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Clues */}
        <div className="flex-1 max-w-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-sm mb-3 text-gray-700">ACROSS</h3>
              <div className="space-y-1">
                {acrossClues.map((clue) => (
                  <div key={`across-${clue.number}`} className="text-sm">
                    <span className="font-medium">{clue.number}.</span> {clue.clue}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-sm mb-3 text-gray-700">DOWN</h3>
              <div className="space-y-1">
                {downClues.map((clue) => (
                  <div key={`down-${clue.number}`} className="text-sm">
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