import { asText } from '@prismicio/client';

import { createClient } from '$lib/prismicio';

export async function load({ fetch, cookies, locals }) {
  const client = createClient({ fetch, cookies });
  const settings = await client.getSingle('settings', {
    lang: locals.locale,
  });
  console.log(settings.data);

  const page = await client.getByUID('page', 'home', {
    lang: locals.locale,
  });
  return {
    page,
    title: asText(page.data.title),
    meta_description: page.data.meta_description,
    meta_title: page.data.meta_title,
    meta_image: page.data.meta_image.url,
    favicon: page.data.favicon ? page.data.favicon.url : '',
    locale: locals.locale,
    settings,
  };
}

export function entries() {
  return [{}];
}
