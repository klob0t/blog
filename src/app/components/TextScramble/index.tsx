'use client'
import React, { useEffect, useState, useRef, useCallback } from 'react';

type ScrambleQueueItem = {
  from: string;
  to: string;
  startFrame: number;
  endFrame: number;
  tempChar?: string;
};

const phrases = ['klob0t', 'Airlangga'];
const scrambleChars = "!-_\\/—=+*^?";

const initialPhrase = 'Engineer';
const hoverPhrase = 'Designer';

const getRandomChar = (): string =>
  scrambleChars[Math.floor(Math.random() * scrambleChars.length)];


export function TextScramble() {
    // We can initialize state with the first phrase to prevent an empty initial render
    const [displayedText, setDisplayedText] = useState(phrases[0].split(''));
    const [phraseIndex, setPhraseIndex] = useState(0);

    const queueRef = useRef<ScrambleQueueItem[]>([]);
    const frameRef = useRef(0);
    const animationFrameIdRef = useRef<number | null>(null);
    
    // The "engine" - this is stable and doesn't need to be a dependency that changes
    const runAnimation = useCallback(() => {
        const frame = frameRef.current;
        const queue = queueRef.current;
        let completedChars = 0;
        const updatedText: string[] = [];

        for (let i = 0; i < queue.length; i++) {
            const { from, to, startFrame, endFrame, tempChar } = queue[i];
            if (frame >= endFrame) {
                completedChars++;
                updatedText.push(to);
            } else if (frame >= startFrame) {
                const newTempChar = !tempChar || Math.random() < 0.28 ? getRandomChar() : tempChar;
                queue[i].tempChar = newTempChar;
                updatedText.push(newTempChar);
            } else {
                updatedText.push(from);
            }
        }
        setDisplayedText(updatedText);

        if (completedChars === queue.length) {
            setTimeout(() => {
                setPhraseIndex(prev => (prev + 1) % phrases.length);
            }, 2000);
        } else {
            frameRef.current++;
            animationFrameIdRef.current = requestAnimationFrame(runAnimation);
        }
    }, []);

    // This effect now ONLY runs when the `phraseIndex` changes.
    useEffect(() => {
        // --- THE FIX ---
        // We determine the "from" and "to" phrases based on the index,
        // completely ignoring the `displayedText` state.
        const toPhrase = phrases[phraseIndex];
        // Calculate the previous index safely
        const fromPhrase = phrases[(phraseIndex + phrases.length - 1) % phrases.length];

        const maxLength = Math.max(fromPhrase.length, toPhrase.length);
        const queue: ScrambleQueueItem[] = [];

        for (let i = 0; i < maxLength; i++) {
            const fromChar = fromPhrase[i] || '';
            const toChar = toPhrase[i] || '';
            const startFrame = Math.floor(Math.random() * 40);
            const endFrame = startFrame + Math.floor(Math.random() * 40);
            queue.push({ from: fromChar, to: toChar, startFrame, endFrame });
        }
        
        // Reset and kick off the animation
        frameRef.current = 0;
        queueRef.current = queue;
        runAnimation();

        return () => {
            if (animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current);
            }
        };
    // The dependency array is now simple and correct.
    }, [phraseIndex, runAnimation]);

    return (
        <p>
            {displayedText.map((char, index) => (
                <span
                  style={{
                    fontFamily: 'var(--font-geist-mono)'
                  }}
                 key={index}>{char}</span>
            ))}
        </p>
    );
}



export function TextScrambleHover() {
  
  const [displayedText, setDisplayedText] = useState(initialPhrase.split(''));

  
  const scrambleQueueRef = useRef<ScrambleQueueItem[]>([]);
  const frameCounterRef = useRef(0);
  const animationFrameIdRef = useRef<number | null>(null);

  
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

    
    if (completedChars < queue.length) {
      frameCounterRef.current++;
      animationFrameIdRef.current = requestAnimationFrame(runAnimation);
    }
  }, []);

  
  const startScramble = useCallback((targetText: string) => {
    
    if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current);
    }

    const currentText = [...displayedText]; 
    const maxLength = Math.max(currentText.length, targetText.length);
    const queue: ScrambleQueueItem[] = [];

    for (let i = 0; i < maxLength; i++) {
      const fromChar = currentText[i] || '';
      const toChar = targetText[i] || '';
      const startFrame = Math.floor(Math.random() * 40);
      const endFrame = startFrame + Math.floor(Math.random() * 40);
      queue.push({ from: fromChar, to: toChar, startFrame, endFrame });
    }

    
    scrambleQueueRef.current = queue;
    frameCounterRef.current = 0;
    runAnimation();
  }, [displayedText, runAnimation]);

  
  const handleMouseEnter = () => {
    startScramble(hoverPhrase);
  };

  const handleMouseLeave = () => {
    startScramble(initialPhrase);
  };

  
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
      style={{ cursor: 'pointer', display: 'inline-block' }} 
    >
      {displayedText.map((char, index) => (
        <span key={index}>{char === ' ' ? '\u00A0' : char}</span>
      ))}
    </p>
  );
}