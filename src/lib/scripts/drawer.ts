import { animate, eases } from "animejs";
import { $, $$ } from "../dom-helper"
import { lockScroll, unlockScroll } from "./scroll";

export const openDrawer = async (workRefId: string, trigger: HTMLElement) => {
  document.body.style.cursor = 'default'
  const projectHTML = $(`[data-project-id="${workRefId}"]`).innerHTML
  if (!trigger.classList.contains('next-project')) {
    $('.drawer .project').innerHTML = projectHTML;
    $('.drawer').classList.add('open');
    $('.drawer__content').scrollTo(0, 0);
    setTimeout(() => {
      checkScroll();
    });
  } else { // clicking on a next project
    await slideOutProject();
    $('.drawer .project').innerHTML = projectHTML;
    $('.drawer__content').scrollTo(0, 0);
    slideInProject();
    checkScroll()
  }
  lockScroll();
  // setTimeout(() => {
  //   $('.drawer .project__header')?.classList.add('show')
  // }, 600);
  // setTimeout(() => {
  //   $('.drawer .project__subheader')?.classList.add('show')
  // }, 800);
  const content = $('.drawer__content');
  content.addEventListener('scroll', checkScroll)
}

const checkScroll = () => {
  $$('.project > *').forEach(el => {
    el.classList.toggle('show', el.getBoundingClientRect().top < window.innerHeight);
  })
}

export const closeDrawer = () => {
  $('.drawer').classList.remove('open');
  unlockScroll();
  const content = $('.drawer__content');
  content.removeEventListener('scroll', checkScroll)
}

const slideOutProject = async () => {
  return animate('.drawer__content .project', {
    x: [0, '-20%'],
    opacity: [1, 0],
    duration: 600,
    ease: eases.inOutQuad,
  }).then();
};

const slideInProject = async () => {
  return animate('.drawer__content .project', {
    x: ['20%', '0'],
    opacity: [0, 1],
    duration: 400,
    ease: eases.inOutQuad,
  }).then();
}
