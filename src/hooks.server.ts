import { type Handle } from "@sveltejs/kit";
import { extractLocale, reverseLocaleLookup, searchParamsHaveLocale } from "$lib/i18n";

export const handle: Handle = async ({ event, resolve }) => {
  // get locale from headers
  let locale = extractLocale(event);
  // but if locale exists in search params, then take it
  if (searchParamsHaveLocale(event)) { // lang=ar-sa
    locale = reverseLocaleLookup(event.url.searchParams.get('lang') ?? '') ?? locale;
  }
  event.locals.locale = locale;
  console.log('locale', locale)
  return resolve(event, {
    transformPageChunk: ({ html }) => html
      .replace('%lang%', locale)
      .replace('%direction%', locale === 'ar-sa' ? 'rtl' : 'ltr')
  });
};
