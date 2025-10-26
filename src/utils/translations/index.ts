// Translation files barrel export
export { en } from './en';
export { hi } from './hi';
export { snt } from './snt';
export { ho } from './ho';
export { mun } from './mun';
export { kur } from './kur';
export { kha } from './kha';

// Re-export as translations object for backward compatibility
import { en } from './en';
import { hi } from './hi';
import { snt } from './snt';
import { ho } from './ho';
import { mun } from './mun';
import { kur } from './kur';
import { kha } from './kha';

export const translations = {
  en,
  hi,
  snt,
  ho,
  mun,
  kur,
  kha
};
