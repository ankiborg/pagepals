"use client";

import { useEffect, useState } from "react";

interface SecretCodeProps {
  message: string;
  shift?: number;
  title: string;
  useSymbols?: boolean;
}

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const SYMBOLS = ["★", "♦", "♠", "♣", "♥", "☀", "☾", "⚡", "🌟", "🔥", "💎", "🌸", "🍀", "🎵", "🎨", "🚀", "🌈", "⭐", "🔮", "🎯", "🎪", "🎭", "🎲", "🎸", "🎺", "🎻"];

function caesarCipher(text: string, shift: number): string {
  return text
    .toUpperCase()
    .replace(/[A-Z]/g, (char) => {
      const index = ALPHABET.indexOf(char);
      const newIndex = (index + shift) % 26;
      return ALPHABET[newIndex];
    });
}

function symbolSubstitution(text: string): { encoded: string; key: Record<string, string> } {
  const key: Record<string, string> = {};
  const usedSymbols = new Set<string>();
  
  // Create mapping for unique letters
  const uniqueLetters = [...new Set(text.toUpperCase().replace(/[^A-Z]/g, ''))];
  
  uniqueLetters.forEach((letter) => {
    let symbol;
    do {
      symbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
    } while (usedSymbols.has(symbol));
    
    usedSymbols.add(symbol);
    key[letter] = symbol;
  });

  const encoded = text
    .toUpperCase()
    .replace(/[A-Z]/g, (char) => key[char] || char)
    .replace(/[^A-Z\s]/g, ''); // Remove punctuation but keep spaces

  return { encoded, key };
}

export default function SecretCode({ message, shift = 3, title, useSymbols = false }: SecretCodeProps) {
  const [encodedMessage, setEncodedMessage] = useState<string>("");
  const [symbolKey, setSymbolKey] = useState<Record<string, string>>({});

  useEffect(() => {
    if (useSymbols) {
      const { encoded, key } = symbolSubstitution(message);
      setEncodedMessage(encoded);
      setSymbolKey(key);
    } else {
      setEncodedMessage(caesarCipher(message, shift));
    }
  }, [message, shift, useSymbols]);

  return (
    <div className="font-mono">
      <h2 className="text-xl font-bold text-center mb-6 print:text-2xl">{title}</h2>

      {/* Instructions */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">Instructions:</h3>
        <p className="text-sm text-blue-700">
          {useSymbols 
            ? "Each letter has been replaced with a symbol. Use the key below to decode the secret message!"
            : `Each letter has been shifted ${shift} positions forward in the alphabet. Can you decode the secret message?`
          }
        </p>
      </div>

      {/* Encoded Message */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-3">Secret Message:</h3>
        <div className="p-4 bg-gray-100 border border-gray-300 rounded-lg">
          <p className="text-lg font-bold text-center break-all leading-relaxed">
            {encodedMessage}
          </p>
        </div>
      </div>

      {/* Decoder Key */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-3">Decoder Key:</h3>
        
        {useSymbols ? (
          <div className="grid grid-cols-6 gap-2 p-4 bg-yellow-50 border border-yellow-300 rounded-lg">
            {Object.entries(symbolKey).map(([letter, symbol]) => (
              <div key={letter} className="text-center p-2 bg-white border border-gray-200 rounded">
                <div className="text-lg font-bold">{symbol}</div>
                <div className="text-xs text-gray-500">↓</div>
                <div className="text-sm font-semibold">{letter}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 bg-yellow-50 border border-yellow-300 rounded-lg">
            <p className="text-sm text-gray-600 mb-3">Caesar Cipher - Each letter is shifted {shift} positions:</p>
            <div className="grid grid-cols-13 gap-1 text-xs">
              {ALPHABET.split('').map((letter, index) => {
                const shiftedIndex = (index + shift) % 26;
                const shiftedLetter = ALPHABET[shiftedIndex];
                return (
                  <div key={letter} className="text-center p-1 bg-white border border-gray-200 rounded">
                    <div className="font-bold">{letter}</div>
                    <div className="text-gray-400">↓</div>
                    <div className="font-bold text-blue-600">{shiftedLetter}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Answer Section */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-3">Write your answer here:</h3>
        <div className="p-4 bg-white border-2 border-dashed border-gray-300 rounded-lg min-h-[60px]">
          <div className="text-gray-400 text-sm">Decode the message and write it here...</div>
        </div>
      </div>

      {/* Original Message (for answer key) */}
      <div className="text-xs text-gray-400 border-t pt-4 mt-8">
        <strong>Answer:</strong> {message.toUpperCase()}
      </div>
    </div>
  );
}