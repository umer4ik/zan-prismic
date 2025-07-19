<script lang="ts">
  import { isArabic } from '$lib/is-arabic';
  import type { Content } from '@prismicio/client';
  import { PrismicImage, PrismicRichText, type SliceComponentProps } from '@prismicio/svelte';

  type Props = SliceComponentProps<Content.TripleCSlice> & {
    context: {
      locale: string;
    };
  };
  const { slice, context }: Props = $props();

  const arabic = isArabic(context.locale);
  let title = 'Triple C';
  let cNeedsTitle = 'We C your needs.'
  if (arabic) {
    title = 'منهجية زان';
    cNeedsTitle = 'نحن نرى احتياجاتك.'
  }
</script>

<div class="triple-c" data-scroll-section>
  <div class="triple-c__content">
    <div class="title title--triple-c" data-scroll>
      {title}<sup>({slice.primary.terms.length})</sup>
    </div>
  </div>
  {#each slice.primary.terms as item, i (i)}
    <div class="c">
      <div class="c__content">
        <div class="c__img">
          <PrismicImage field={item.image} />
        </div>
        <div class="c__mobile-img">
          <div class="c__mobile-img-block">
            <PrismicImage field={item.image} />
          </div>
        </div>
        <div class="c__title">
          {item.label}
        </div>
      </div>
    </div>
  {/each}
  <div class="triple-c__content">
    <div class="triple-c__row">
      <div class="triple-c__col">
        <div class="braced">{cNeedsTitle}</div>
      </div>
      <div class="triple-c__text">
        <PrismicRichText field={slice.primary.description} />
      </div>
    </div>
  </div>
</div>
