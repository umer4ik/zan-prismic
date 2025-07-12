import { animate, stagger, eases, JSAnimation } from 'animejs';
import { zanEasing } from './utils';
import { $ } from '../dom-helper';
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
  let animCurtain: JSAnimation;
  let anim: JSAnimation;
  let isShown = false;
  let isCurtainShown = false;
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
      });
      scroll.on('scroll', ({ direction, delta }) => {
        if (direction === 'up' && !isCurtainShown) {
          isCurtainShown = true;
          showCurtain();
        }
        if (delta.y === 0 && isCurtainShown) {
          hideCurtain();
          isCurtainShown = false;
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

  const hideCurtain = () => {
    if (animCurtain) {
      animCurtain.cancel();
    }
    animCurtain = animate('.header__curtain', {
      y: [0, '-110%'],
      duration: 400,
      ease: eases.inOutQuad,
    })
  }

  const showCurtain = () => {
    if (animCurtain) {
      animCurtain.cancel();
    }
    animCurtain = animate('.header__curtain', {
      y: ['-110%', 0],
      duration: 400,
      ease: eases.inOutQuad,
    })
  }
}

export const animateIntroAbout = () => {
  const isArabic = document.documentElement.getAttribute('dir') === 'rtl'
  animate('.intro-braces .curtain__popper, .intro-about__text .split-text__visible, .intro-work .curtain__popper', {
    y: ['101%', 0],
    duration: 600,
    delay: stagger(isArabic ? 110 : 30),
    ease: eases.outCirc,
  })
}