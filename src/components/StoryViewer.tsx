import type { Story } from '../types/story';

interface StoryViewerProps {
  story: Story | null;
  onClose(): void;
}

function StoryViewer({ story, onClose }: StoryViewerProps) {
  if (!story) {
    return null;
  }

  return (
    <div className="story-viewer">
      <div className="story-viewer__content">
        <button type="button" className="story-viewer__close" onClick={onClose}>
          ×
        </button>

        <img className="story-viewer__image" src={story.image} alt="Story" />
      </div>
    </div>
  );
}

export default StoryViewer;
