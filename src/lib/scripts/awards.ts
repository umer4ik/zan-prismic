import { animate, eases, JSAnimation } from "animejs";
import { $, $$, assertIsHTMLElement } from "../dom-helper";
import _ from "lodash";


// type Animations = Record<string, RenderableCallbacks<never>>

// const follower = $('.awards-follower');
// let shouldAnimate = false;
// let animatable: AnimatableObject;

// const makeAnimatable = (x: number, y: number) => {
//   const cursor = {
//     x,
//     y,
//   };
//   const animatable = createAnimatable(cursor, {
//     x: 700,
//     y: 700,
//     ease: 'out(3)',
//   });
//   (animatable.animations as Animations).x.onRender = () => {
//     if (!shouldAnimate) return;
//     const x = animatable!.x();
//     if (typeof x !== 'number') return;
//     follower.style.left = `${x - follower.getBoundingClientRect().width / 2}px`;
//   };

//   (animatable.animations as Animations).y.onRender = () => {
//     if (!shouldAnimate) return;
//     const y = animatable!.y();
//     if (typeof y !== 'number') return;
//     follower.style.top = `${y - follower.getBoundingClientRect().height / 2}px`;
//   };
//   return animatable;
// }

export const handleAwards = () => {
  // $('.awards').addEventListener('mouseenter', () => {
  //   shouldAnimate = true;
  // })
  // const recordCursorPosition = (e: MouseEvent) => {
  //   if (!animatable) {
  //     animatable = makeAnimatable(e.clientX, e.clientY);
  //   }
  //   animatable.x(e.clientX);
  //   animatable.y(e.clientY);
  // }
  // document.body.addEventListener('mousemove', recordCursorPosition);
  // $('.awards').addEventListener('mouseleave', () => {
  //   shouldAnimate = false;
  //   const hoveredRow = $('.award-row.hovered');
  //   if (hoveredRow) {
  //     hoveredRow.classList.remove('hovered');
  //     follower.classList.remove('visible');
  //   }
  // });
  // $('.awards-table').addEventListener('mouseover', (e) => {
  //   if (window.innerWidth < 768) return;
  //   const { target } = e;
  //   if (!(target instanceof HTMLElement)) return;
  //   const el = target.closest('.award-row');
  //   if (!el) return;
  //   assertIsHTMLElement(el);
  //   $$('.award-row').forEach(x => {
  //     x.classList.remove('hovered');
  //   });
  //   showFollower();
  //   const index = el.getAttribute('data-award');
  //   if (!index) return;
  //   const shownImg = follower.querySelector(`img.show:not([data-award="${index}"])`);
  //   if (shownImg) {
  //     shownImg.classList.remove('show');
  //   }
  //   follower.querySelector(`img[data-award="${index}"]`)!.classList.add('show');
  //   el.classList.add('hovered');
  // });
  // $('.awards-table').addEventListener('mouseleave', () => {
  //   hideFollower();
  // });
  // window.addEventListener('scroll', () => {
  //   if (window.innerWidth <= 1024) {
  //     if (follower.classList.contains('visible')) {
  //       hideFollower();
  //     }
  //   }
  // });

  let collapseAnimation: JSAnimation;
  let expandAnimation: JSAnimation;

  const collapse = (row: HTMLElement) => {
    const targetHeight = 52
    collapseAnimation = animate(row, {
      height: [row.getBoundingClientRect().height, targetHeight],
      duration: 400,
      ease: eases.inOutQuad,
    })
  }

  const expand = (row: HTMLElement) => {
    const startHeight = 52;
    row.style.height = 'auto';
    const targetHeight = row.getBoundingClientRect().height;
    row.removeAttribute('style');
    expandAnimation = animate(row, {
      height: [startHeight, targetHeight],
      duration: 400,
      ease: eases.inOutQuad,
    })
  }

  $('.awards-table').addEventListener('click', ({ target }) => {
    if (window.innerWidth >= 768) return;
    assertIsHTMLElement(target);
    const row = target.closest('.award-row:not(.award-row--head)');
    if (!row) return;
    assertIsHTMLElement(row);
    if (row.classList.contains('expanded')) {
      collapse(row)
      row.classList.remove('expanded');
      return;
    }
    if ($('.award-row.expanded')) {
      collapse($('.award-row.expanded'));
      $('.award-row.expanded').classList.remove('expanded');
    }
    row.classList.add('expanded');
    expand(row);
  });

  const resize = _.debounce(() => {
    if (window.innerWidth >= 768) {
      if (expandAnimation) {
        expandAnimation.cancel()
      }
      if (collapseAnimation) {
        collapseAnimation.cancel()
      }
      $$('.award-row').forEach(x => x.removeAttribute('style'));
      if ($('.award-row.expanded')) {
        $('.award-row.expanded').classList.remove('expanded');
      }
    }
  }, 400);
  window.addEventListener('resize', resize);
}

// const showFollower = () => {
//   follower.classList.add('visible');
// }
// const hideFollower = () => {
//   follower.classList.remove('visible');
// }
