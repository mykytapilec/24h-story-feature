import { useState } from 'react';

import type { Story } from '../types/story';
import { getStories } from '../services/storyStorage';

import StoryItem from './StoryItem';

function StoryList() {
  const [stories] = useState<Story[]>(() => getStories());

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
