import { animate, eases, JSAnimation } from "animejs";
import { $, assertIsHTMLElement, $$ } from "../dom-helper"
import _ from "lodash";
import { scroll } from "./scroll";
import { get1Rem } from "./get-1-rem";

export const handleClients = () => {
  // $('.clients').addEventListener('mouseover', ({ target }) => {
  //   if (window.innerWidth > 1020) {
  //     assertIsHTMLElement(target)
  //     const trigger = target.closest('.client');
  //     if (!trigger) return;
  //     $$('.client').forEach(x => x.classList.remove('hovered'));
  //     trigger.classList.add('hovered');
  //     const index = trigger.getAttribute('data-client')!;

  //     $$(`.clients-box__img img:not([data-client="${index}"])`).forEach(x => x.classList.remove('show'));

  //     const img = $(`.clients-box__img [data-client="${index}"]`);

  //     showImage(img, +index)
  //   }
  // });

  let collapseAnimation: JSAnimation;
  let expandAnimation: JSAnimation;

  const collapse = (client: HTMLElement) => {
    const targetHeight = 52
    collapseAnimation = animate(client, {
      height: [client.getBoundingClientRect().height, targetHeight],
      duration: 400,
      ease: eases.inOutQuad,
    })
  }

  const expand = (client: HTMLElement) => {
    const startHeight = 52;
    client.style.height = 'auto';
    const targetHeight = client.getBoundingClientRect().height;
    client.removeAttribute('style');
    expandAnimation = animate(client, {
      height: [startHeight, targetHeight],
      duration: 400,
      ease: eases.inOutQuad,
    })
  }

  $('.clients').addEventListener('click', ({ target }) => {
    if (window.innerWidth > 1020) return;
    assertIsHTMLElement(target)
    const trigger = target.closest('.client__name')
    if (!(trigger instanceof HTMLElement)) return;
    const client = trigger.parentElement!;
    if (client.classList.contains('expanded')) {
      collapse(client);
      client.classList.remove('expanded');
      return;
    }
    if ($('.client.expanded')) {
      collapse($('.client.expanded'));
      $('.client.expanded').classList.remove('expanded');
    }
    client.classList.add('expanded');
    expand(client);
  });
  const resize = _.debounce(() => {
    if (window.innerWidth > 1020) {
      if (expandAnimation) {
        expandAnimation.cancel()
      }
      if (collapseAnimation) {
        collapseAnimation.cancel()
      }
      if ($('.client.expanded')) {
        $('.client.expanded').removeAttribute('style');
        $('.client.expanded').classList.remove('expanded');
      }

    }
  }, 400)
  window.addEventListener('resize', resize);
  scroll.on('scroll', ({ currentElements }) => {
    const _1rem = get1Rem();
    const mask = $('.clients-box__mask');
    if (currentElements['clients']) {
      const el = currentElements['clients'];
      if (currentElements['clients-mask']) {
        if (window.innerWidth >= 1920) {
          mask.scrollTop = mask.scrollHeight * (currentElements['clients-mask'].progress * window.clientMaskCoeff1920);
        } else {
          mask.scrollTop = mask.scrollHeight * (currentElements['clients-mask'].progress * window.clientMaskCoeff1440);
        }
      } else {
        if (el.progress < 0.5) {
          mask.scrollTop = 0;
        } else {
          mask.scrollTop = mask.scrollHeight - _1rem * 148;
        }
      }
    }
    if (currentElements['services-container']) {
      mask.scrollTop = mask.scrollHeight;
    }
    const clients = $$('.client:not(.client--fake)');
    const clientsInViewport = [];
    for (let i = 5; i < clients.length; i++) {
      const x = clients[i];
      if (x.getBoundingClientRect().top > 350) {
        clientsInViewport.push(x)
      }
    }
    const clientInViewport = clientsInViewport[0];
    if (clientInViewport) {
      $$('.client').forEach(x => x.classList.remove('hovered'));
      clientInViewport.classList.add('hovered');
      const index = clientInViewport.getAttribute('data-client')!;
      $$(`.clients-box__img img:not([data-client="${index}"])`).forEach(x => x.classList.remove('show'));
      const img = $(`.clients-box__img [data-client="${index}"]`);
      if (img) showImage(img, +index)
    }
  });

  const animations: Map<number, JSAnimation> = new Map();
  let zIndex = 1;
  let previousIndex: number;
  // let timeout: NodeJS.Timeout;

  const showImage = (img: HTMLElement, index: number) => {
    if (img.classList.contains('show')) return;
    // if (timeout) {
    //   clearTimeout(timeout);
    // }
    if (typeof previousIndex === 'number') {
      animations.get(previousIndex)?.cancel();
      const prevImg = $(`.clients-box__img [data-client="${previousIndex}"]`);
      animations.set(previousIndex, animate(prevImg, {
        opacity: [1, 0],
        ease: eases.inOutQuad,
        duration: 100,
      }));
    }
    const animation = animations.get(index);
    if (animation) {
      animation.cancel();
    }
    img.style.filter = 'none';
    animations.set(index, animate(img, {
      opacity: [0, 1],
      ease: eases.inOutQuad,
      duration: 100,
    }));
    img.classList.add('show');
    img.style.zIndex = `${++zIndex}`
    previousIndex = index;
  }
}