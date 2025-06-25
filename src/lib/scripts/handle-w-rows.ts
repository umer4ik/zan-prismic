import { animate, eases, JSAnimation } from "animejs";
import { $, $$ } from "../dom-helper"
import _ from "lodash";
const { debounce } = _;

export const handleWRows = () => {
  $$('.w-row__col:first-child').forEach(x => {
    x.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        if (x.closest('.w-row.expanded')) {
          collapse($('.w-row.expanded'));
          $('.w-row.expanded').classList.remove('expanded');
          return;
        }
        if ($('.w-row.expanded')) {
          collapse($('.w-row.expanded'));
          $('.w-row.expanded').classList.remove('expanded');
        }
        x.closest('.w-row')!.classList.add('expanded');
        expand($('.w-row.expanded'));
      }
    })
  })
  const resize = debounce(() => {
    if (window.innerWidth > 768) {
      if (expandAnimation) {
        expandAnimation.cancel()
      }
      if (collapseAnimation) {
        collapseAnimation.cancel()
      }
      if ($('.w-row.expanded')) {
        $('.w-row.expanded').removeAttribute('style');
         $('.w-row.expanded').classList.remove('expanded');
      }
    }
  }, 400)
  window.addEventListener('resize', resize);
}
let collapseAnimation: JSAnimation;
let expandAnimation: JSAnimation;

const collapse = (row: HTMLElement) => {
  const targetHeight = 52
  collapseAnimation = animate(row, {
    height: [row.getBoundingClientRect().height, targetHeight],
    duration: 400,
    ease: eases.inOutQuad,
  })
}

const expand = (row: HTMLElement) => {
  const startHeight = 52;
  row.style.height = 'auto';
  const targetHeight = row.getBoundingClientRect().height;
  row.removeAttribute('style');
  expandAnimation = animate(row, {
    height: [startHeight, targetHeight],
    duration: 400,
    ease: eases.inOutQuad,
  })
}