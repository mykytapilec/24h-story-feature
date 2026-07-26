import StoryItem from './StoryItem';
import type { Story } from '../types/story';
import StoryUpload from './StoryUpload';

interface StoryListProps {
  stories: Story[];
  onStoryClick(story: Story): void;
  onUpload(file: File): void;
}

function StoryList({ stories, onStoryClick, onUpload }: StoryListProps) {
  return (
    <section className="story-list">
      <StoryUpload onSelect={onUpload} />

      {stories.map((story) => (
        <StoryItem
          key={story.id}
          story={story}
          onClick={() => onStoryClick(story)}
        />
      ))}
    </section>
  );
}

export default StoryList;
