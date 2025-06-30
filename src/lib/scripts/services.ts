// import { animate, eases, JSAnimation } from "animejs";
import { $$ } from "../dom-helper"
// import _ from "lodash";
// import gsap from 'gsap';
// import { lenis } from "./scroll";
// import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
// const { debounce } = _;
// gsap.registerPlugin(ScrollTrigger)

export const addServicesEventListeners = () => {
  // $('.services').addEventListener('click', ({ target }) => {
  //   if (window.innerWidth > 768) return;
  //   assertIsHTMLElement(target);
  //   const trigger = target.closest('.service');
  //   if (!trigger || trigger.classList.contains('hovered')) return;
  //   assertIsHTMLElement(trigger);
  //   if ($('.service.hovered')) {
  //     collapse($('.service.hovered'));
  //     $('.service.hovered').classList.remove('hovered');
  //   }
  //   trigger.classList.add('hovered');
  //   expand(trigger)
  // });

  // const resize = debounce(() => {
  //   // if (window.innerWidth > 768) {
  //   if (expandAnimation) {
  //     expandAnimation.cancel()
  //   }
  //   if (collapseAnimation) {
  //     collapseAnimation.cancel()
  //   }
  //   if ($('.service.expanded')) {
  //     $('.service.expanded').classList.remove('expanded');
  //   }
  //   $$('.service').forEach(x => x.removeAttribute('style'))
  //   // }
  // }, 400)
  // window.addEventListener('resize', resize);
 
  const initScrollTrigger = () => {
    ScrollTrigger.create({
      trigger: '.services__title-box',
      start: 'top top',
      pin: true,
      pinType: 'fixed',
    });
    $$('.service-box').forEach((service, i) => {
      if (i === 4) return
      ScrollTrigger.create({
        trigger: service,
        start: 'top top',
        pin: true,
        pinType: 'transform',
        pinSpacing: false,
        // markers: true,
        // onUpdate: ({ progress }) => {
        //   if (progress > 0.6) {
        //     const el = service.querySelector('.service');
        //     if (el instanceof HTMLElement) {
        //       el.style.transform = `scale(${1 - (progress - 0.6) / 10})`
        //       el.style.opacity = `${1 - (progress - 0.6) / 10}`
        //     }
            
        //   }
        // }
      });
    })
  }
  initScrollTrigger();
 
}

// let collapseAnimation: JSAnimation;
// let expandAnimation: JSAnimation;

// const getTargetHeight = () => {
//   const width = window.innerWidth;
//   if (width > 1200) return 120;
//   if (width <= 1200 && width > 1024) return 105;
//   if (width <= 1024 && width > 768) return 90;
//   return 70;
// }

// const collapse = (service: HTMLElement) => {
//   collapseAnimation = animate(service, {
//     height: [service.getBoundingClientRect().height, getTargetHeight()],
//     duration: 400,
//     ease: eases.inOutQuad,
//   })
// }

// const expand = (service: HTMLElement) => {
//   const startHeight = service.getBoundingClientRect().height;
//   service.style.height = 'auto';
//   const targetHeight = service.getBoundingClientRect().height;
//   service.removeAttribute('style');
//   expandAnimation = animate(service, {
//     height: [startHeight, targetHeight],
//     duration: 400,
//     ease: eases.inOutQuad,
//   })
// }