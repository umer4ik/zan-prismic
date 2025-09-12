import { animate, eases, JSAnimation } from "animejs";
import { $, assertIsHTMLElement, $$ } from "../dom-helper"
import _ from "lodash";
import { scroll } from "./scroll";
// import { clamp, lerp2, range } from "./utils";

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
  // const title = $('.title--clients');
  // const frame = () => {
  //   if (window.innerWidth <= 1024) return;
  //   // find the closest client to the title top
  //   const clients = $$('.client:not(.client--fake)');
  //   let closestClient: HTMLElement | null = null;
  //   let closestDistance = Infinity;
  //   clients.forEach(client => {
  //     const distance = Math.abs(client.getBoundingClientRect().top - title.getBoundingClientRect().top);
  //     if (distance < closestDistance) {
  //       closestDistance = distance;
  //       closestClient = client;
  //     }
  //   });
  //   if (closestClient) {
  //     // closestClient.textContent = closestDistance.toFixed(2);
  //     // @ts-expect-error sasay
  //     // closestClient.style.transform = `translateX(50px)`;
  //     closestClient.style.transform = `translateX(${clamp(range(0, 45, 50, 0, closestDistance), 0, 50)}px)`;
  //   }
  //   $$('.client').forEach((client) => {
  //     if (client !== closestClient) {
  //       client.style.transform = 'translateX(0)';
  //     }
  //   });
  //   $$('.client').forEach((client, index) => {
  //     if (client !== closestClient) return;
  //     client.style.opacity = '1';
  //     setOpacityIf($$('.client').item(index - 5), '0.04');
  //     setOpacityIf($$('.client').item(index - 4), '0.07');
  //     setOpacityIf($$('.client').item(index - 3), '0.1');
  //     setOpacityIf($$('.client').item(index - 2), '0.2');
  //     setOpacityIf($$('.client').item(index - 1), '0.3');
  //     // setTransformIf($$('.client').item(index - 1), 'translateX(5px)');
  //     // setTransformIf($$('.client').item(index + 1), 'translateX(5px)');
  //     setOpacityIf($$('.client').item(index + 1), '0.3');
  //     setOpacityIf($$('.client').item(index + 2), '0.2');
  //     setOpacityIf($$('.client').item(index + 3), '0.1');
  //     setOpacityIf($$('.client').item(index + 4), '0.07');
  //     setOpacityIf($$('.client').item(index + 5), '0.04');
  //   });
  //   requestAnimationFrame(frame);
  // }
  // requestAnimationFrame(frame);
  const setOpacityIf = (el?: HTMLElement, value?: string) => {
    if (el && value) {
      el.style.opacity = value;
    }
  }
  // const setTransformIf = (el?: HTMLElement, value?: string) => {
  //   if (el && value) {
  //     el.style.transform = value;
  //   }
  // }
  const mask = $('.clients-box__mask');
  const maskClientHeight = mask.querySelector('.client:nth-child(2)')!.getBoundingClientRect().height;
  scroll.on('scroll', ({ currentElements }) => {
    const box = currentElements['clients-box'];
    if (box) {
      const clients = box.el.querySelectorAll('.clients-box__list > .client');
      const currentClient = Array.from(clients).find(client => {
        const rect = client.getBoundingClientRect();
        return rect.top >= 0;
      }) ?? $('.clients-box__list > .client[data-last]');
      const inMaskClient = mask.querySelector(`[data-client="${currentClient?.getAttribute('data-client')}"]`);
      mask.querySelectorAll('.client').forEach(x => {
        if (!inMaskClient) return;
        if (inMaskClient !== x) x.classList.remove('hovered');
      });
      if (currentClient) {
        const dataClient = currentClient.getAttribute('data-client')
        if (typeof dataClient === 'string') {
          const scrollTop = (+dataClient) * maskClientHeight;
          animate(mask, {
            scrollTop: [mask.scrollTop, scrollTop],
            duration: 300,
            easing: 'easeInOutQuad',
          })
          const img = $(`.clients-box__img [data-client="${dataClient}"]`);
          if (img) {
            $$(`.clients-box__img img:not([data-client="${dataClient}"])`).forEach(x => x.classList.remove('show'))
            showImage(img, +dataClient);
          }
          setOpacityIf($(`.clients-box__mask .client[data-client="${+dataClient - 5}"]`), '0.04');
          setOpacityIf($(`.clients-box__mask .client[data-client="${+dataClient - 4}"]`), '0.07');
          setOpacityIf($(`.clients-box__mask .client[data-client="${+dataClient - 3}"]`), '0.1');
          setOpacityIf($(`.clients-box__mask .client[data-client="${+dataClient - 2}"]`), '0.2');
          setOpacityIf($(`.clients-box__mask .client[data-client="${+dataClient - 1}"]`), '0.3');
          setOpacityIf($(`.clients-box__mask .client[data-client="${+dataClient}"]`), '1');
          setOpacityIf($(`.clients-box__mask .client[data-client="${+dataClient + 1}"]`), '0.3');
          setOpacityIf($(`.clients-box__mask .client[data-client="${+dataClient + 2}"]`), '0.2');
          setOpacityIf($(`.clients-box__mask .client[data-client="${+dataClient + 3}"]`), '0.1');
          setOpacityIf($(`.clients-box__mask .client[data-client="${+dataClient + 4}"]`), '0.07');
          setOpacityIf($(`.clients-box__mask .client[data-client="${+dataClient + 5}"]`), '0.04');
          inMaskClient?.classList.add('hovered');
        }
      }
      // const findClientIndexByProgress = (progress: number) => {
      //   return Math.floor(progress / oneClientTime);
      // }
      // const findClientByProgress = (progress: number) => {
      //   const clientIndex = findClientIndexByProgress(progress);
      //   return $$('.client').item(clientIndex);
      // };
      // const progress = box.progress;
      // const activeClient = findClientByProgress(progress)
      // const start = findClientIndexByProgress(progress) * oneClientTime;
      // const end = start + oneClientTime;
      // activeClient.style.transform = `translateX(${lerp2(0, 40, range(start, end, 0, 1, progress))}px)`


      // console.log(box.el.offsetHeight)
      // console.log(($$('.client').length - 1) * $('.client').offsetHeight)
    }
    // if (currentElements['clients']) {
    //   const mask = $('.clients-box__mask');
    //   const target = $('.client:not(.client--fake)[data-client="0"]');
    //   console.log(mask.getBoundingClientRect().top - target.getBoundingClientRect().top)
    //   mask.scrollTop = mask.getBoundingClientRect().top - target.getBoundingClientRect().top;
    // }
    // if (currentElements['services-container']) {
    //   mask.scrollTop = mask.scrollHeight;
    // }
    // const clients = $$('.client:not(.client--fake)');
    // const clientsInViewport = [];
    // for (let i = 5; i < clients.length; i++) {
    //   const x = clients[i];
    //   if (x.getBoundingClientRect().top > 350) {
    //     clientsInViewport.push(x)
    //   }
    // }
    // const clientInViewport = clientsInViewport[0];
    // if (clientInViewport) {
    // $$('.client').forEach(x => x.classList.remove('hovered'));
    // clientInViewport.classList.add('hovered');
    // const index = clientInViewport.getAttribute('data-client')!;
    // $$(`.clients-box__img img:not([data-client="${index}"])`).forEach(x => x.classList.remove('show'));
    // const img = $(`.clients-box__img [data-client="${index}"]`);
    // if (img) showImage(img, +index)
    // }
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