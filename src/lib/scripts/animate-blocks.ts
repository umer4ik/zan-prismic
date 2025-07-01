import { animate, stagger, eases, JSAnimation } from 'animejs';
import { zanEasing } from './utils';
import { $, $$ } from '../dom-helper';
import { lenis } from './scroll';

// intro title
export const animateIntroTitle = () => {
  animate('.intro__title .split-text__visible', {
    y: ['100%', 0],
    duration: 1300,
    delay: stagger(180),
    ease: eases.outExpo,
  })
}


// site header
export const animateHeader = () => {
  let oldScroll = 0;
  let anim: JSAnimation;
  let isShown = false;
  const header = $('.header')
  animate('.header', {
    y: ['-60px', 0],
    duration: 1200,
    ease: zanEasing,
    onComplete: () => {
      isShown = true;
      checkIntersection();
      lenis.on('scroll', () => {
        const delta = window.scrollY - oldScroll;
        
        if (window.scrollY !== oldScroll) {
          oldScroll = window.scrollY;
        }
        if (delta < 0 && !isShown) { // scroll up
          showHeader();
          isShown = true
        } else if (delta > 0 && isShown && !document.body.classList.contains('burger-open')) {
          hideHeader();
          isShown = false
        }
        checkIntersection();
      })
    }
  })
  const showHeader = () => {
    if (anim) {
      anim.cancel();
    }
    anim = animate('.header', {
      y: ['-110%', 0],
      duration: 400,
      ease: eases.inOutQuad,
    })
  }
  const hideHeader = () => {
     if (anim) {
      anim.cancel();
    }
    anim = animate('.header', {
      y: [0, '-110%'],
      duration: 400,
      ease: eases.inOutQuad,
    })
  }

  const checkIntersection = () => {
    const intersectionTargets = [
      {
        el: $('.intro'),
        mode: 'light',
      },
      {
        el: $('.mwf'),
        mode: 'dark'
      },
      {
        el: $('.works'),
        mode: 'dark'
      },
      {
        el: $('.w-table'),
        mode: 'dark'
      },
      {
        el: $('.clients'),
        mode: 'dark'
      },
      {
        el: $('.services'),
        mode: 'dark'
      },
      {
        el: $('.about-us'),
        mode: 'dark'
      },
      {
        el: $('.triple-c'),
        mode: 'dark'
      },
      {
        el: $('.awards'),
        mode: 'dark'
      },
      {
        el: $('footer'),
        mode: 'light'
      },
      ...(Array.from($$('.service-box')).map(el => ({
        el,
        mode: 'dark'
      })))
    ];
    for (const { el, mode } of intersectionTargets) {
      if (!el) return;
      if (inHeader(el.getBoundingClientRect().top, el.getBoundingClientRect().bottom)) {
        header.dataset['mode'] = mode;
      }
    }
  }

  const inHeader = (top: number, bottom: number) => {
    const rect = header.getBoundingClientRect();
    return top <= rect.top && bottom >= rect.bottom;
  }
}

export const animateIntroAbout = () => {
  animate('.intro-braces .curtain__popper, .intro-about__text .split-text__visible, .intro-work .curtain__popper', {
    y: ['101%', 0],
    duration: 600,
    delay: stagger(30),
    ease: eases.outCirc,
  })
}