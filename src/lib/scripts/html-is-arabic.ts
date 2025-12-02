export const htmlIsArabic = () => {
  return document.documentElement.getAttribute('dir') === 'rtl';
}
