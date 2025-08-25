import { $, $$ } from '$lib/dom-helper';
import type LocomotiveScroll from 'locomotive-scroll';


export let scroll: LocomotiveScroll

export const lockScroll = () => {
  scroll?.stop();
  document.body.style.overflow = 'hidden';
}

export const unlockScroll = () => {
  scroll?.start();
  document.body.style.overflow = '';
}
export const initScroll = async () => {
  const module = await import('locomotive-scroll');
  const LocomotiveScroll = module.default;
  // const services = Array.from($$('.service'));
  // const paddingBottom = $('.services-gap')?.offsetHeight ?? 0
  const titleHeight = $('.services__title-box').offsetHeight
  const serviceTitleHeight = $('.service__title').offsetHeight
  const serviceContentPaddingTop = parseInt(getComputedStyle($('.service__content')).paddingBlockStart, 10);
  const additionalOffset = 0; // window.innerWidth > 1440 ? 50 : 50
  let indexOffset = 0;
  $$('.service-wrapper').forEach((service, i) => {
    const serviceHeight = $$('.service').item(i).offsetHeight;
    // console.log('serviceHeight', serviceHeight * i);
    // console.log('indexOffset', indexOffset);
    indexOffset += $$('.service').item(i).offsetHeight;
    const offset = titleHeight / 2 + additionalOffset + (indexOffset - serviceHeight) - (serviceTitleHeight + serviceContentPaddingTop * 2) * i;

    // anchor.style.height = `${height + (titleHeight / 2 + 50) + paddingBottom + ((i - services.length) * 10)}px`
    service.setAttribute('data-scroll-offset', `${offset}, 100%`)
  });
  if (window.innerWidth <= 768) {
    $('.clients-box__start').removeAttribute('data-scroll-sticky');
    const footerFull = $('[data-scroll-id="footer-full"]');
    footerFull.removeAttribute('data-scroll-speed');
    footerFull.removeAttribute('data-scroll-section');
  };
  if (window.innerHeight <= 700) {
    $('[data-scroll-id="footer-full"]').setAttribute('data-scroll-speed', '1');
  };

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
      smooth: false,
    }
  });
  if (window) {
    window.updateScroll = updateScroll;
  }
}

export const scrollTo = (target: string) => {
  scroll.scrollTo(target);
};

export function updateScroll() {
  scroll?.update();
}
