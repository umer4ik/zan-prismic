import { type AnimatableObject, createAnimatable, type RenderableCallbacks } from "animejs";
import {  $, $$ } from "../dom-helper";
import { scroll } from "./scroll";

type Animations = Record<string, RenderableCallbacks<never>>
let arrow: HTMLElement | null = null;
let animatable: AnimatableObject;

const updateTransform = ({
  x,
  y,
}: {
  x?: number,
  y?: number,
}) => {
  if (typeof x === 'number') {
    document.documentElement.style.setProperty('--cursor-x', `${x / window.innerWidth}`)
  }
  if (typeof y === 'number') {
    document.documentElement.style.setProperty('--cursor-y', `${y / window.innerHeight}`)
  }
}

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
    updateTransform({
      x
    })
  };

  (animatable.animations as Animations).y.onRender = () => {
    // if (!shouldAnimate) return;
    const y = animatable!.y();
    if (typeof y !== 'number') return;
    if (!arrow) return;
    updateTransform({
      y
    });
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
  arrow = $('#arrow-btn');
  $$('.work, .mwf').forEach(x => {
    x.addEventListener('mouseenter', ({ currentTarget }) => {
      if (!(currentTarget instanceof HTMLElement)) return;
      showArrow();
    });
    x.addEventListener('mouseleave', ({ currentTarget }) => {
      if (!(currentTarget instanceof HTMLElement)) return;
      hideArrow();
    })
  });

  const showArrow = () => {
    arrow!.classList.add('show');
    document.body.style.cursor = 'none'
  }
  const hideArrow = () => {
    arrow!.classList.remove('show');
    document.body.style.cursor = 'unset'
  }

  const isInBounds = (inner: HTMLElement | null, outer: HTMLElement | null) => {
    if (!inner || !outer) return false;
    const _inner = inner.getBoundingClientRect();
    const _outer = outer.getBoundingClientRect();
    return _inner.top > _outer.top && _inner.bottom < _outer.bottom && _inner.left > _outer.left && _inner.right < _outer.right
  }

  scroll.on('scroll', () => {
    if (!arrow) return;
    const [work1, work2] = $$('.work');
    if (isInBounds(arrow, $('.mwf')) || isInBounds(arrow, work1) || isInBounds(arrow, work2)) {
      showArrow();
    } else {
      hideArrow();
    }
  })

}