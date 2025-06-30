import matterjs, { type Body } from 'matter-js';
import { $, $$, assertIsHTMLElement } from '../dom-helper';
import _ from "lodash";
const { debounce, random } = _
const {
  Engine,
  Render,
  Runner,
  Bodies,
  Composite,
  Mouse,
  MouseConstraint,
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
        y: 0.3
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
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    });

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
      const boxes: Body[] = [];
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

    // add all of the bodies to the world
    Composite.add(engine.world, [mouseConstraint, ...generateBoxes(getBoxesCount(3)), ...generateWalls(), ]);

    
    // @ts-expect-error asdf
    mouse.element.removeEventListener('wheel', mouse.mousewheel);
    // @ts-expect-error asdf
    mouse.element.removeEventListener('DOMMouseScroll', mouse.mousewheel);

    // run the renderer
    Render.run(render);

    // create runner
    const runner = Runner.create();
    
    Runner.run(runner, engine);
  }
  
  let run = false;
  // run the engine

  addEventListener('scroll', () => {
    runIt()
  });
  const runIt = () => {
    const footerOffset = $('.footer').offsetTop;
    // if (footerOffset - currentTarget.scrollY)
    if (footerOffset - window.scrollY < window.innerHeight && !run) {
      run = true;
      renderIt();
    }
  };
  runIt();
  window.addEventListener('resize', debounce(() => { 
    renderIt();
  }, 400));
}
