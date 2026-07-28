import { useCallback, useEffect } from 'react';

import type { Story } from '../types/story';

const STORY_DURATION = 5000;

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
    if (activeIndex === null) {
      return;
    }

    if (activeIndex >= stories.length - 1) {
      onClose();
      return;
    }

    onActiveIndexChange(activeIndex + 1);
  }, [activeIndex, stories.length, onActiveIndexChange, onClose]);

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const timer = window.setTimeout(() => {
      handleNext();
    }, STORY_DURATION);

    return () => {
      window.clearTimeout(timer);
    };
  }, [activeIndex, handleNext]);

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

  if (!story || activeIndex === null) {
    return null;
  }

  const isFirstStory = activeIndex === 0;
  const isLastStory = activeIndex === stories.length - 1;

  return (
    <div className="story-viewer">
      <div className="story-viewer__content">
        <button type="button" className="story-viewer__close" onClick={onClose}>
          ×
        </button>

        <div className="story-viewer__progress">
          {stories.map((item, index) => (
            <span
              key={item.id}
              className={
                index <= activeIndex
                  ? 'story-viewer__progress-item story-viewer__progress-item--active'
                  : 'story-viewer__progress-item'
              }
            />
          ))}
        </div>

        <button
          type="button"
          className="story-viewer__nav story-viewer__nav--prev"
          onClick={handlePrevious}
          disabled={isFirstStory}
        >
          ←
        </button>

        <img className="story-viewer__image" src={story.image} alt="Story" />

        <button
          type="button"
          className="story-viewer__nav story-viewer__nav--next"
          onClick={handleNext}
          disabled={isLastStory}
        >
          →
        </button>
      </div>
    </div>
  );
}

export default StoryViewer;
