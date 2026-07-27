import { useCallback, useEffect } from 'react';

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
    <div className="story-viewer">
      <div className="story-viewer__content">
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
