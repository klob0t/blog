import React, { useRef, useEffect } from 'react';
import styles from './index.module.css'


interface ActivePixel {
  x: number
  y: number
  timestamp: number
}

interface MousePosition {
  x: number
  y: number
}


const BLOCK_SIZE = 30;

const FADE_DURATION = 500;

const GRID_COLOR = 'rgb(0, 0, 0)';


export const BackgroundPixel = () => {
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const mousePositionRef = useRef<MousePosition>({ x: -1, y: -1 });
  
  const activePixelsRef = useRef<ActivePixel[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return
    let animationFrameId: number;


    const handleMouseMove = (event: MouseEvent) => {
      mousePositionRef.current = { x: event.clientX, y: event.clientY };
    };

    const handleResize = () => {
      
      
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const draw = () => {
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      
      const now = Date.now();
      const { x: mouseX, y: mouseY } = mousePositionRef.current;
      
      
      const colIndex = Math.floor(mouseX / BLOCK_SIZE);
      const rowIndex = Math.floor(mouseY / BLOCK_SIZE);

      
      const lastPixel = activePixelsRef.current[activePixelsRef.current.length - 1];
      if (!lastPixel || lastPixel.x !== colIndex || lastPixel.y !== rowIndex) {
         if(mouseX !== -1) { 
            activePixelsRef.current.push({ x: colIndex, y: rowIndex, timestamp: now });
         }
      }

      
      activePixelsRef.current = activePixelsRef.current.filter(
        (pixel) => now - pixel.timestamp < FADE_DURATION
      );
      
      
      const columns = Math.ceil(canvas.width / BLOCK_SIZE);
      const rows = Math.ceil(canvas.height / BLOCK_SIZE);
      
      ctx.strokeStyle = GRID_COLOR;
      for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            ctx.strokeRect(i * BLOCK_SIZE, j * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        }
      }

      
      activePixelsRef.current.forEach((pixel) => {
        const elapsedTime = now - pixel.timestamp;
        const opacity = 1 - (elapsedTime / FADE_DURATION);
        
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fillRect(
          pixel.x * BLOCK_SIZE,
          pixel.y * BLOCK_SIZE,
          BLOCK_SIZE,
          BLOCK_SIZE
        );
      });

      
      animationFrameId = requestAnimationFrame(draw);
    };

    
    handleResize(); 
    draw(); 

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []); 

  return (
    <div className={styles.container}>
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1, 
        backgroundColor: '#000'
      }}
    />
    </div>
  );
};

