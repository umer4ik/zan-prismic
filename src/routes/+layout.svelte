<script>
  import '../lib/styles/styles.scss'
  import { PrismicPreview } from '@prismicio/svelte/kit';
  import { page } from '$app/state';
  import { repositoryName } from '$lib/prismicio';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import PostFooter from '$lib/components/PostFooter.svelte';
  import PreFooter from '$lib/components/PreFooter.svelte';
  import { SliceZone } from '@prismicio/svelte';
  import { components } from '$lib/slices';
  import Preloader from '$lib/components/Preloader.svelte';
  import Drawer from '$lib/components/Drawer.svelte';
  import { onStart } from '$lib';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  let { children, data } = $props();

  onMount(() => {
    if (!browser) return;
    onStart();
  })

</script>

<svelte:head>
  <title>{page.data.title}</title>
  {#if page.data.meta_description}
    <meta name="description" content={page.data.meta_description} />
  {/if}
  {#if page.data.meta_title}
    <meta name="og:title" content={page.data.meta_title} />
  {/if}
  {#if page.data.meta_image}
    <meta name="og:image" content={page.data.meta_image} />
    <meta name="twitter:card" content="summary_large_image" />
  {/if}
</svelte:head>
<main id="app" class="app">
  <Header
    worksCount={data.settings.data.works_count}
    servicesCount={data.settings.data.services_count}
    email={data.settings.data.email}
    locale={data.locale} />
  {@render children()}
  {#each data.projects as project (project.id)}
    <div data-project-id={project.uid} style="display: none;">
      <SliceZone
        slices={project.data.slices}
        context={{
          locale: data.locale
        }}
        components={components}  />
    </div>
  {/each}
  <footer>
    <PreFooter mail={data.settings.data.email} locale={data.locale} />
    <Footer
      address={data.settings.data.address}
      email={data.settings.data.email}
      instagram={data.settings.data.instagram}
      phone={data.settings.data.phone_number}
      twitter={data.settings.data.link_to_twitter}
      locale={data.locale} />
    <PostFooter locale={data.locale} />
  </footer>
  <Preloader />
  <Drawer />
</main>
<PrismicPreview {repositoryName} />