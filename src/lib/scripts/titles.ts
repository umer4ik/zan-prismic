import { animate, eases } from "animejs";
import { scroll } from "./scroll"
import { stagger } from "animejs";

export const handleTitles = () => {
  let worksTitleAnimated = false;
  let aboutTitleAnimated = false;
  let tripleCAnimated = false;
  let awardsAnimated = false;
  scroll.on('scroll', ({ currentElements }) => {
    if (currentElements['works-content']) {
      // const isArabic = document.documentElement.getAttribute('dir') === 'rtl'
      if (!worksTitleAnimated) {
        worksTitleAnimated = true;
        animate('.title--works .split-text__visible', {
          y: ['101%', 0],
          duration: 600,
          delay: stagger(70),
          ease: eases.outCirc,
        })
      }
    }
    if (currentElements['about-title']) {
      if (!aboutTitleAnimated) {
        aboutTitleAnimated = true;
        animate('.title--about-us .split-text__visible', {
          y: ['101%', 0],
          duration: 600,
          delay: stagger(70),
          ease: eases.outCirc,
        })
      }
    }
    if (currentElements['triple-c-title']) {
      if (!tripleCAnimated) {
        tripleCAnimated = true;
        animate('.title--triple-c .split-text__visible', {
          y: ['101%', 0],
          duration: 600,
          delay: stagger(70),
          ease: eases.outCirc,
        })
      }
    }
    if (currentElements['awards-title']) {
      if (!awardsAnimated) {
        awardsAnimated = true;
        animate('.title--awards .split-text__visible', {
          y: ['101%', 0],
          duration: 600,
          delay: stagger(70),
          ease: eases.outCirc,
        })
      }
    }
  });
}