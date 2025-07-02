import { type RequestEvent } from "@sveltejs/kit";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

/**
 * A record of locales mapped to a version displayed in URLs. The first entry is
 * used as the default locale.
 */
// TODO: Update this object with your website's supported locales. Keys
// should be the locale IDs registered in your Prismic repository, and values
// should be the string that appears in the URL.
const LOCALES: Record<string, string> = {
  "en-us": "en",
  "ar-sa": "ar",
};

/** Redirects with an auto-detected locale prepended to the URL. */
export function extractLocale(event: RequestEvent) {
  const headers = {
    "accept-language":
      event.request.headers.get("accept-language") ?? undefined,
  };
  const languages = new Negotiator({ headers }).languages();
  const locales = Object.keys(LOCALES);
  const locale = match(languages, locales, locales[0]);

  return locale
}

/** Determines if a pathname has a locale as its first segment. */
export function searchParamsHaveLocale(event: RequestEvent): boolean {
  const regexp = new RegExp(`(${Object.values(LOCALES).join("|")})`);
  return regexp.test(event.url.searchParams.get('lang') ?? '');
}

/**
 * Returns the full locale of a given locale. It returns `undefined` if the
 * locale is not in the master list.
 */
export function reverseLocaleLookup(locale: string): string | undefined {
  for (const key in LOCALES) {
    if (LOCALES[key] === locale) {
      return key;
    }
  }
}