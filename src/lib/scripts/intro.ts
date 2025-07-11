import { type AnimatableObject, createAnimatable, type RenderableCallbacks } from "animejs";
import {
  $,
} from "../dom-helper";
import GUI from "lil-gui";
import { browser } from "$app/environment";
import { scroll } from "./scroll";

interface KindaPoint {
  x: number,
  y: number,
  index: number,
  position: {
    x: number,
    y: number,
  }
}

const settings = {
  animate: true,
  debug: false,
  hoverAreaSize: browser ? window.innerWidth <= 1230 ? 150 : 23 : 9,
  rotate: true,
}

const intro: {
  animatable: null | AnimatableObject,
  debugShape: HTMLDivElement,
  hoverAreaSize: number,
  el: HTMLElement,
  debug: boolean,
  cursor: {
    x: number,
    y: number,
  },
  squares: HTMLDivElement[]
  shouldAnimate: boolean
  guiEnabled: boolean
  shouldRotate: boolean
  cursorInitialized: boolean
  appendDebugShape(): void
  handleMouseMove(e: MouseEvent | TouchEvent): void
  renderSquares(): void
  clearSquares(): void
  renderSquare(arg: {
    top: number,
    left: number,
    x: number,
    y: number,
    offset: number,
  }): HTMLDivElement
  initCursor(): void
  nearestPoint(points: KindaPoint[], x: number, y: number): KindaPoint
  enableGui(): void
  init(): void
} = {
  cursorInitialized: false,
  animatable: null,
  shouldAnimate: settings.animate,
  shouldRotate: settings.rotate,
  debugShape: browser ? document.createElement('div') : null as unknown as HTMLDivElement,
  hoverAreaSize: settings.hoverAreaSize,
  el: $('.squares'),
  debug: settings.debug,
  squares: [],
  cursor: {
    x: -settings.hoverAreaSize,
    y: -settings.hoverAreaSize,
  },
  guiEnabled: false,

  clearSquares() {
    this.squares.forEach(x => {
      this.el.removeChild(x)
    });
    this.squares = [];
  },

  renderSquares() {
    const width = this.el.offsetWidth;
    const height = this.el.offsetHeight;
    const distance = width < 1230 ? 26 : 42;
    const offset = width < 1230 ? 15 : 20;
    for (let i = 0; i < width; i = i + distance) {
      for (let j = 0; j < height; j = j + distance) {
        this.squares.push(this.renderSquare({
          top: j,
          left: i,
          x: i / distance,
          y: j / distance,
          offset
        }));
      }
    }
  },
  renderSquare({
    top,
    left,
    x,
    y,
    offset,
  }) {
    const square = document.createElement('div')
    square.innerHTML = '<div class="square__border"></div>'
    square.className = 'square';
    square.style.left = `${left + offset}px`;
    square.style.top = `${top + offset}px`;
    square.dataset.x = `${x}`
    square.dataset.y = `${y}`
    this.el.appendChild(square);
    return square;
  },

  appendDebugShape() {
    this.debugShape.className = 'debug-cursor';
    this.debugShape.style.width = `${this.hoverAreaSize}px`;
    this.debugShape.style.height = `${this.hoverAreaSize}px`;
    this.debugShape.style.left = `-${this.hoverAreaSize}px`;
    this.debugShape.style.top = `-${this.hoverAreaSize}px`;
    this.el.appendChild(this.debugShape);
  },

  handleMouseMove(e) {
    let x = 0;
    let y = 0;
    if (e instanceof MouseEvent) {
      x = e.clientX;
      y = e.clientY;
    } else if (e instanceof TouchEvent) {
      const touch = e.touches[0];
      x = touch.clientX;
      y = touch.clientY;
    }

    this.cursor = {
      x,
      y,
    };
    if (this.shouldAnimate && this.animatable) {
      this.animatable.x(x)
      this.animatable.y(y);
    }
    if (this.debug && !this.shouldAnimate) {
      this.debugShape.style.left = `${x - this.hoverAreaSize / 2}px`;
      this.debugShape.style.top = `${y - this.hoverAreaSize / 2}px`;
    }
  },

  initCursor() {
    this.cursorInitialized = true;
    // this.cursor = {
    //   x: window.innerWidth / 2 - 60,
    //   y: window.innerHeight / 2 - 60,
    // };
    this.animatable = createAnimatable(this.cursor, {
      x: 500,
      y: 500,
      ease: 'out(3)',
    });
    const animations = this.animatable.animations as Record<string, RenderableCallbacks<never>>
    animations.x.onRender = () => {
      const x = this.animatable!.x();
      if (typeof x !== 'number') return;
      this.debugShape.style.left = `${x - this.hoverAreaSize / 2}px`;
    };
    animations.y.onRender = () => {
      const y = this.animatable!.y();
      if (typeof y !== 'number') return;
      this.debugShape.style.top = `${y - this.hoverAreaSize / 2}px`;
    };
    this.appendDebugShape();
    if (!this.debug) {
      this.debugShape.style.opacity = '0';
    }
    document.body.addEventListener('touchmove', this.handleMouseMove);
    document.body.addEventListener('mousemove', this.handleMouseMove);
    const frame = () => {
      if (!this.animatable) return;
      const x = this.shouldAnimate ? this.animatable.x() : this.cursor.x;
      const y = this.shouldAnimate ? this.animatable.y() : this.cursor.y;
      if (typeof x !== 'number' || typeof y !== 'number') return;
      const points = this.squares.map((square, index) => {
        const rect = square.getBoundingClientRect();
        return {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          position: {
            x: +square.dataset.x!,
            y: +square.dataset.y!
          },
          index,
        };
      })
      const nearestPoint = this.nearestPoint(points, x, y);
      const lvl2 = getLevel2(nearestPoint);
      const lvl3 = getLevel3(nearestPoint);

      this.squares.forEach(square => {
        const dataX = +square.dataset.x!
        const dataY = +square.dataset.y!
        let coeff = 0.1;
        if (nearestPoint.position.x === dataX && nearestPoint.position.y === dataY) {
          coeff = 1;
        } else if (lvl2.some(({ x, y }) => dataX === x && dataY === y)) {
          coeff = 0.5;
        } else if (lvl3.some(({ x, y }) => dataX === x && dataY === y)) {
          coeff = 0.2;
        }
        const inside  = square.firstChild
        if (inside instanceof HTMLDivElement) {
          if (this.shouldRotate) {
            inside.style.transform = `rotate(${coeff > 0.1 ? '135deg' : '45deg'})`;
          }
          inside.style.borderColor = `rgba(213, 194, 145, ${coeff})`;
          inside.style.backgroundColor = `rgba(213, 194, 145, ${coeff > 0.1 ? coeff : 0})`;
        }
      })
      requestAnimationFrame(frame)
    }
    frame();
  },

  nearestPoint(points, x, y) {
    let minDistance = 100;
    let closestPoint = points[0];
    for (let i = 0; i < points.length; i++) {
      const distance = Math.sqrt((x - points[i].x) * (x - points[i].x) + (y - points[i].y) * (y - points[i].y));
      if (distance < minDistance) {
        minDistance = distance;
        closestPoint = points[i];
      }
    }
    return closestPoint;
  },

  enableGui() {
    if (this.guiEnabled) return;
    const gui = new GUI();
    gui.add(settings, 'animate')
    gui.add(settings, 'rotate')
    gui.add(settings, 'debug')
    gui.add(settings, 'hoverAreaSize', 100, 500, 10)
    gui.onChange(() => {
      this.shouldAnimate = settings.animate;
      this.shouldRotate = settings.rotate;
      this.debug = settings.debug;
      if (!this.debug) {
        this.debugShape.style.opacity = '0';
      } else {
        this.debugShape.style.opacity = '0.2';
      }
      this.hoverAreaSize = settings.hoverAreaSize;
      this.debugShape.style.width = `${settings.hoverAreaSize}px`;
      this.debugShape.style.height = `${settings.hoverAreaSize}px`;
    })
    this.guiEnabled = true;
  },

  init() {
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.renderSquares();
    this.initCursor();
    // this.enableGui();
    const onWindowResize = () => {
      this.clearSquares();
      this.renderSquares();
    };
    window.addEventListener('resize', onWindowResize);
    scroll.on('scroll', ({ currentElements }) => {
      if (currentElements.intro) {
        $('.intro__curtain').style.opacity = currentElements.intro.progress - 0.5 + '';
      }
    })
  }
}

export default intro;

const getLevel2 = (point: KindaPoint) => {
  return [
    {
      x: point.position.x - 1,
      y: point.position.y,
    },
    {
      x: point.position.x,
      y: point.position.y + 1,
    },
    {
      x: point.position.x + 1,
      y: point.position.y,
    },
    {
      x: point.position.x,
      y: point.position.y - 1,
    },
  ]
}

const getLevel3 = (point: KindaPoint) => {
  return [
    {
      x: point.position.x - 2,
      y: point.position.y,
    },
    {
      x: point.position.x - 1,
      y: point.position.y + 1,
    },
    {
      x: point.position.x,
      y: point.position.y + 2,
    },
    {
      x: point.position.x + 1,
      y: point.position.y + 1,
    },
    {
      x: point.position.x + 2,
      y: point.position.y,
    },
    {
      x: point.position.x + 1,
      y: point.position.y - 1,
    },
    {
      x: point.position.x,
      y: point.position.y - 2,
    },
    {
      x: point.position.x - 1,
      y: point.position.y - 1,
    },
  ]
}