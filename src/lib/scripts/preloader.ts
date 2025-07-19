import { $, $$ } from "../dom-helper";
import { eases, stagger } from "animejs";
import { createTimeline, utils, Timeline } from 'animejs';
import GUI from 'lil-gui';

const images = $$('.preloader-image__img');
const centralImage = $('.preloader-image:nth-of-type(3) img');
const leftImage1 = $('.preloader-image:nth-of-type(2)');
const leftImage2 = $('.preloader-image:nth-of-type(1)');
const rightImage1 = $('.preloader-image:nth-of-type(4)');
const rightImage2 = $('.preloader-image:nth-of-type(5)');
const logo = $$('.preloader-logo__svg path');
const diamond = $('.preloader-diamond');
const preloaderEl = $('.preloader')

const progress = {
  value: 0,
};
const progressEl = $('.preloader-progress');
const progressNumberEl = $('.preloader-progress__number');

const settings = {
  "firstImage": {
    "duration": 760,
    "delay": 0
  },
  "secondImages": {
    "duration": 510,
    "delay": 210
  },
  "thirdImages": {
    "duration": 550,
    "delay": 330
  },
  "imagesCollapse": {
    "duration": 520,
    "delay": 600
  },
  "logoIn": {
    "duration": 1200,
    "delay": 50
  },
  "diamond": {
    "transform": {
      "duration": 750,
      "delay": 630
    },
    "opacity": {
      "duration": 200,
      "delay": 0
    }
  },
  preloaderOut: {
    duration: 1000,
    delay: 0,
  },
  'To Console': () => {
    console.log(JSON.stringify(settings, null, 2))
  }
};

const preloader = {
  timelines: [] as Timeline[],
  animate() {
    this.timelines.forEach(x => x.cancel())
    const elementsTl = createTimeline();
    elementsTl.add(centralImage, {
      height: '100%',
      duration: 760,
      delay: 0,
      ease: eases.inOutQuad,
    })
      .add(leftImage1, {
        x: {
          from: -120,
          to: 0,
        },
        opacity: {
          from: 0,
          to: 1,
        },
        duration: 650,
        delay: 210,
        ease: eases.inOutQuad
      })
      .add(rightImage1, {
        x: {
          from: 120,
          to: 0,
        },
        opacity: {
          from: 0,
          to: 1,
        },
        duration: 650,
        delay: 210,
        ease: eases.inOutQuad
      }, `-=${650 + 210}`)
      .add(leftImage2, {
        x: {
          from: -120,
          to: 0,
        },
        opacity: {
          from: 0,
          to: 1,
        },
        duration: 650,
        delay: 210,
        ease: eases.inOutQuad
      })
      .add(rightImage2, {
        x: {
          from: 120,
          to: 0,
        },
        opacity: {
          from: 0,
          to: 1,
        },
        duration: 650,
        delay: 210,
        ease: eases.inOutQuad,
        onComplete: () => {
          for (const image of images) {
            image.classList.add('stick-to-top');
          }
        }
      }, `-=${550 + 330}`)
      .add(images, {
        height: 0,
        duration: 650,
        delay: stagger([650, 100]),
        ease: eases.inOutQuad,
      })
      .add(logo, {
        y: ['100%', 0],
        duration: 800,
        delay: stagger(130),
        ease: eases.outQuad,
      })
      .add(diamond, {
        rotate: ['-0.125turn', '0turn'],
        width: '100%',
        height: '100%',
        left: '0',
        top: '0',
        duration: 750,
        delay: 100,
        ease: 'cubicBezier(.18,.61,.46,.98)',
        opacity: {
          to: 1,
          ease: 'linear',
          duration: 20,
        },
        backgroundColor: {
          to: '#33092E',
          ease: 'cubicBezier(.18,.61,.46,.98)',
          duration: 400,
          delay: 0,
        },
      }, '-=700')
      .add(preloaderEl, {
        opacity: 0,
        duration: 400,
        onComplete: () => {
          preloaderEl.style.pointerEvents = 'none';
        }
      });

    const progressTl = createTimeline();
    progressTl.add(progress, {
      value: 100,
      modifier: utils.round(0),
      ease: 'inOut',
      duration: 6000,
      onRender: () => {
        progressNumberEl.textContent = `${progress.value}`
      },
    })
      .add(progressEl, {
        y: 100,
        opacity: 0,
        duration: settings.preloaderOut.duration,
        delay: settings.preloaderOut.delay,
      });

    const mainTl = createTimeline()
      .sync(progressTl)
      .sync(elementsTl, '-=7000');
    this.timelines.push(mainTl, progressTl, elementsTl)
    return elementsTl
  },

  complete() {
    this.timelines[0]?.complete();
  },

  guiEnabled: false,

  enableGui() {
    if (this.guiEnabled) return;
    const gui = new GUI();
    gui.onChange(() => {
      preloaderEl.removeAttribute('style');
      for (const image of images) {
        image.classList.remove('stick-to-top');
        image.removeAttribute('style');
        image.parentElement?.removeAttribute('style');
      }
      // logo.removeAttribute('style');
      progress.value = 0;
      progressNumberEl.textContent = '0';
      progressEl.removeAttribute('style');
      diamond.removeAttribute('style');
      preloader.animate();
    })
    gui.add(settings, 'To Console')
    const firstImage = gui.addFolder('First Image')
    firstImage.add(settings.firstImage, 'duration', 200, 2000, 10);
    firstImage.add(settings.firstImage, 'delay', 0, 2000, 10);

    const secondImages = gui.addFolder('Second Images')
    secondImages.add(settings.secondImages, 'duration', 200, 2000, 10);
    secondImages.add(settings.secondImages, 'delay', 0, 2000, 10);

    const thirdImages = gui.addFolder('Third Images')
    thirdImages.add(settings.thirdImages, 'duration', 200, 2000, 10);
    thirdImages.add(settings.thirdImages, 'delay', 0, 2000, 10);

    const imagesCollapse = gui.addFolder('Images Collapse');
    imagesCollapse.add(settings.imagesCollapse, 'duration', 200, 2000, 10);
    imagesCollapse.add(settings.imagesCollapse, 'delay', 0, 2000, 10);

    const logoIn = gui.addFolder('Logo In');
    logoIn.add(settings.logoIn, 'duration', 200, 2000, 10);
    logoIn.add(settings.logoIn, 'delay', 0, 2000, 10);

    const diamondTransform = gui.addFolder('Rhombus Transform')
    diamondTransform.add(settings.diamond.transform, 'duration', 200, 12000, 10);
    diamondTransform.add(settings.diamond.transform, 'delay', 0, 2000, 10);

    const diamondOpacity = gui.addFolder('Rhombus Opacity')
    diamondOpacity.add(settings.diamond.opacity, 'duration', 200, 2000, 10);
    diamondOpacity.add(settings.diamond.opacity, 'delay', 0, 2000, 10);

    const preloaderOut = gui.addFolder('Preloader Out')
    preloaderOut.add(settings.preloaderOut, 'duration', 200, 2000, 10);
    preloaderOut.add(settings.preloaderOut, 'delay', 0, 2000, 10);
    this.guiEnabled = true;
  },

  init() {
    return new Promise<void>((resolve) => {
      // this.animate().onComplete = () => {
      //   resolve();
      // }
      let resolved = false;
      const tl = this.animate()
      tl.onUpdate = () => {
        if (tl.progress > 0.9 && !resolved) {
          resolved = true;
          resolve();
        }
      }
    })
    // this.complete();
    // this.enableGui();
  }
}

export default preloader;
