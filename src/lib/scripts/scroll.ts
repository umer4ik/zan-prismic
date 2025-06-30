import { $ } from '$lib/dom-helper';
import Lenis, { type ScrollToOptions } from 'lenis'

export let lenis: Lenis;

export const lockScroll = (scrollToTop = false) => {
  if (scrollToTop) {
    lenis.scrollTo(0, {
      immediate: true,
    });
  }
  lenis.stop()
}

export const unlockScroll = () => {
  lenis.start()
}
export const initScroll = () => {
  lenis = new Lenis({
    autoRaf: true,
    prevent: node => {
      return node.classList.contains('drawer__content');
    },
  });
}

export const scrollTo = (target: string, options?: ScrollToOptions) => {
  const offsetTop = $(target).offsetTop;
  console.log(offsetTop)
  lenis.scrollTo(offsetTop, options);
};
