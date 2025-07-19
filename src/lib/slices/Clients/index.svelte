<script lang="ts">
  import { isArabic } from '$lib/is-arabic';
  import type { Content } from '@prismicio/client';
  import { PrismicImage, type SliceComponentProps } from '@prismicio/svelte';

  type Props = SliceComponentProps<Content.ClientsSlice> & {
    context: {
      locale: string
    }
  };

  const { slice, context }: Props = $props();
  const clientsTitle = isArabic(context.locale) ? 'العملاء' : 'Clients';
</script>
<div class="clients" data-scroll-section>
  <div class="clients__content" id="clients-content">
    <div class="clients-box">
      <div
      class="clients-box__start"
      data-scroll
      data-scroll-id="clients-start"
      data-scroll-offset="-50"
      data-scroll-sticky
      data-scroll-target="#clients-content">
        <div class="title title--clients">
          {clientsTitle}<sup>({slice.primary.clients.length})</sup>
        </div>
      </div>
      <div class="clients-box__list">
        {#each slice.primary.clients as item, index (index)}
          <div class="client {index === 0 ? 'hovered' : ''}" data-client="{index}">
            <span class="client__name">{item.name}</span>
            <div class="client__mobile-image">
              <img data-client={index} src={item.image.url} alt="">
            </div>
          </div>
        {/each}
      </div>
      <div
        class="clients-box__img"
        data-scroll
        data-scroll-id="clients-end"
        data-scroll-offset="-55"
        data-scroll-sticky
        data-scroll-target="#clients-content">
        {#each slice.primary.clients as item, index (index)}
          <PrismicImage class="show" data-client={index} field={item.image} />
        {/each}
      </div>
    </div>
  </div>
</div>