import { browser } from '$app/environment';
export const $ = <T extends HTMLElement>(selector: string) => {
  if (!browser) return null as unknown as T;
  const element = document.querySelector(selector);
  return element as T;
}
export const $$ = <T extends HTMLElement>(selector: string) => {
  if (!browser) return null as unknown as NodeListOf<T>;
  const collection = document.querySelectorAll(selector);
  return collection as NodeListOf<T>;
}

export function assertIsHTMLElement(el: unknown): asserts el is HTMLElement {
  if (!browser) return;
  if (!(el instanceof HTMLElement)) throw Error('not HTMLElement');
}