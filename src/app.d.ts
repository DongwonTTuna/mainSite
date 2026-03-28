// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      locale: import("#infrastructure/i18n/locale").AppLocale;
    }
    interface PageData {
      locale: import("#infrastructure/i18n/locale").AppLocale;
    }
    // interface PageState {}
    // interface Platform {}
  }
  declare module "*&image" {
    import type { Picture } from "vite-imagetools";

    const value: Picture;
    export default value;
  }
}

export {};
