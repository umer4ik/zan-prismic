import { $ } from '$lib/dom-helper';
import type LocomotiveScroll from 'locomotive-scroll';


export let scroll: LocomotiveScroll

export const lockScroll = (scrollToTop = false) => {
}

export const unlockScroll = () => {
}
export const  initScroll = async () => {
  const module = await import('locomotive-scroll');
  const LocomotiveScroll = module.default;
  scroll = new LocomotiveScroll({
    smooth: true,
    el: $('#js-scroll'),
    getDirection: true,
    tablet: {
      smooth: true,
      breakpoint: 1024
    },
    smartphone: {
      smooth: false
    }
  });
}

export const scrollTo = (target: string) => {
  scroll.scrollTo(target);
};
