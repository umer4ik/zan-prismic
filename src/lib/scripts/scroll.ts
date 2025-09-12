import { $, $$ } from '$lib/dom-helper';
import type LocomotiveScroll from 'locomotive-scroll';
// import { get1Rem } from './get-1-rem';

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

  // clients
  // const clientHeight = $('.client:not(:first-child)').offsetHeight;
  // const clientMask = $('.clients-box__mask');
  const clientBoxStart = $('.clients-box__start');
  // clientMask.setAttribute('data-scroll-offset', `0, ${clientHeight * 4 + clientHeight / 2 - 20}`)
  // let clientBoxStartOffset = 0;
  // const clientsOnPage = window.innerHeight / clientHeight;
  
  // let e = 48 * get1Rem();
  // if (window.innerWidth <= 1440) {
  //   e = 35 * get1Rem();
  // }
  // const d = (-10 + clientsOnPage) * - e
  // clientBoxStartOffset = d;
  // clientBoxStart.setAttribute('data-scroll-offset', `0, ${clientHeight * 5}`)
  // const firstClient = $('.client:not(.client--fake):nth-child(1)');
  // const sixthClient = $('.client:not(.client--fake):nth-child(6)');
  // const direction = sixthClient.getBoundingClientRect().top > clientMask.getBoundingClientRect().top ? 'up' : 'down';
  // const step = direction === 'up' ? -1 : 1;
  // const frame = () => {
  //   if (window.innerWidth <= 1024) return;
    // firstClient.style.marginTop = (parseInt(getComputedStyle(firstClient).marginTop, 10) + step) + 'px';
    // if (direction === 'up') {
    //   if (sixthClient.getBoundingClientRect().top > clientMask.getBoundingClientRect().top) {
    //     requestAnimationFrame(frame);
    //   }
    // } else {
    //   if (sixthClient.getBoundingClientRect().top < clientMask.getBoundingClientRect().top) {
    //     requestAnimationFrame(frame);
    //   }
    // }
  // }
  // requestAnimationFrame(frame);
  if (window.innerWidth <= 768) {
    clientBoxStart.removeAttribute('data-scroll-sticky');
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
