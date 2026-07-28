import { useCallback, useState } from 'react';

import StoryList from '../components/StoryList';
import StoryViewer from '../components/StoryViewer';

import {
  getStories,
  removeExpiredStories,
  saveStory,
} from '../services/storyStorage';
import type { Story } from '../types/story';
import { fileToDataUrl } from '../utils/image';
import { createStory } from '../utils/story';

removeExpiredStories();

function App() {
  const [stories, setStories] = useState<Story[]>(() => getStories());
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleSelect = useCallback(async (file: File) => {
    const image = await fileToDataUrl(file);

    const story = createStory(image);

    saveStory(story);

    setStories(getStories());
  }, []);

  const handleStoryClick = useCallback(
    (story: Story) => {
      const index = stories.findIndex((item) => item.id === story.id);

      if (index !== -1) {
        setActiveIndex(index);
      }
    },
    [stories],
  );

  const handleCloseViewer = useCallback(() => {
    setActiveIndex(null);
  }, []);

  return (
    <main>
      <h1>24h Story Feature</h1>

      <StoryList
        stories={stories}
        onStoryClick={handleStoryClick}
        onUpload={handleSelect}
      />

      <StoryViewer
        stories={stories}
        activeIndex={activeIndex}
        onActiveIndexChange={setActiveIndex}
        onClose={handleCloseViewer}
      />
    </main>
  );
}

export default App;
