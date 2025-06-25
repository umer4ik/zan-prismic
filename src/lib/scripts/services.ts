import { animate, eases, JSAnimation } from "animejs";
import { $, $$, assertIsHTMLElement } from "../dom-helper"
import _ from "lodash";
const { debounce } = _;

export const addServicesEventListeners = () => {
  $('.services').addEventListener('mouseover', ({ target }) => {
    assertIsHTMLElement(target);
    const trigger = target.closest('.service');
    if (!trigger || trigger.classList.contains('hovered')) return;
    assertIsHTMLElement(trigger);
    if ($('.service.hovered')) {
      collapse($('.service.hovered'));
      $('.service.hovered').classList.remove('hovered');
    }
    trigger.classList.add('hovered');
    expand(trigger)
  });

  const resize = debounce(() => {
    // if (window.innerWidth > 768) {
    if (expandAnimation) {
      expandAnimation.cancel()
    }
    if (collapseAnimation) {
      collapseAnimation.cancel()
    }
    if ($('.service.expanded')) {
      $('.service.expanded').classList.remove('expanded');
    }
    $$('.service').forEach(x => x.removeAttribute('style'))
    // }
  }, 400)
  window.addEventListener('resize', resize);
}

let collapseAnimation: JSAnimation;
let expandAnimation: JSAnimation;

const getTargetHeight = () => {
  const width = window.innerWidth;
  if (width > 1200) return 120;
  if (width <= 1200 && width > 1024) return 105;
  if (width <= 1024 && width > 768) return 90;
  return 70;
}

const collapse = (service: HTMLElement) => {
  collapseAnimation = animate(service, {
    height: [service.getBoundingClientRect().height, getTargetHeight()],
    duration: 400,
    ease: eases.inOutQuad,
  })
}

const expand = (service: HTMLElement) => {
  const startHeight = service.getBoundingClientRect().height;
  service.style.height = 'auto';
  const targetHeight = service.getBoundingClientRect().height;
  service.removeAttribute('style');
  expandAnimation = animate(service, {
    height: [startHeight, targetHeight],
    duration: 400,
    ease: eases.inOutQuad,
  })
}