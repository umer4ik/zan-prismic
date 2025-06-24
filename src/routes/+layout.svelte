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

  let { children, data } = $props();
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
  <Header  />
  {@render children()}
  {#each data.projects as project (project.id)}
    <SliceZone slices={project.data.slices} components={components}  />
  {/each}
  <footer>
    <PreFooter />
    <Footer  />
    <PostFooter />
  </footer>
</main>
<PrismicPreview {repositoryName} />