import { $ } from "$lib/dom-helper";
import { scroll } from "./scroll"
import { lerp } from "./utils";

export const addServicesEventListeners = () => {
  // get the title height
  // get the services height
  // get the service height
  // start of service 1 animation = title height / services height <- progress
  // end of service 1 animation = (title height + service 1 height) / services height <- progress

  const title = $('.services__title')

  scroll.on('scroll', ({ currentElements }) => {
    if (title.getBoundingClientRect().top < window.innerHeight && !title.classList.contains('show')) {
      title.classList.add('show')
    }
    if (currentElements['services-title']) {
      const progress = currentElements['services-title']!.progress
      const transformY = -lerp(1 - progress, 1, 0, 250);
      console.log(transformY)
      for (let i = 0; i <= 4; i++) {
        const service = $(`[data-scroll-id="service-${i}"]`);
        (service.querySelector('.service-box') as HTMLElement).style.transform = `translateY(${transformY}px)`;
      }
    }
  })
}

// interface MoveServiceProps {
//   progress: number
//   totalHeight: number
//   distance: number
//   endOfAnimation: number
//   service: HTMLElement
// }

// const moveService = ({
//   progress,
//   distance,
//   endOfAnimation,
//   service,
//   totalHeight,
// }: MoveServiceProps) => {
//   const _progress = extrapolate(0, endOfAnimation, progress, distance);
//   service.style.transform = `translateY(calc(${-Math.min(_progress, endOfAnimation * totalHeight)}px))`
// }