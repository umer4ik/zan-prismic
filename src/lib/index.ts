import preloader from './scripts/preloader';
import intro from './scripts/intro';
import { processText } from './scripts/process-text';
import { animateHeader, animateIntroAbout, animateIntroTitle } from './scripts/animate-blocks';
import { handleClients } from './scripts/clients';
import { addServicesEventListeners } from './scripts/services';
import { handleTripleC } from './scripts/triple-c';
import { handleAwards } from './scripts/awards';
import { handleFooter } from './scripts/footer';
import { $, $$ } from './dom-helper';
import { closeDrawer, openDrawer } from './scripts/drawer';
import { handleWorks } from './scripts/works';
import { lockScroll, unlockScroll } from './scripts/lock-scroll';
import { burger } from './scripts/burger';
import { handleWRows } from './scripts/handle-w-rows';


export const onStart = async () => {
  // lockScroll(true);
  processText();
  // await preloader.init();
  // unlockScroll();
  burger();
  intro.init();
  handleWRows();
  animateIntroTitle();
  animateHeader();
  animateIntroAbout();
  handleClients();
  addServicesEventListeners();
  handleTripleC();
  handleAwards();
  handleWorks();
  handleFooter();
  $$('[data-work-reference]').forEach(x => {
    x.addEventListener('click', () => {
      openDrawer(x.dataset.workReference!);
    })
  });
  $('.close').addEventListener('click', closeDrawer)
  $('.drawer__backdrop').addEventListener('click', closeDrawer)
};
