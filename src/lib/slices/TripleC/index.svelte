<script lang="ts">
  import type { Content } from '@prismicio/client';
  import { PrismicImage, PrismicRichText, type SliceComponentProps } from '@prismicio/svelte';

  type Props = SliceComponentProps<Content.TripleCSlice>;

  const { slice }: Props = $props();
</script>
<div class="triple-c">
  <div class="triple-c__content">
    <div class="title">
      Triple C<sup>({slice.primary.terms.length})</sup>
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
        <div class="braced">(We C your needs.)</div>
      </div>
      <div class="triple-c__text">
        <PrismicRichText field={slice.primary.description} />
      </div>
    </div>
  </div>
</div>
