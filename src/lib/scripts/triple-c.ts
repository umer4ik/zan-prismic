import { animate, eases, JSAnimation } from "animejs";
import { $, $$, assertIsHTMLElement } from "../dom-helper"
import _ from "lodash";
const { debounce } = _;

export const handleTripleC = () => {
  $('.triple-c').addEventListener('mouseover', ({ target }) => {
    if (window.innerWidth <= 450) return
    assertIsHTMLElement(target);
    const c = target.closest('.c');
    if (!c || c.classList.contains('hover')) return;
    $$('.c').forEach(x => {
      x.classList.remove('hovered')
    });
    c.classList.add('hovered');
  });

  let collapseAnimation: JSAnimation;
  let expandAnimation: JSAnimation;

  const collapse = (el: HTMLElement) => {
    const targetHeight = 72;
    collapseAnimation = animate(el, {
      height: [el.getBoundingClientRect().height, targetHeight],
      duration: 400,
      ease: eases.inOutQuad,
    })
  }

  const expand = (el: HTMLElement) => {
    const startHeight = 72;
    el.style.height = 'auto';
    const targetHeight = el.getBoundingClientRect().height;
    el.removeAttribute('style');
    expandAnimation = animate(el, {
      height: [startHeight, targetHeight],
      duration: 400,
      ease: eases.inOutQuad,
    })
  }

  $('.triple-c').addEventListener('click', ({ target }) => {
    if (window.innerWidth > 450) return
    assertIsHTMLElement(target);
    const c = target.closest('.c');
    if (!c) return;
    assertIsHTMLElement(c);
    if (c.classList.contains('expanded')) {
      c.classList.remove('expanded');
      collapse(c);
      return;
    }
    if ($('.c.expanded')) {
      collapse($('.c.expanded'));
      $('.c.expanded').classList.remove('expanded');
    }
    c.classList.add('expanded');
    expand(c);
  });

  const resize = debounce(() => {
    if (window.innerWidth > 450) {
      if (expandAnimation) {
        expandAnimation.cancel()
      }
      if (collapseAnimation) {
        collapseAnimation.cancel()
      }
      $$('.c').forEach(x => x.removeAttribute('style'))
      if ($('.c.expanded')) {
        $('.c.expanded').removeAttribute('style');
          $('c.expanded').classList.remove('expanded');
      }
    }
  }, 400)
  window.addEventListener('resize', resize);
}
