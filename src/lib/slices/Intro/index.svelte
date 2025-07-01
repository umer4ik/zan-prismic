<script lang="ts">
  import type { Content } from '@prismicio/client';
  import { PrismicImage, PrismicRichText, type SliceComponentProps } from '@prismicio/svelte';

  type Props = SliceComponentProps<Content.IntroSlice>;

  const { slice }: Props = $props();
</script>

<section class="intro" data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
  
  <div class="intro-about">
    <div class="intro-about__content">
      <div class="intro-braces">(About)</div>
      <div class="intro-about__text">
        <PrismicRichText field={slice.primary.description} />
      </div>
    </div>
  </div>
  <div class="intro-works">
    <div class="intro-braces">( {slice.primary.number_of_works}+ Works )</div>
    <div class="intro-works__content">
      {#each slice.primary.intro_works as item, index (index)}
        <div class="intro-work" data-work-reference={item.work_reference_id}>
          <PrismicImage field={item.thumbnail} class="intro-work__bg" />
        </div>
      {/each}
      <div class="intro-work" data-scroll-to=".works">
        <div class="intro-work__arrow">
          <svg viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 5L5 1M5 1H1M5 1V5" stroke="#33092E"/>
          </svg>
        </div>
        <div class="intro-work__text">
          More
        </div>
      </div>
    </div>
  </div>
  <div class="intro__content">
    <div class="intro__title-box">
      <div class="intro__title intro__title--1">
        <div class="intro__title-word">ZAN</div>
        <div class="intro__title-word intro__title-word--r">®</div>
      </div>
      <div class="intro__title intro__title--2">
        <div class="intro__title-word">Agency</div>
      </div>
    </div>
  </div>
  <div class="squares"></div>
</section>
