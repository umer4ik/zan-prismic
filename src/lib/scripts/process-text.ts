import { $$ } from "../dom-helper"
import { splitText } from "./split-text"

export const processText = () => {
  splitText({
    elements: $$('.intro-title-word'),
  });
  splitText({
    elements: $$('.header__link span'),
    className: 'transform-chars',
    charContainerClassName: 'transform-chars__container',
    invisibleCharClassName: 'transform-chars__end',
    visibleCharClassName: 'transform-chars__start',
  });
  // $$('.header__link sup').forEach(el => {
    // const sup = document.createElement('sup');
    // sup.className = 'transform-chars__container';
    // sup.innerHTML = `
    //   <span class="transform-chars__end">${el.textContent}</span>
    //   <span class="transform-chars__start">${el.textContent}</span>
    // `
    // el.parentNode!.querySelector('.transform-chars')!.appendChild(sup);
    // el.parentNode!.removeChild(el);
  // });

  splitText({
    elements: $$('.intro-about__text > *')
  })

  curtainize($$('.intro-braces'));
  curtainize($$('.intro-work'));
}

const curtainize = (el: HTMLElement | NodeListOf<HTMLElement>) => {
  if ('forEach' in el) {
    el.forEach(curtainize);
  } else {
    el.classList.add('curtain');
    el.innerHTML = `
      <div class="curtain__reserve">${el.innerHTML}</div>
      <div class="curtain__popper">${el.innerHTML}</div>
    `
  }
}