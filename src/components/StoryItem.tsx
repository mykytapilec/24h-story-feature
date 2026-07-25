import type { Story } from '../types/story';

interface StoryItemProps {
  story: Story;
}

function StoryItem({ story }: StoryItemProps) {
  return (
    <article>
      <img src={story.image} alt="Story" />
    </article>
  );
}

export default StoryItem;
