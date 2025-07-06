import { $, $$ } from "$lib/dom-helper";
import { scroll } from "./scroll"
import { extrapolate } from "./utils";

export const addServicesEventListeners = () => {
  // get the title height
  // get the services height
  // get the service height
  // start of service 1 animation = title height / services height <- progress
  // end of service 1 animation = (title height + service 1 height) / services height <- progress

  const servicesHeight = $('.services').offsetHeight;
  const titleHeight = $('.services__title-box').offsetHeight
  const service0Height = $$('.service-box')[0].offsetHeight
  const service1Height = $$('.service-box')[1].offsetHeight
  const service2Height = $$('.service-box')[2].offsetHeight
  const service3Height = $$('.service-box')[3].offsetHeight
  const endOfService0Animation = (titleHeight / 2) / servicesHeight;
  const endOfService1Animation = (titleHeight / 2 + service0Height) / servicesHeight;
  const endOfService2Animation = (titleHeight / 2 + service0Height + service1Height) / servicesHeight;
  const endOfService3Animation = (titleHeight / 2 + service0Height + service1Height + service2Height) / servicesHeight;
  const endOfService4Animation = (titleHeight / 2 + service0Height + service1Height + service2Height + service3Height) / servicesHeight;
  scroll.on('scroll', ({ currentElements }) => {
    return;
    const el = currentElements['services-title'];
    const services = $$('.service-box')
    if (!el) return;
    const { progress } = el;
    if (!progress) return
    moveService({
      progress,
      distance: titleHeight,
      endOfAnimation: endOfService0Animation,
      service: services[0],
      totalHeight: servicesHeight,
    });

    moveService({
      progress,
      distance: titleHeight + service0Height,
      endOfAnimation: endOfService1Animation,
      service: services[1],
      totalHeight: servicesHeight,
    });

    moveService({
      progress,
      distance: titleHeight + service0Height + service1Height,
      endOfAnimation: endOfService2Animation,
      service: services[2],
      totalHeight: servicesHeight,
    });

    moveService({
      progress,
      distance: titleHeight + service0Height + service1Height + service2Height,
      endOfAnimation: endOfService3Animation,
      service: services[3],
      totalHeight: servicesHeight,
    });

    moveService({
      progress,
      distance: titleHeight + service0Height + service1Height + service2Height + service3Height,
      endOfAnimation: endOfService4Animation,
      service: services[4],
      totalHeight: servicesHeight,
    });

  })
}

interface MoveServiceProps {
  progress: number
  totalHeight: number
  distance: number
  endOfAnimation: number
  service: HTMLElement
}

const moveService = ({
  progress,
  distance,
  endOfAnimation,
  service,
  totalHeight,
}: MoveServiceProps) => {
  const _progress = extrapolate(0, endOfAnimation, progress, distance);
  service.style.transform = `translateY(calc(${-Math.min(_progress, endOfAnimation * totalHeight)}px))`
}