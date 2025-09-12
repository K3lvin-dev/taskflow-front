import { useEffect, useRef, useState } from 'react';
import { ColumnType } from '@/types/kanban';

interface CardSwipeOptions {
  currentColumn: ColumnType;
  onSwipeToColumn: (taskId: string, targetColumn: ColumnType) => void;
  taskId: string;
  threshold?: number;
}

export function useCardSwipe({
  currentColumn,
  onSwipeToColumn,
  taskId,
  threshold = 60,
}: CardSwipeOptions) {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [isSwipeActive, setIsSwipeActive] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  const getNextColumn = (direction: 'left' | 'right'): ColumnType | null => {
    const columns: ColumnType[] = ['todo', 'doing', 'done'];
    const currentIndex = columns.indexOf(currentColumn);
    
    if (direction === 'left' && currentIndex < columns.length - 1) {
      return columns[currentIndex + 1];
    } else if (direction === 'right' && currentIndex > 0) {
      return columns[currentIndex - 1];
    }
    return null;
  };

  const onTouchStart = (e: TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsSwipeActive(false);
  };

  const onTouchMove = (e: TouchEvent) => {
    if (!touchStart) return;
    
    const currentX = e.targetTouches[0].clientX;
    const deltaX = Math.abs(touchStart - currentX);
    
    if (deltaX > 20) {
      setIsSwipeActive(true);
    }
  };

  const onTouchEnd = (e: TouchEvent) => {
    if (!touchStart || !isSwipeActive) {
      setTouchStart(null);
      setIsSwipeActive(false);
      return;
    }
    
    const endX = e.changedTouches[0].clientX;
    const deltaX = touchStart - endX;
    
    if (Math.abs(deltaX) > threshold) {
      const direction = deltaX > 0 ? 'left' : 'right';
      const targetColumn = getNextColumn(direction);
      
      if (targetColumn) {
        onSwipeToColumn(taskId, targetColumn);
      }
    }
    
    setTouchStart(null);
    setIsSwipeActive(false);
  };

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.addEventListener('touchstart', onTouchStart, { passive: true });
    element.addEventListener('touchmove', onTouchMove, { passive: true });
    element.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      element.removeEventListener('touchstart', onTouchStart);
      element.removeEventListener('touchmove', onTouchMove);
      element.removeEventListener('touchend', onTouchEnd);
    };
  }, [touchStart, currentColumn, taskId, threshold]);

  return {
    elementRef,
    isSwipeActive,
  };
}