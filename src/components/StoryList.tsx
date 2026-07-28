import StoryItem from './StoryItem';
import StoryUpload from './StoryUpload';

import type { Story } from '../types/story';

interface StoryListProps {
  stories: Story[];
  onStoryClick(story: Story): void;
  onUpload(file: File): void;
}

function StoryList({ stories, onStoryClick, onUpload }: StoryListProps) {
  return (
    <section className="story-list">
      <StoryUpload onSelect={onUpload} />

      {stories.length === 0 ? (
        <div className="story-empty">
          <h2>No stories yet</h2>
          <p>Upload your first story to get started</p>
        </div>
      ) : (
        stories.map((story) => (
          <StoryItem
            key={story.id}
            story={story}
            onClick={() => onStoryClick(story)}
          />
        ))
      )}
    </section>
  );
}

export default StoryList;
