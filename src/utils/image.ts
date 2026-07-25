export const MAX_IMAGE_WIDTH = 1080;

export const MAX_IMAGE_HEIGHT = 1920;

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Failed to read image.'));

    reader.readAsDataURL(file);
  });
}
