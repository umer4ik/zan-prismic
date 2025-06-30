import { $ } from '$lib/dom-helper';
import Lenis, { type ScrollToOptions } from 'lenis'
import { ScrollTrigger } from "gsap/all";
import { gsap } from 'gsap'
gsap.registerPlugin(ScrollTrigger);

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
  // Initialize a new Lenis instance for smooth scrolling
    lenis = new Lenis({
      prevent: node => {
        return node.classList.contains('drawer__content');
      },
    });

    // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
    lenis.on('scroll', ScrollTrigger.update);

    // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
    // This ensures Lenis's smooth scroll animation updates on each GSAP tick
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000); // Convert time from seconds to milliseconds
    });

    // Disable lag smoothing in GSAP to prevent any delay in scroll animations
    gsap.ticker.lagSmoothing(0);
}

export const scrollTo = (target: string, options?: ScrollToOptions) => {
  const offsetTop = $(target).offsetTop;
  console.log(offsetTop)
  lenis.scrollTo(offsetTop, options);
};
