// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      locale: string
    }
    // interface PageData {}
    // interface Platform {}
  }
  interface Window {
    updateScroll: () => void;
    clientMaskCoeff1440: number;
    clientMaskCoeff1920: number;
  }
}

export {};
