import { $$ } from "../dom-helper"
import { splitText } from "./split-text"

export const processText = () => {
  splitText({
    elements: $$('.intro-title-word'),
  });
  splitText({
    elements: $$('.header__link span, .header__button span'),
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

  if (document.documentElement.getAttribute('dir') === 'ltr') {
    splitText({
      elements: $$('.intro-about__text > *')
    });
    splitText({
      elements: $$('.title--works > span')
    });
    splitText({
      elements: $$('.title--works > sup'),
      isWord: true,
    });
    splitText({
      elements: $$('.services__title'),
    });
    splitText({
      elements: $$('.title--about-us'),
    });
    splitText({
      elements: $$('.title--triple-c > span')
    });
    splitText({
      elements: $$('.title--triple-c > sup'),
      isWord: true,
    });
    splitText({
      elements: $$('.title--awards > span')
    });
    splitText({
      elements: $$('.title--awards > sup'),
      isWord: true,
    });
  } else {
    splitText({
      elements: $$('.intro-about__text > *'),
      isWord: true
    })
  }

  curtainize($$('.intro-braces'));
  curtainize($$('.intro-work'));
  splitToLines($$('.about-us__top-text p'));
  splitToLines($$('.about-us__number'));
  splitToLines($$('.about-us__philosophy-text p'));
  splitToLines($$('.about-us__belief-text p'));
  splitToLines($$('.triple-c__text p'));
  splitToWords($$('.awards-table__body .award-col span'))
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

const splitToLines = (el: HTMLElement | NodeListOf<HTMLElement>) => {
  if ('forEach' in el) {
    el.forEach(splitToLines);
  } else {
    const nodes = [...el.childNodes].filter(x => x.nodeName !== '#comment' && x.nodeName !== 'BR');
    const lines = nodes.map(node => node.textContent || '');
    el.innerHTML = lines.map(line => `<div class="popping-text" data-scroll>${line}</div>`).join('');
  }
}

const splitToWords = (el: HTMLElement | NodeListOf<HTMLElement>) => {
  if ('forEach' in el) {
    el.forEach(splitToWords);
  } else {
    const words = el.textContent?.split(' ') || [];
    el.innerHTML = words.map(word => `<span class="popping-text" data-scroll>${word}</span>`).join(' ');
  }
}