'use client'
import React, { useEffect, useState, useRef, useCallback } from 'react';

type ScrambleQueueItem = {
  from: string;
  to: string;
  startFrame: number;
  endFrame: number;
  tempChar?: string;
};

const phrases = ['Airlangga K.', 'klob0t'];
const scrambleChars = "!-_\\/—=+*^?1234567890";

const getRandomScrambleChar = (): string =>
  scrambleChars[Math.floor(Math.random() * scrambleChars.length)];

export function TextScramble() {
  const [displayedText, setDisplayedText] = useState<string[]>([]);
  const [phraseIndex, setPhraseIndex] = useState(0);

  const scrambleQueueRef = useRef<ScrambleQueueItem[]>([]);
  const frameCounterRef = useRef(0);
  const animationFrameIdRef = useRef<number | null>(null);

  
  const runScrambleAnimation = useCallback(() => {
    
    const queue = scrambleQueueRef.current;
    const frame = frameCounterRef.current;
    const updatedText: string[] = [];
    let completedChars = 0;
    for (let i = 0; i < queue.length; i++) {
      const { from, to, startFrame, endFrame, tempChar } = queue[i];
      if (frame >= endFrame) {
        completedChars++;
        updatedText.push(to);
      } else if (frame >= startFrame) {
        const newTempChar =
          !tempChar || Math.random() < 0.28 ? getRandomScrambleChar() : tempChar;
        queue[i].tempChar = newTempChar;
        updatedText.push(newTempChar);
      } else {
        updatedText.push(from);
      }
    }
    setDisplayedText(updatedText);
    if (completedChars === queue.length) {
      setTimeout(() => {
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }, 2000);
    } else {
      frameCounterRef.current++;
      animationFrameIdRef.current = requestAnimationFrame(runScrambleAnimation);
    }
  }, []);

  
  const startScrambleTransition = useCallback(() => {
    const nextPhrase = phrases[phraseIndex];
    
    
    const currentText = displayedText;
    const maxLength = Math.max(currentText.length, nextPhrase.length);
    const queue: ScrambleQueueItem[] = [];
    for (let i = 0; i < maxLength; i++) {
      const fromChar = currentText[i] || '';
      const toChar = nextPhrase[i] || '';
      const startFrame = Math.floor(Math.random() * 40);
      const endFrame = startFrame + Math.floor(Math.random() * 40);
      queue.push({ from: fromChar, to: toChar, startFrame, endFrame });
    }
    scrambleQueueRef.current = queue;
    frameCounterRef.current = 0;
    runScrambleAnimation();
    
  }, [phraseIndex, runScrambleAnimation]); 

  
  useEffect(() => {
    startScrambleTransition();
    return () => {
      if (animationFrameIdRef.current !== null) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [startScrambleTransition]);

  return (
    <p>
      {displayedText.map((char, index) => (
        <span key={index}>{char}</span>
      ))}
    </p>
  );
}

// --- Configuration ---
const initialPhrase = 'Engineer';
const hoverPhrase = 'Designer';

// --- Helper Function ---
const getRandomChar = (): string =>
  scrambleChars[Math.floor(Math.random() * scrambleChars.length)];

// --- The Component ---
export function TextScrambleHover() {
  // Initialize state with the initial phrase's characters
  const [displayedText, setDisplayedText] = useState(initialPhrase.split(''));

  // Refs to manage the animation state without causing re-renders
  const scrambleQueueRef = useRef<ScrambleQueueItem[]>([]);
  const frameCounterRef = useRef(0);
  const animationFrameIdRef = useRef<number | null>(null);

  // The "engine" of the animation. It runs on every frame.
  const runAnimation = useCallback(() => {
    const frame = frameCounterRef.current;
    const queue = scrambleQueueRef.current;
    let completedChars = 0;
    const newText: string[] = [];

    for (let i = 0; i < queue.length; i++) {
      const { from, to, startFrame, endFrame, tempChar } = queue[i];
      if (frame >= endFrame) {
        completedChars++;
        newText.push(to);
      } else if (frame >= startFrame) {
        const newTempChar = !tempChar || Math.random() < 0.28 ? getRandomChar() : tempChar;
        queue[i].tempChar = newTempChar;
        newText.push(newTempChar);
      } else {
        newText.push(from);
      }
    }

    setDisplayedText(newText);

    // If not all characters are resolved, continue to the next frame.
    if (completedChars < queue.length) {
      frameCounterRef.current++;
      animationFrameIdRef.current = requestAnimationFrame(runAnimation);
    }
  }, []);

  // The "setup" function. It prepares the animation queue for a target text.
  const startScramble = useCallback((targetText: string) => {
    // Cancel any ongoing animation to prevent conflicts
    if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current);
    }

    const currentText = [...displayedText]; // Use the current displayed text as the starting point
    const maxLength = Math.max(currentText.length, targetText.length);
    const queue: ScrambleQueueItem[] = [];

    for (let i = 0; i < maxLength; i++) {
      const fromChar = currentText[i] || '';
      const toChar = targetText[i] || '';
      const startFrame = Math.floor(Math.random() * 40);
      const endFrame = startFrame + Math.floor(Math.random() * 40);
      queue.push({ from: fromChar, to: toChar, startFrame, endFrame });
    }

    // Reset refs and start the animation loop
    scrambleQueueRef.current = queue;
    frameCounterRef.current = 0;
    runAnimation();
  }, [displayedText, runAnimation]);

  // --- Event Handlers for Hover ---
  const handleMouseEnter = () => {
    startScramble(hoverPhrase);
  };

  const handleMouseLeave = () => {
    startScramble(initialPhrase);
  };

  // Cleanup effect to cancel animation if the component unmounts
  useEffect(() => {
    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []);

  return (
    <p
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: 'pointer', display: 'inline-block' }} // Added styles for better interaction
    >
      {displayedText.map((char, index) => (
        <span key={index}>{char === ' ' ? '\u00A0' : char}</span>
      ))}
    </p>
  );
}