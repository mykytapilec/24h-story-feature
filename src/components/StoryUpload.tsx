import type { ChangeEvent } from 'react';

interface StoryUploadProps {
  onSelect(file: File): void;
}

function StoryUpload({ onSelect }: StoryUploadProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      return;
    }

    onSelect(file);

    event.target.value = '';
  }

  return (
    <label className="story-upload" role="button" aria-label="Add story">
      <span className="story-upload__icon">＋</span>

      <input hidden type="file" accept="image/*" onChange={handleChange} />
    </label>
  );
}

export default StoryUpload;
