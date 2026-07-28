import { useCallback, useState } from 'react';

import StoryList from '../components/StoryList';
import StoryViewer from '../components/StoryViewer';

import {
  getStories,
  removeExpiredStories,
  removeStory,
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

  const handleDeleteStory = useCallback(() => {
    if (activeIndex === null) {
      return;
    }

    const story = stories[activeIndex];

    if (!story) {
      return;
    }

    removeStory(story.id);

    const updatedStories = getStories();

    setStories(updatedStories);

    if (updatedStories.length === 0) {
      setActiveIndex(null);
      return;
    }

    if (activeIndex >= updatedStories.length) {
      setActiveIndex(updatedStories.length - 1);
    }
  }, [activeIndex, stories]);

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
        onDelete={handleDeleteStory}
      />
    </main>
  );
}

export default App;
