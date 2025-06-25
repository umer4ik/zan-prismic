import { createTimeline, eases } from "animejs";
import { $ } from "../dom-helper";
import { stagger } from "animejs";
// import { lockScroll, unlockScroll } from "./lock-scroll";

export const burger = () => {
  const tl1 = createTimeline();
  const tl2 = createTimeline();
  let open = false
  tl1
    .add($('.burger__line:first-child'), {
      y: [0, 3],
      backgroundColor: ['#F4EDDD', '#634F1E'],
      duration: 400,
    })
    .add($('.burger__line:first-child'), {
      rotate: [0, '45deg'],
      duration: 400,
    })
    .pause();
  tl2
    .add($('.burger__line:last-child'), {
      y: [0, -3],
      backgroundColor: ['#F4EDDD', '#634F1E'],
      duration: 400,
    })
    .add($('.burger__line:last-child'), {
      rotate: [0, '-45deg'],
      duration: 400,
    })
    .add('.burger-menu__item a', {
      y: ['110%', 0],
      duration: 400,
      delay: stagger(50),
      ease: eases.outExpo,
    }, '-=450')
    .add('.burger-menu__item-border', {
      width: [0, '100%'],
      duration: 600,
      delay: stagger(50),
      ease: eases.outExpo,
    }, '-=600')
    .pause();

  const toggleBurger = () => {
    $('body').classList.toggle('burger-open');
    if (open) {
      tl1.reverse();
      tl2.reverse();
      // unlockScroll();
    } else {
      tl1.restart();
      tl2.restart();
      // lockScroll();
    }
    open = !open
  }

  $('.burger').addEventListener('click', function () {
    toggleBurger();
  })
}