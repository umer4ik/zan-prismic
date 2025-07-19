import { $ } from "$lib/dom-helper";
import { scroll } from "./scroll"
import { lerp } from "./utils";

export const addServicesEventListeners = () => {

  const title = $('.services__title')

  scroll.on('scroll', ({ currentElements }) => {
    if (title.getBoundingClientRect().top < window.innerHeight && !title.classList.contains('show')) {
      title.classList.add('show')
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
