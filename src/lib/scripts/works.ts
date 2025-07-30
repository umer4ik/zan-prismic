import { type AnimatableObject, createAnimatable, type RenderableCallbacks } from "animejs";
import { $, $$ } from "../dom-helper";
import { scroll } from "./scroll";
import { lerp } from "./utils";

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
    x: 150,
    y: 150,
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
  // $$('[data-work-reference]').forEach(x => {
  //   x.addEventListener('mouseover', ({ currentTarget }) => {
  //     if (!(currentTarget instanceof HTMLElement)) return;
  //     showArrow();
  //   });
  //   x.addEventListener('mouseenter', ({ currentTarget }) => {
  //     if (!(currentTarget instanceof HTMLElement)) return;
  //     showArrow();
  //   });
  //   x.addEventListener('mouseleave', ({ currentTarget }) => {
  //     if (!(currentTarget instanceof HTMLElement)) return;
  //     hideArrow();
  //   })
  // });

  // const handle = ({ target }: MouseEvent) => {
  //   if (!(target instanceof HTMLElement)) return;
  //   const trigger = target.closest('[data-work-reference]');
  //   if (trigger instanceof HTMLElement) {
  //     showArrow();
  //   } else {
  //     hideArrow();
  //   }
  // }

  // document.body.addEventListener('mousemove', handle)
  // document.body.addEventListener('mouseover', handle)
  // document.body.addEventListener('mouseleave', handle)

  const showArrow = () => {
    arrow!.classList.add('show');
    // document.body.style.cursor = 'none'
  }
  const hideArrow = () => {
    arrow!.classList.remove('show');
    // document.body.style.cursor = 'unset'
  }

  const isInBounds = ({
    x,
    y,
  }: {
    x: number,
    y: number,
  }, outer: HTMLElement | null) => {
    if (!outer) return false;
    const _outer = outer.getBoundingClientRect();
    return y > _outer.top && y < _outer.bottom && x > _outer.left && x < _outer.right
  }

  const blocks = Array.from($$('.w-table [data-work-reference], .work[data-work-reference], .mwf[data-work-reference]'));

  const check = () => {
    if (arrow && animatable) {
      if (blocks.some(block => isInBounds({
        x: animatable.x() as number,
        y: animatable.y() as number
      }, block))) {
        showArrow();
      } else {
        hideArrow();
      }
    }
    requestAnimationFrame(check)
  };
  check();

  const works = $$('.work');
  let min = -100;
  let max = 100;
  const updateMinMax = () => {
    min = -100;
    max = 100;
    if (window.innerWidth <= 1440) {
      min = -30;
      max = 30;
    }
  }
  updateMinMax();
  window.addEventListener('resize', updateMinMax);


  scroll.on('scroll', ({ currentElements }) => {
    if (currentElements['mwf']) {
      const progress = currentElements['mwf'].progress;
      const y = lerp(progress, 1, min, max);
      const transform = `scale(1.1) translateY(${-y}px)`;
      $('.mwf__content img').style.transform = transform;
    };
    for (let index = 0; index < works.length; index++) {
      const work = works[index];
      if (currentElements[`work-${index}`]) {
        const progress = currentElements[`work-${index}`].progress;
        const y = lerp(progress, 1, min, max);
        const transform = `scale(1.1) translateY(${-y}px)`;
        work.querySelector('img')!.style.transform = transform;
      }
    }
  });
}