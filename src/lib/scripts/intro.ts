import { type AnimatableObject, createAnimatable, type RenderableCallbacks } from "animejs";
import {
  $,
} from "../dom-helper";
import GUI from "lil-gui";
import { browser } from "$app/environment";

const settings = {
  animate: true,
  debug: false,
  hoverAreaSize: browser ? window.innerWidth <= 1230 ? 150 : 350 : 150,
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
  appendDebugShape(): void
  handleMouseMove(e: MouseEvent | TouchEvent): void
  renderSquares(): void
  clearSquares(): void
  renderSquare(x: number, y: number): HTMLDivElement
  initCursor(): void
  extrapolateDistance(square: HTMLDivElement, x: number, y: number): number
  enableGui(): void
  init(): void
} = {
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
    const offset =  width < 1230 ? 15 : 20;
    for (let i = 0; i < width ; i = i + distance) {
      for (let j = 0; j < height; j = j + distance) {
        this.squares.push(this.renderSquare(i + offset, j + offset));
      }
    }
  },
  renderSquare(x: number, y: number) {
    const square = document.createElement('div')
    square.innerHTML = '<div class="square__border"></div>'
    square.className = 'square';
    square.style.left = `${x}px`;
    square.style.top = `${y}px`;
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
      this.squares.forEach(square => {
        const coeff = this.extrapolateDistance(square, x, y);
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

  extrapolateDistance(square, x, y) {
    const box = square.getBoundingClientRect();
    const x1 = x;
    const y1 = y;
    const x2 = x < box.left ? box.left : box.right;
    const y2 = y < box.top ? box.top : box.bottom;
    const cathetus1 = Math.max(x1, x2) - Math.min(x1, x2);
    const cathetus2 = Math.max(y1, y2) - Math.min(y1, y2);
    const distance = Math.sqrt(cathetus1 * cathetus1 + cathetus2 * cathetus2);
    const radius = this.hoverAreaSize / 2;
    const coeff = Math.max(Math.abs(Math.min(radius, distance) / radius - 1), 0.1);
    return coeff;
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
  }
}

export default intro;
