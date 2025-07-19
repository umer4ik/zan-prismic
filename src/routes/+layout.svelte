<script>
  import '../lib/styles/styles.scss';
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
  });
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
  <Header worksCount={data.settings.data.works_count} servicesCount={data.settings.data.services_count} email={data.settings.data.email} locale={data.locale} />
  <div data-scroll-container id="js-scroll">
    {@render children()}
    {#each data.projects as project (project.id)}
      <div data-project-id={project.uid} style="display: none;">
        <SliceZone
          slices={project.data.slices}
          context={{
            locale: data.locale,
          }}
          {components}
        />
      </div>
    {/each}
    <footer data-scroll-section>
      <div
        data-scroll-section
        data-scroll
        data-scroll-speed="-3.5"
        data-scroll-id="footer-full">
        <PreFooter mail={data.settings.data.email} locale={data.locale} />
        <Footer
          address={data.settings.data.address}
          email={data.settings.data.email}
          instagram={data.settings.data.instagram}
          phone={data.settings.data.phone_number}
          twitter={data.settings.data.link_to_twitter}
          locale={data.locale}
        />
        <PostFooter locale={data.locale} />
      </div>
      <div class="footer-curtain"></div>
    </footer>
  </div>
  <span class="arrow-btn" id="arrow-btn">
    <span class="arrow-btn__inner">
      <svg viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5.11573 10.7372L4.12619 9.74768L7.55262 6.32125H-0.000440352L-0.00113089 4.92154H7.55193L4.1255 1.49511L5.11573 0.504886L10.2319 5.62105L5.11573 10.7372Z"
          fill="#F2EDDE"
        />
      </svg>
    </span>
  </span>
  <Preloader />
  <Drawer />
</main>
<PrismicPreview {repositoryName} />
