import { type AnimatableObject, createAnimatable, type RenderableCallbacks } from "animejs";
import { $$ } from "../dom-helper";

type Animations = Record<string, RenderableCallbacks<never>>
let arrow: HTMLElement | null = null;
let animatable: AnimatableObject;

const makeAnimatable = (x: number, y: number) => {
  const cursor = {
    x,
    y,
  };
  const animatable = createAnimatable(cursor, {
    x: 700,
    y: 700,
    ease: 'out(3)',
  });
  (animatable.animations as Animations).x.onRender = () => {
    // if (!shouldAnimate) return;
    const x = animatable!.x();
    if (typeof x !== 'number') return;
    if (!arrow) return;
    const parentEl = arrow.parentElement!;
    const offset = parentEl.getBoundingClientRect().left;
    arrow.style.left = `${-offset + x - arrow.getBoundingClientRect().width / 2}px`;
  };

  (animatable.animations as Animations).y.onRender = () => {
    // if (!shouldAnimate) return;
    const y = animatable!.y();
    if (typeof y !== 'number') return;
    if (!arrow) return;
    const parentEl = arrow.parentElement!;
    const offset = parentEl.getBoundingClientRect().top;
    arrow.style.top = `${-offset + y - arrow.getBoundingClientRect().height / 2}px`;
  };
  return animatable;
}

export const handleWorks = () => {
  const recordCursorPosition = (e: MouseEvent) => {
    if (!animatable) {
      animatable = makeAnimatable(e.clientX, e.clientY);
    }
    animatable.x(e.clientX);
    animatable.y(e.clientY);
  }
  document.body.addEventListener('mousemove', recordCursorPosition);
  $$('.work__img').forEach(x => {
    x.addEventListener('mouseenter', ({ currentTarget }) => {
      if (!(currentTarget instanceof HTMLElement)) return;
      arrow = currentTarget.querySelector('.arrow-btn')!;
      arrow.classList.add('show');
    });
    x.addEventListener('mouseleave', ({ currentTarget }) => {
      if (!(currentTarget instanceof HTMLElement)) return;
      arrow = currentTarget.querySelector('.arrow-btn')!;
      arrow.classList.remove('show');
    })
  })
}