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
  const { settings } = page.data;

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
  {#if page.data.favicon}
    <link rel="icon" href={page.data.favicon} />
  {/if}
</svelte:head>
<main id="app" class="app">
  <Header
    worksCount={settings.data.works_count}
    servicesCount={settings.data.services_count}
    email={settings.data.email}
    locale={data.locale}
    worksTitle={settings.data.header_works_title}
    servicesTitle={settings.data.services_title}
    aboutUsTitle={settings.data.header_about_us_title}
    contactUsTitle={settings.data.header_contact_us_title} />
  <div data-scroll-container id="js-scroll">
    {@render children()}
    {#each data.projects as project (project.id)}
      <div data-project-id={project.uid} style="display: none;">
        <SliceZone
          slices={project.data.slices}
          context={{
            locale: data.locale,
            philosophyTitle: settings.data.philosophy_title,
            beliefTitle: settings.data.belief_title,
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
        <PreFooter
          mail={settings.data.email}
          locale={data.locale} />
        <Footer
          address={settings.data.address}
          email={settings.data.email}
          instagram={settings.data.instagram}
          phone={settings.data.phone_number}
          twitter={settings.data.link_to_twitter}
          locale={data.locale}
          phoneTitle={settings.data.footer_phone_title}
          emailTitle={settings.data.footer_email_title}
          addressTitle={settings.data.footer_address_title}
          companyTitle={settings.data.footer_company_title}
          socialTitle={settings.data.footer_social_title}
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
