<script lang="ts">
  import type { Content } from '@prismicio/client';
  import { PrismicImage, PrismicRichText, type SliceComponentProps } from '@prismicio/svelte';
  import _ from 'lodash';

  type Props = SliceComponentProps<Content.ServicesSlice>;

  const { slice }: Props = $props();
</script>

<div class="services">
  <div class="services__title">SERVICES</div>
  <div class="services__list">
    {#each slice.primary.services as item, index (index)}
      <div class="service">
        <div class="service__content">
          <div class="service__image">
            <PrismicImage field={item.image} />
          </div>
          <div class="service__text">
            <div class="service__title">
              {item.name}
            </div>
            <div class="service__explanation">(Explanation)</div>
            <div class="service__description">
              <PrismicRichText field={item.explanation} />
            </div>
          </div>
          <div class="service__number">{_.padStart(`${index}`, 2, '0')}</div>
          <div class="service__mobile">
            <div class="service__explanation">(Explanation)</div>
            <div class="service__description">
              <PrismicRichText field={item.explanation} />
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>