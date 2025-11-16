// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
  declare module '*&image' {
    import type { Picture } from 'vite-imagetools';

    const value: Picture;
    export default value;
  }
}

export {};
