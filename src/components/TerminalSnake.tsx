import React, { useState, useEffect, useCallback } from 'react';

interface TerminalSnakeProps {
  onGameOver: (score: number) => void;
  onExit: () => void;
}

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };

const WIDTH = 18;
const HEIGHT = 12;
const INITIAL_SPEED = 180;

export const TerminalSnake: React.FC<TerminalSnakeProps> = ({ onGameOver, onExit }) => {
  const [snake, setSnake] = useState<Position[]>([
    { x: 5, y: 5 },
    { x: 4, y: 5 },
    { x: 3, y: 5 }
  ]);
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [food, setFood] = useState<Position>({ x: 10, y: 5 });
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [speed, setSpeed] = useState(INITIAL_SPEED);

  const generateFood = useCallback((currentSnake: Position[]): Position => {
    while (true) {
      const x = Math.floor(Math.random() * WIDTH);
      const y = Math.floor(Math.random() * HEIGHT);
      const isOnSnake = currentSnake.some(segment => segment.x === x && segment.y === y);
      if (!isOnSnake) {
        return { x, y };
      }
    }
  }, []);

  useEffect(() => {
    const handleKeys = (e: KeyboardEvent) => {
      if (isGameOver) {
        if (e.key === 'Enter' || e.key.toLowerCase() === 'r') {
          setSnake([
            { x: 5, y: 5 },
            { x: 4, y: 5 },
            { x: 3, y: 5 }
          ]);
          setDirection('RIGHT');
          setScore(0);
          setSpeed(INITIAL_SPEED);
          setIsGameOver(false);
          setFood({ x: 10, y: 5 });
        } else if (e.key === 'Escape' || e.key.toLowerCase() === 'q') {
          onExit();
        }
        return;
      }

      let newDir: Direction | null = null;
      switch (e.key.toLowerCase()) {
        case 'w':
        case 'arrowup':
          if (direction !== 'DOWN') newDir = 'UP';
          break;
        case 's':
        case 'arrowdown':
          if (direction !== 'UP') newDir = 'DOWN';
          break;
        case 'a':
        case 'arrowleft':
          if (direction !== 'RIGHT') newDir = 'LEFT';
          break;
        case 'd':
        case 'arrowright':
          if (direction !== 'LEFT') newDir = 'RIGHT';
          break;
        case 'escape':
        case 'q':
          onExit();
          return;
        default:
          return;
      }

      if (newDir) {
        e.preventDefault();
        setDirection(newDir);
      }
    };

    window.addEventListener('keydown', handleKeys);
    return () => window.removeEventListener('keydown', handleKeys);
  }, [direction, isGameOver, onExit]);

  useEffect(() => {
    if (isGameOver) return;

    const tick = () => {
      setSnake(prevSnake => {
        const head = prevSnake[0];
        let nextHead = { ...head };

        switch (direction) {
          case 'UP': nextHead.y -= 1; break;
          case 'DOWN': nextHead.y += 1; break;
          case 'LEFT': nextHead.x -= 1; break;
          case 'RIGHT': nextHead.x += 1; break;
        }

        if (nextHead.x < 0 || nextHead.x >= WIDTH || nextHead.y < 0 || nextHead.y >= HEIGHT) {
          setIsGameOver(true);
          onGameOver(score);
          return prevSnake;
        }

        const isSelfCollision = prevSnake.slice(0, -1).some(
          segment => segment.x === nextHead.x && segment.y === nextHead.y
        );
        if (isSelfCollision) {
          setIsGameOver(true);
          onGameOver(score);
          return prevSnake;
        }

        const newSnake = [nextHead, ...prevSnake];

        if (nextHead.x === food.x && nextHead.y === food.y) {
          setScore(prev => prev + 10);
          setSpeed(prev => Math.max(80, prev - 8));
          setFood(generateFood(newSnake));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const timer = setInterval(tick, speed);
    return () => clearInterval(timer);
  }, [direction, food, speed, isGameOver, generateFood, score, onGameOver]);

  const renderBoard = () => {
    const lines = [];

    lines.push('+' + ' -'.repeat(WIDTH) + ' +');

    for (let y = 0; y < HEIGHT; y++) {
      let row = '|';
      for (let x = 0; x < WIDTH; x++) {
        const isHead = snake[0].x === x && snake[0].y === y;
        const isBody = snake.slice(1).some(seg => seg.x === x && seg.y === y);
        const isFood = food.x === x && food.y === y;

        if (isHead) {
          row += ' ◆';
        } else if (isBody) {
          row += ' ■';
        } else if (isFood) {
          row += ' ★';
        } else {
          row += ' ·';
        }
      }
      row += ' |';
      lines.push(row);
    }

    lines.push('+' + ' -'.repeat(WIDTH) + ' +');
    return lines.join('\n');
  };

  return (
    <div style={{ fontFamily: 'monospace', lineHeight: '1.25', margin: '12px 0' }}>
      <div style={{ display: 'flex', gap: '24px', marginBottom: '8px' }}>
        <span style={{ color: 'var(--success-color)', fontWeight: 'bold' }}>SCORE: {score}</span>
        <span style={{ color: 'var(--info-color)' }}>SPEED: {Math.round(1000 / speed)} ticks/s</span>
        <span style={{ opacity: 0.6 }}>Controls: Arrow keys / WASD (Q/ESC to Quit)</span>
      </div>

      <pre style={{ margin: 0, color: 'var(--text-color)' }}>{renderBoard()}</pre>

      {isGameOver && (
        <div style={{ marginTop: '12px', border: '1px solid var(--primary-color)', padding: '12px', maxWidth: '320px' }}>
          <div style={{ color: 'var(--primary-color)', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '4px' }}>
            *** GAME OVER ***
          </div>
          <p style={{ marginBottom: '8px' }}>Final Score: {score} points</p>
          <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
            Press <span style={{ color: 'var(--success-color)' }}>[R]</span> or <span style={{ color: 'var(--success-color)' }}>[Enter]</span> to Restart.
          </p>
          <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
            Press <span style={{ color: 'var(--primary-color)' }}>[Q]</span> or <span style={{ color: 'var(--primary-color)' }}>[ESC]</span> to Quit.
          </p>
        </div>
      )}
    </div>
  );
};
