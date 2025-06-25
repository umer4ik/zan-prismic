export const lockScroll = (scrollToTop = false) => {
  if (scrollToTop) {
    window.scrollTo(0, 0);
  }
  document.body.style.overflow = 'hidden';
}

export const unlockScroll = () => {
  document.body.style.overflow = 'auto';
}