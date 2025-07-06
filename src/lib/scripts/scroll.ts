import { $, $$ } from '$lib/dom-helper';
import type LocomotiveScroll from 'locomotive-scroll';


export let scroll: LocomotiveScroll

export const lockScroll = () => {
}

export const unlockScroll = () => {
}
export const  initScroll = async () => {
  const module = await import('locomotive-scroll');
  const LocomotiveScroll = module.default;
  const services = Array.from($$('.service'));
  const paddingBottom = $('.services-gap').offsetHeight
  const titleHeight = $('.services__title-box').offsetHeight
  $$('.service-anchor').forEach((anchor, i) => {
    const height = services.reverse().slice(i).reduce((acc, x) => {
      acc += x.offsetHeight
      return acc
    }, 0)
    anchor.style.height = `${height + (titleHeight / 2 + 50) + paddingBottom + ((i - services.length) * 10)}px`
  })
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
