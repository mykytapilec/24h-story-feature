import { useCallback, useState } from 'react';

import StoryList from '../components/StoryList';
import StoryViewer from '../components/StoryViewer';

import { getStories, saveStory } from '../services/storyStorage';
import type { Story } from '../types/story';
import { fileToDataUrl } from '../utils/image';
import { createStory } from '../utils/story';

function App() {
  const [stories, setStories] = useState<Story[]>(() => getStories());
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  const handleSelect = useCallback(async (file: File) => {
    const image = await fileToDataUrl(file);

    const story = createStory(image);

    saveStory(story);

    setStories(getStories());
  }, []);

  const handleStoryClick = useCallback((story: Story) => {
    setSelectedStory(story);
  }, []);

  const handleCloseViewer = useCallback(() => {
    setSelectedStory(null);
  }, []);

  return (
    <main>
      <h1>24h Story Feature</h1>

      <StoryList
        stories={stories}
        onStoryClick={handleStoryClick}
        onUpload={handleSelect}
      />

      <StoryViewer story={selectedStory} onClose={handleCloseViewer} />
    </main>
  );
}

export default App;
