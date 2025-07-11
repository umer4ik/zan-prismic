<script lang="ts">
  import { isArabic } from '$lib/is-arabic';
  import type { Content } from '@prismicio/client';
  import { PrismicImage, PrismicRichText, type SliceComponentProps } from '@prismicio/svelte';

  type Props = SliceComponentProps<Content.IntroSlice> & {
    context: {
      locale: string;
    };
  };

  const { slice, context }: Props = $props();
  const arabic = isArabic(context.locale);
  let aboutTitle = 'About';
  let worksTitle = `${slice.primary.number_of_works}+ Works`;
  let moreTitle = 'More';
  if (arabic) {
    aboutTitle = 'حول';
    worksTitle = `${slice.primary.number_of_works}+ أعمال`;
    moreTitle = 'المزيد';
  }
</script>
<section
  data-scroll-section
  data-scroll
  data-scroll-id="intro"
  data-scroll-speed="3.5"
  class="intro"
  data-slice-type={slice.slice_type}
  data-slice-variation={slice.variation}
>
  <div class="intro__curtain"></div>
  <div class="intro-row">
    <div class="intro-col intro-col--title" dir="ltr">
      <div class="intro-title-box">
        <div class="intro-title intro-title--1">
          <div class="intro-title-word">ZAN</div>
          <div class="intro-title-word intro-title-word--r">®</div>
        </div>
        <div class="intro-title intro-title--2">
          <div class="intro-title-word">Agency</div>
        </div>
      </div>
    </div>
    <div class="intro-col intro-col--other">
      <div class="intro-about">
        <div class="intro-about__content">
          <div class="intro-braces">{aboutTitle}</div>
          <div class="intro-about__text">
            <PrismicRichText field={slice.primary.description} />
          </div>
        </div>
      </div>
      <div class="intro-works">
        <div class="intro-braces">{worksTitle}</div>
        <div class="intro-works__content">
          {#each slice.primary.intro_works as item, index (index)}
            <div class="intro-work" data-work-reference={item.work_reference_id}>
              <PrismicImage field={item.thumbnail} class="intro-work__bg" />
            </div>
          {/each}
          <div class="intro-work" data-scroll-to=".works">
            <div class="intro-work__arrow">
              <svg style="transform: {arabic ? 'scaleX(-1)' : 'none'}" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 5L5 1M5 1H1M5 1V5" stroke="#33092E" />
              </svg>
            </div>
            <div class="intro-work__text">
              {moreTitle}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="squares"></div>
</section>
