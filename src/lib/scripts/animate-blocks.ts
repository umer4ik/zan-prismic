import { animate, stagger, eases, JSAnimation } from 'animejs';
import { zanEasing } from './utils';
import { $, $$ } from '../dom-helper';
import { scroll } from './scroll';

// intro title
export const animateIntroTitle = () => {
  animate('.intro-title .split-text__visible', {
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
      scroll.on('scroll', ({ direction, delta }) => {
        if (
          delta.y > $('.intro').getBoundingClientRect().height && delta.y < $('footer').offsetTop
        ) {
          header.dataset['mode'] = 'dark';
        } else {
          header.dataset['mode'] = 'light';

        }
        if (window.scrollY !== oldScroll) {
          oldScroll = window.scrollY;
        }
        if (direction === 'up' && !isShown) { // scroll up
          showHeader();
          isShown = true
        } else if (direction =='down' && isShown && !document.body.classList.contains('burger-open')) {
          hideHeader();
          isShown = false
        }
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
}

export const animateIntroAbout = () => {
  animate('.intro-braces .curtain__popper, .intro-about__text .split-text__visible, .intro-work .curtain__popper', {
    y: ['101%', 0],
    duration: 600,
    delay: stagger(30),
    ease: eases.outCirc,
  })
}