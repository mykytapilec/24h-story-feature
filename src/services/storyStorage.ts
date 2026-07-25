import type { Story } from '../types/story';
import { STORY_STORAGE_KEY } from '../utils/constants';
import { isStoryExpired } from '../utils/story';

function saveStories(stories: Story[]): void {
  localStorage.setItem(STORY_STORAGE_KEY, JSON.stringify(stories));
}

export function getStories(): Story[] {
  const data = localStorage.getItem(STORY_STORAGE_KEY);

  if (!data) {
    return [];
  }

  try {
    const stories = JSON.parse(data) as Story[];

    return stories.filter((story) => !isStoryExpired(story));
  } catch {
    return [];
  }
}

export function saveStory(story: Story): void {
  const stories = getStories();

  stories.push(story);

  saveStories(stories);
}

export function removeExpiredStories(): void {
  const activeStories = getStories();

  saveStories(activeStories);
}
