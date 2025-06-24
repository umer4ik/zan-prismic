<script lang="ts">
  import type { Content } from '@prismicio/client';
  import { PrismicRichText, type SliceComponentProps } from '@prismicio/svelte';

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
    <div class="intro-braces">( 9+ Works )</div>
    <div class="intro-works__content">
      <div class="intro-work">
        <img src="/preloader-image-1.png" alt="" class="intro-work__bg">
      </div>
      <div class="intro-work">
        <img src="/preloader-image-1.png" alt="" class="intro-work__bg">
      </div>
      <div class="intro-work">
        <img src="/preloader-image-1.png" alt="" class="intro-work__bg">
      </div>
      <div class="intro-work">
        <div class="intro-work__arrow">
          <img src="/intro-work-arrow-up-right.svg" alt="">
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
