import { useCallback, useState } from 'react';

import StoryList from '../components/StoryList';
import StoryUpload from '../components/StoryUpload';

import { getStories, saveStory } from '../services/storyStorage';
import type { Story } from '../types/story';
import { fileToDataUrl } from '../utils/image';
import { createStory } from '../utils/story';

function App() {
  const [stories, setStories] = useState<Story[]>(() => getStories());

  const handleSelect = useCallback(async (file: File) => {
    const image = await fileToDataUrl(file);

    const story = createStory(image);

    saveStory(story);

    setStories(getStories());
  }, []);

  return (
    <main>
      <h1>24h Story Feature</h1>

      <StoryUpload onSelect={handleSelect} />

      <StoryList stories={stories} />
    </main>
  );
}

export default App;