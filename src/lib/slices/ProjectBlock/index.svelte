<script lang="ts">
  import type { Content } from '@prismicio/client';
  import { PrismicImage, PrismicRichText, type SliceComponentProps } from '@prismicio/svelte';

  type Props = SliceComponentProps<Content.ProjectBlockSlice>;

  const { slice }: Props = $props();
  let innerWidth = $state(0);
  let isMobile = $derived(innerWidth <= 768);
</script>

<svelte:window bind:innerWidth />

{#if slice.variation === 'default'}
  <!--big image-->
  <div class="project__main-img">
    <PrismicImage field={slice.primary.image} />
  </div>
{/if}

{#if slice.variation === 'twoImagesInARow'}
  <div class="project__row">
    <div class="project__col">
      <PrismicImage field={slice.primary.left_image} />
    </div>
    <div class="project__col">
      <PrismicImage field={slice.primary.rightimage} />
    </div>
  </div>
{/if}

{#if slice.variation === 'bigText'}
  <div class="project__row">
    <div class="project__col">
      {#if slice.primary.title}
        <div class="braced">({slice.primary.title})</div>
      {/if}
    </div>
  </div>
  <div class="project__row">
    <div class="project__col">
      <div class="project__heading2">
        <PrismicRichText field={slice.primary.text} />
      </div>
    </div>
  </div>
{/if}

{#if slice.variation === 'twoColumnsText'}
  <div class="project__row">
    <div class="project__col">
      {#if slice.primary.title}
        <div class="braced">({slice.primary.title})</div>
      {/if}
    </div>
    <div class="project__col">
      <div class="project__text">
        <PrismicRichText field={slice.primary.text} />
      </div>
    </div>
  </div>
{/if}

{#if slice.variation === 'gap'}
  <div style:height="{isMobile ? slice.primary.mobile : slice.primary.desktop}px" />
{/if}

{#if slice.variation === 'divider'}
  <div class={['project__divider', slice.primary.extended && 'project__divider--extended']}></div>
{/if}

