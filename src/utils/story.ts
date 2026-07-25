import { STORY_DURATION_MS } from './constants';
import type { Story } from '../types/story';

export function createStory(image: string): Story {
  const createdAt = Date.now();

  return {
    id: crypto.randomUUID(),
    image,
    createdAt,
    expiresAt: createdAt + STORY_DURATION_MS,
  };
}

export function isStoryExpired(story: Story): boolean {
  return Date.now() >= story.expiresAt;
}
