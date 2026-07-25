import type { Story } from '../types/story';

import StoryItem from './StoryItem';

interface StoryListProps {
  stories: Story[];
}

function StoryList({ stories }: StoryListProps) {
  if (stories.length === 0) {
    return (
      <section>
        <p>No active stories</p>
      </section>
    );
  }

  return (
    <section>
      {stories.map((story) => (
        <StoryItem key={story.id} story={story} />
      ))}
    </section>
  );
}

export default StoryList;
