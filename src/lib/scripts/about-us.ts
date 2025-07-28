import { $ } from "$lib/dom-helper";
import { scroll } from "./scroll";
import { lerp } from "./utils";

export const handleAboutUs = () => {
  scroll.on('scroll', ({ currentElements }) => {
    if (currentElements['belief']) {
      const progress = currentElements['belief'].progress;
      const y = lerp(progress, 1, -80, 40);
      const transform = `scale(1.1) translateY(${-y}px)`;
      $('.about-us__belief-img-reel img').style.transform = transform;
    };
  });
}