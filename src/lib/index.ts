import preloader from './scripts/preloader';
import intro from './scripts/intro';
import { processText } from './scripts/process-text';
import { animateHeader, animateIntroAbout, animateIntroTitle } from './scripts/animate-blocks';
import { handleClients } from './scripts/clients';
import { addServicesEventListeners } from './scripts/services';
import { handleTripleC } from './scripts/triple-c';
import { handleAwards } from './scripts/awards';
import { handleFooter } from './scripts/footer';
import { $, assertIsHTMLElement } from './dom-helper';
import { closeDrawer, openDrawer } from './scripts/drawer';
import { handleWorks } from './scripts/works';
import { initScroll, lockScroll, scrollTo, unlockScroll } from './scripts/scroll';
import { burger } from './scripts/burger';
import { handleWRows } from './scripts/handle-w-rows';
import { handleTitles } from './scripts/titles';
import { handleAboutUs } from './scripts/about-us';

export const onStart = async () => {
  document.body.addEventListener('mouseover', (e) => {
    if (!intro.cursorInitialized) {
      intro.cursor.x = e.clientX;
      intro.cursor.y = e.clientY;
    }
  });
  processText();
  await initScroll();
  lockScroll();
  intro.init();
  await preloader.init();
  unlockScroll();
  burger();
  handleTitles();
  handleWRows();
  animateIntroTitle();
  animateHeader();
  animateIntroAbout();
  handleClients();
  addServicesEventListeners();
  handleAboutUs();
  handleTripleC();
  handleAwards();
  handleWorks();
  handleFooter();
  document.addEventListener('click', (event) => {
    const { target } = event;
    if (!(target instanceof HTMLElement)) return;
    if (window.innerWidth <= 768 && target.closest('.w-row__col:first-child')) {
      return;
    }
    const element = target.closest('[data-work-reference]')
    if (!(element instanceof HTMLElement)) return;
    if (element.dataset.workReference) openDrawer(element.dataset.workReference!, element);
  });

  document.addEventListener('click',  (event) => {
    const { target } = event;
    if (!(target instanceof HTMLElement) && !(target instanceof SVGElement)) return;
    if (target.closest('.project__back-to-top')) {
      $('.drawer__content').style.scrollBehavior = 'smooth';
      $('.drawer__content').scrollTo(0, 0);
      setTimeout(() => {
        $('.drawer__content').removeAttribute('style')
      })
    }
    if (target.closest('[data-scroll-to]') || target.hasAttribute('data-scroll-to')) {
      event?.preventDefault()
      const el = target.closest('[data-scroll-to]')!;
      assertIsHTMLElement(el);
      scrollTo(el.dataset.scrollTo!)
    }
  });
  $('.close').addEventListener('click', closeDrawer)
  $('.drawer__backdrop').addEventListener('click', closeDrawer)
};
