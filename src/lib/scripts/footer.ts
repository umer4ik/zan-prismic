import matterjs, { type Body as BodyType } from 'matter-js';
import { $, $$, assertIsHTMLElement } from '../dom-helper';
import _ from "lodash";
import { scroll } from './scroll';
const { debounce, random } = _
const {
  Engine,
  Render,
  Runner,
  Bodies,
  Composite,
  Mouse,
  // MouseConstraint,
  Body,
} = matterjs;

const BOX_WIDTH = 16;

export const handleFooter = () => {
  $('.footer').addEventListener('mousedown', ({ target }) => {
    assertIsHTMLElement(target)
    if (target.tagName.toLowerCase() === 'canvas') {
      $$('.footer__row').forEach(x => {
        x.style.pointerEvents = 'none';
      })
    }
  });
  $('.footer').addEventListener('mouseup', ({ target }) => {
    assertIsHTMLElement(target)
    if (target.tagName.toLowerCase() === 'canvas') {
      $$('.footer__row').forEach(x => {
        x.style.pointerEvents = 'all';
      })
    }
  });
  const renderIt = () => {
    const engine = Engine.create({
      gravity: {
        y: 0.4
      }
    });

    let canvasBox = $('.footer__canvas-box');
    if (canvasBox) {
      canvasBox.remove()
    }
    canvasBox = document.createElement('div');
    canvasBox.className = 'footer__canvas-box';
    $('.footer').appendChild(canvasBox);
    const width = canvasBox.getBoundingClientRect().width;
    const height = canvasBox.getBoundingClientRect().height;
    // create a renderer
    const render = Render.create({
      element: canvasBox,
      options: {
        width,
        height,
        background: 'transparent',
        wireframes: false,
        showInternalEdges: false,
        pixelRatio: 2,
      },
      engine: engine
    });

    // create two boxes and a ground
    const boxA = Bodies.rectangle(400, 200, 80, 80, {
      // speed: 1.1
    });
    boxA.render.fillStyle = '#D5C291'
    const boxB = Bodies.rectangle(600, 50, 80, 80, {
      // torque: -3
      force: {
        x: 0,
        y: 0.1,
      }
    });
    boxB.render.fillStyle = '#D5C291'


    const mouse = Mouse.create(render.canvas);

    // @ts-expect-error asdf
    mouse.element.removeEventListener('wheel', mouse.mousewheel);
    // @ts-expect-error asdf
    mouse.element.removeEventListener('DOMMouseScroll', mouse.mousewheel);
    // const mouseConstraint = MouseConstraint.create(engine, {
    //   mouse,
    //   constraint: {
    //     stiffness: 0.2,
    //     render: {
    //       visible: false
    //     }
    //   }
    // });

    const generateWalls = () => {
      const ceiling = Bodies.rectangle(width / 2, 0, width, 1, {
        isStatic: true,
      });
      const leftWall = Bodies.rectangle(0, height / 2, 1, height, {
        isStatic: true,
      });
      const rightWall = Bodies.rectangle(width - 1, height / 2, 1, height, {
        isStatic: true,
      });
      const ground = Bodies.rectangle(width / 2, height, width, 1, {
        isStatic: true,
      });
      const walls = [
        ceiling, rightWall, ground, leftWall
      ];
      walls.forEach(wall => {
        wall.render.fillStyle = '#33092E';
        wall.render.strokeStyle = '#33092E';
      });
      return walls;
    }

    const generateBoxes = (n: number) => {
      const boxes: BodyType[] = [];
      for (let i = 0; i < n; i++) {
        const box = Bodies.rectangle(random(20, width), 50, BOX_WIDTH, BOX_WIDTH, {
          torque: random(-0.01, 0.01, true),
          force: {
            x: 0,
            y: random(0.0007, 0.002),
          }
        });
        box.render.fillStyle = '#D5C291';
        boxes.push(box)
      }
      return boxes;
    }

    const getBoxesCount = (numberOfLayers = 3) => {
      return Math.floor(canvasBox.clientWidth / BOX_WIDTH * numberOfLayers);
    }

    const boxes = generateBoxes(getBoxesCount(2));

    // add all of the bodies to the world
    Composite.add(engine.world, [...boxes, ...generateWalls(),]);



    // run the renderer
    Render.run(render);

    // create runner
    const runner = Runner.create();

    const cursor = {
      mouseX: -1000,
      mouseY: -1000
    }

    $('.footer').addEventListener('mousemove', (e) => {
      const rect = render.canvas.getBoundingClientRect();
      cursor.mouseX = e.clientX - rect.left;
      cursor.mouseY = e.clientY - rect.top;
    });

    $('.footer').addEventListener('touchstart', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const rect = render.canvas.getBoundingClientRect();
      const touch = e.touches[0];
      cursor.mouseX = touch.clientX - rect.left;
      cursor.mouseY = touch.clientY - rect.top;
    });
    $('.footer').addEventListener('touchmove', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const rect = render.canvas.getBoundingClientRect();
      const touch = e.touches[0];
      cursor.mouseX = touch.clientX - rect.left;
      cursor.mouseY = touch.clientY - rect.top;
    });

    $('.footer').addEventListener('mouseleave', () => {
      cursor.mouseX = -1000;
      cursor.mouseY = -1000;
    });

    const forceRadius = 100;
    const forceStrength = forceRadius / 55000;

    const applyForceField = () => {
      if (cursor.mouseX < 0 || cursor.mouseY < 0) return;
      boxes.forEach(box => {
        const bodyPos = box.position;
        const dx = bodyPos.x - cursor.mouseX;
        const dy = bodyPos.y - cursor.mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < forceRadius && distance > 0) {
          const force = (forceRadius - distance) / forceRadius;
          const forceX = (dx / distance) * force * forceStrength;
          const forceY = (dy / distance) * force * forceStrength;

          Body.applyForce(box, bodyPos, { x: forceX, y: forceY });

          // Ефект свічення
          // box.glowIntensity = Math.min(force * 2, 1);

          // Обертання при впливі сили
          const torque = (Math.random() - 0.5) * force * 0.01;
          Body.setAngularVelocity(box, box.angularVelocity + torque);
        } else {
          // box.glowIntensity *= 0.95;
        }
      });
    }
    const frame = () => {
      applyForceField();
      requestAnimationFrame(frame)
    }

    requestAnimationFrame(frame)

    Runner.run(runner, engine);
  }

  let run = false;
  // run the engine

  scroll.on('scroll', ({ currentElements }) => {
    if (currentElements['footer']?.progress > 0.1) {
      runIt()
    }
  });
  scroll.on('scroll', ({ currentElements }) => {
    if (currentElements['footer-full']) {
      const opacity = 1 - currentElements['footer-full'].progress - 0.5
      $('.footer-curtain').style.opacity = (opacity < 0 ? 0 : opacity) + '';
    }
  })
  const runIt = () => {
    if (!run) {
      run = true;
      renderIt();
    }
  };
  window.addEventListener('resize', debounce(() => {
    renderIt();
  }, 400));
}
