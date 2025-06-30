import { animate, eases } from "animejs";
import { $ } from "../dom-helper"
import { lockScroll, unlockScroll } from "./scroll";

export const openDrawer = async (workRefId: string, trigger: HTMLElement) => {
  const projectHTML = $(`[data-project-id="${workRefId}"]`).innerHTML
  if (!trigger.classList.contains('next-project')) {
    $('.drawer .project').innerHTML = projectHTML;
    $('.drawer').classList.add('open');
  } else { // clicking on a next project
    await slideOutProject();
    $('.drawer .project').innerHTML = projectHTML;
    $('.drawer__content').scrollTo(0, 0);
    slideInProject();
  }
  lockScroll();
}

export const closeDrawer = () => {
  $('.drawer').classList.remove('open');
  unlockScroll();
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
