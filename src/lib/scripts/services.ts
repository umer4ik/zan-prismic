import { $ } from "$lib/dom-helper";
import { animate, eases } from "animejs";
import { scroll } from "./scroll"
import { lerp } from "./utils";
import { stagger } from "animejs";

export const addServicesEventListeners = () => {

  const title = $('.services__title')

  scroll.on('scroll', ({ currentElements }) => {
    if (title.getBoundingClientRect().top < window.innerHeight && !title.classList.contains('show')) {
      title.classList.add('show')
      animate('.services__title .split-text__visible', {
        y: ['101%', 0],
        duration: 600,
        delay: stagger(110),
        ease: eases.outCirc,
      })
    }
    if (currentElements['services-title']) {
      const progress = currentElements['services-title']!.progress
      const transformY = -lerp(1 - progress, 1, 0, 250);
      for (let i = 0; i <= 4; i++) {
        const service = $(`[data-scroll-id="service-${i}"]`);
        (service.querySelector('.service-box') as HTMLElement).style.transform = `translateY(${transformY}px)`;
      }
    }
  })
}
