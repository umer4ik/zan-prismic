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
  const colors = ['#F9F6EF', '#EBE0C6', '#D5C291', '#EBE0C6', '#F4EDDD'];
  const arabic = isArabic(context.locale);
  let servicesTitle = 'SERVICES';
  let explanationTitle = 'Explanation';
  if (arabic) {
    explanationTitle = 'شرح';
    servicesTitle = 'الخدمات';
  }
  const services = slice.primary.services;
</script>

<div class="services" data-scroll-section id="services" style="padding-bottom: 100vh; margin-bottom:-100vh;">
  <div
    class="services__title-box"
    data-scroll data-scroll-id="services-title"
    data-scroll-sticky
    data-scroll-target="#services"
  >
    <div class="services__title">{servicesTitle}</div>
  </div>
</div>
{#each services as item, index (index)}
  <div
    class="service-box"
    style="
      background-color: {colors[index % 5]};
      {index !== services.length - 1 ? 'padding-bottom: 100vh; margin-bottom:-100vh;' : 'padding-bottom: 200rem'}
    "
    data-scroll-section
    id="service-box-{index}"
  >
    <div
      class="service"
      data-scroll
      data-scroll-id="service-{index}"
      data-scroll-offset="{index === services.length - 1 ? '100%' : '0'}"
      data-scroll-sticky
      data-scroll-target="#service-box-{index}"
    >
      <div class="service__content">
        <div class="service__image">
          <PrismicImage field={item.image} />
        </div>
        <div class="service__text">
          <div class="service__title">
            {item.name}
          </div>
          <div class="service__explanation">({explanationTitle})</div>
          <div class="service__description">
            <PrismicRichText field={item.explanation} />
          </div>
        </div>
        <div class="service__number">{_.padStart(`${index + 1}`, 2, '0')}</div>
        <div class="service__mobile">
          <div class="service__explanation">({explanationTitle})</div>
          <div class="service__description">
            <PrismicRichText field={item.explanation} />
          </div>
        </div>
      </div>
    </div>
  </div>
{/each}
