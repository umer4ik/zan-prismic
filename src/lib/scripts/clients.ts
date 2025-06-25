import { animate, eases, JSAnimation } from "animejs";
import { $, $$, assertIsHTMLElement } from "../dom-helper"
import _ from "lodash";

export const handleClients = () => {
  $('.clients').addEventListener('mouseover', ({ target }) => {
    if (window.innerWidth > 1020) {
      assertIsHTMLElement(target)
      const trigger = target.closest('.client');
      if (!trigger) return;
      $$('.client').forEach(x => x.classList.remove('hovered'));
      trigger.classList.add('hovered');
      const index = trigger.getAttribute('data-client')!;

      $$('.clients-box__img img').forEach(x => x.classList.remove('show'));
      const img = $(`.clients-box__img [data-client="${index}"]`);
      
      img.classList.add('show');
    }
  });

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
}