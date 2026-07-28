import { useCallback, useEffect, useRef } from 'react';

import type { Story } from '../types/story';

interface StoryViewerProps {
  stories: Story[];
  activeIndex: number | null;
  onActiveIndexChange(index: number | null): void;
  onClose(): void;
}

function StoryViewer({
  stories,
  activeIndex,
  onActiveIndexChange,
  onClose,
}: StoryViewerProps) {
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const story = activeIndex === null ? null : stories[activeIndex];

  const handlePrevious = useCallback(() => {
    if (activeIndex === null || activeIndex === 0) {
      return;
    }

    onActiveIndexChange(activeIndex - 1);
  }, [activeIndex, onActiveIndexChange]);

  const handleNext = useCallback(() => {
    if (activeIndex === null || activeIndex >= stories.length - 1) {
      return;
    }

    onActiveIndexChange(activeIndex + 1);
  }, [activeIndex, stories.length, onActiveIndexChange]);

  const handleTouchStart = useCallback(
    (event: React.TouchEvent<HTMLDivElement>) => {
      const touch = event.touches[0];

      touchStart.current = {
        x: touch.clientX,
        y: touch.clientY,
      };
    },
    [],
  );

  const handleTouchEnd = useCallback(
    (event: React.TouchEvent<HTMLDivElement>) => {
      if (!touchStart.current) {
        return;
      }

      const touch = event.changedTouches[0];

      const deltaX = touch.clientX - touchStart.current.x;
      const deltaY = touch.clientY - touchStart.current.y;

      touchStart.current = null;

      if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY > 80) {
        onClose();
        return;
      }

      if (deltaX > 80) {
        handlePrevious();
      }

      if (deltaX < -80) {
        handleNext();
      }
    },
    [handleNext, handlePrevious, onClose],
  );

  const handleScreenClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const { clientX, currentTarget } = event;

      const middle = currentTarget.clientWidth / 2;

      if (clientX < middle) {
        handlePrevious();
      } else {
        handleNext();
      }
    },
    [handleNext, handlePrevious],
  );

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      switch (event.key) {
        case 'Escape':
          onClose();
          break;

        case 'ArrowLeft':
          handlePrevious();
          break;

        case 'ArrowRight':
          handleNext();
          break;

        default:
          break;
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeIndex, handleNext, handlePrevious, onClose]);

  if (!story) {
    return null;
  }

  return (
    <div
      className="story-viewer"
      onClick={handleScreenClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="story-viewer__content"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="story-viewer__close" onClick={onClose}>
          ×
        </button>

        <button
          type="button"
          className="story-viewer__nav story-viewer__nav--prev"
          onClick={handlePrevious}
          disabled={activeIndex === 0}
        >
          ←
        </button>

        <img className="story-viewer__image" src={story.image} alt="Story" />

        <button
          type="button"
          className="story-viewer__nav story-viewer__nav--next"
          onClick={handleNext}
          disabled={activeIndex === stories.length - 1}
        >
          →
        </button>
      </div>
    </div>
  );
}

export default StoryViewer;
