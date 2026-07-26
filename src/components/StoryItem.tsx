import type { Story } from '../types/story';

interface StoryItemProps {
  story: Story;
  onClick(story: Story): void;
}

function StoryItem({ story, onClick }: StoryItemProps) {
  return (
    <button type="button" className="story-item" onClick={() => onClick(story)}>
      <img src={story.image} alt="Story" />
    </button>
  );
}

export default StoryItem;
