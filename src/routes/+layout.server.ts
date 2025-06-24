import { createClient } from '$lib/prismicio';

export async function load({ fetch, cookies }) {
  const client = createClient({ fetch, cookies });
  const settings = await client.getSingle('settings');
  const projects = await client.getAllByType('work_1');

  return {
    settings,
    projects,
  };
}
export const prerender = 'auto';
