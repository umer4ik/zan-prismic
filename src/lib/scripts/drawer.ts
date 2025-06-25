import { $ } from "../dom-helper"
import { lockScroll, unlockScroll } from "./lock-scroll";

export const openDrawer = (workRefId: string) => {
  const projectHTML = $(`[data-project-id="${workRefId}"]`).innerHTML
  $('.drawer .project').innerHTML = projectHTML;
  $('.drawer').classList.add('open');
  lockScroll();
}

export const closeDrawer = () => {
  $('.drawer').classList.remove('open');
  unlockScroll();
}