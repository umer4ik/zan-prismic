import { createClient } from '$lib/prismicio';

export async function load({ fetch, cookies, locals }) {
  const client = createClient({ fetch, cookies });
  const settings = await client.getSingle('settings');
  const projects = await client.getAllByType('work_1', {
    lang: locals.locale,
  });

  return {
    settings,
    projects,
    locale: locals.locale
  };
}
// export const prerender = 'auto';
