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
      <button type="button" onClick={onClose}>
        Close
      </button>

      <img src={story.image} alt="Story" />
    </div>
  );
}

export default StoryViewer;
