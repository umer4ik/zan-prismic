<script lang="ts">
  import { isArabic } from '$lib/is-arabic';
  import type { Content } from '@prismicio/client';
  import { PrismicImage, PrismicRichText, type SliceComponentProps } from '@prismicio/svelte';
  import _ from 'lodash';

  type Props = SliceComponentProps<Content.ServicesSlice> & {
    context: {
      locale: string;
    };
  };

  const { slice, context }: Props = $props();
  const colors = ['#F9F6EF', '#EBE0C6', '#D5C291', '#EBE0C6', '#F2EDDE'];
  const arabic = isArabic(context.locale);
  let servicesTitle = 'SERVICES';
  let explanationTitle = 'Explanation';
  if (arabic) {
    explanationTitle = 'شرح';
    servicesTitle = 'الخدمات';
  }
  const services = slice.primary.services;
</script>

<div
  class="services"
  data-scroll-section
  data-scroll-id="services-container"
  id="services">
  <div class="services__anchor" data-scroll data-scroll-id="services-anchor" id="services-anchor"></div>
  <div
    class="services__title-box"
    data-scroll
    data-scroll-id="services-title"
    data-scroll-sticky
    data-scroll-target="#services-anchor"
    data-scroll-offset="0, 100%">
    <div class="services__title">{servicesTitle}</div>
  </div>
  <!-- {#each services as item, index (index)}
    <div
      class="service-anchor"
      data-scroll
      style="position: absolute; bottom: 0; width: 100%; left: 0"
      id="service-anchor-{index}"
      data-test="{item.name}"
    ></div>
  {/each} -->
  {#each services as item, index (index)}
    <div
      class="service-wrapper"
      style="width: 100%;"
      data-scroll
      data-scroll-id="service-{index}"
      data-scroll-sticky
      data-scroll-target="#services-anchor">
      <div class="service-box" style="background-color: {colors[index % 5]};">
        <div class="service">
          <div class="service__content">
            <div class="service__image">
              <PrismicImage field={item.image} />
            </div>
            <div class="service__text">
              <div class="service__title">
                {item.name}
              </div>
              <div class="service__description">
                <PrismicRichText field={item.explanation} />
              </div>
            </div>
            <div class="service__number">{_.padStart(`${index + 1}`, 2, '0')}</div>
            <div class="service__mobile">
              <div class="service__explanation">{explanationTitle}</div>
              <div class="service__description">
                <PrismicRichText field={item.explanation} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/each}
  <div class="services-gap"></div>
</div>


