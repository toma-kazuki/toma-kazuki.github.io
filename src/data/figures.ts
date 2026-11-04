// Any .webp dropped into src/assets/figures can be used by its file name.
import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/figures/*.webp', { eager: true });

export const figure = (name: string) => {
  const file = files[`../assets/figures/${name}.webp`];
  if (!file) throw new Error(`Unknown figure: ${name}`);
  return file.default;
};
