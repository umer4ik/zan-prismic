import { $, $$ } from '$lib/dom-helper';
import type LocomotiveScroll from 'locomotive-scroll';


export let scroll: LocomotiveScroll

export const lockScroll = () => {
}

export const unlockScroll = () => {
}
export const initScroll = async () => {
  const module = await import('locomotive-scroll');
  const LocomotiveScroll = module.default;
  // const services = Array.from($$('.service'));
  // const paddingBottom = $('.services-gap')?.offsetHeight ?? 0
  const titleHeight = $('.services__title-box').offsetHeight
  const serviceTitleHeight = $('.service__title').offsetHeight
  const serviceHeight = $('.service').offsetHeight
  const serviceContentPaddingTop = parseInt(getComputedStyle($('.service__content')).paddingBlockStart, 10);
  $$('.service-wrapper').forEach((service, i) => {
    const offset = titleHeight / 2 + serviceHeight * i - (serviceTitleHeight + serviceContentPaddingTop * 2) * i
    // anchor.style.height = `${height + (titleHeight / 2 + 50) + paddingBottom + ((i - services.length) * 10)}px`
    service.setAttribute('data-scroll-offset', `${offset}, 100%`)
  })
  scroll = new LocomotiveScroll({
    smooth: true,
    multiplier: 0.8,
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
