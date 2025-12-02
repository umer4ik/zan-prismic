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
  const realClients = slice.primary.clients;
  const clientsTitle = isArabic(context.locale) ? 'العملاء' : 'Clients';
  const clients = [
    ...realClients.slice(realClients.length - 5),
    ...realClients,
  ];
</script>
<div class="clients" data-scroll-section data-scroll-id="clients" data-scroll>
  <div class="clients__content" id="clients-content">
    <div class="clients-box" id="clients-box" data-scroll data-scroll-id="clients-box">
      <div
      class="clients-box__start"
      data-scroll
      data-scroll-id="clients-start"
      data-scroll-sticky
      data-scroll-target="#clients-box">
        <div class="title title--clients">
          {clientsTitle}<sup>({slice.primary.clients.length})</sup>
        </div>
        <div class="clients-box__arr-right">
          <img src="/arr-right.png" alt="">
        </div>
      </div>
      <div
        class="clients-box__list"
        data-scroll
        data-scroll-id="clients-list"
        data-scroll-sticky
        data-scroll-target="#clients-box">
        {#each realClients as item, index (index)}
          <div class="client {index === 0 ? 'hovered' : ''}" data-client="{index}">
            <span class="client__name">{item.name}</span>
            <div class="client__mobile-image">
              <img data-client={index} src={item.image.url} alt="">
            </div>
          </div>
        {/each}
        <div
          class="clients-box__mask"
          data-scroll
          data-scroll-id="clients-mask"
          data-scroll-sticky
          data-scroll-target="#clients-box">
          {#each clients as item, index (index)}
          <div class="client {index < 5 ? 'client--fake' : ''}" data-client="{index - 5}" data-last={index === clients.length - 1 || null}>
            <span class="client__name">{item.name}</span>
          </div>
          {/each}
          {#each realClients.slice(0, 5) as item, index (index)}
            <div class="client client--fake" data-client="{realClients.length + index}">
              <span class="client__name">{item.name}</span>
            </div>
          {/each}
        </div>
      </div>
      <div
        class="clients-box__img"
        data-scroll
        data-scroll-id="clients-end"
        data-scroll-sticky
        data-scroll-target="#clients-box">
        <div class="clients-box__img-file">
          {#each slice.primary.clients as item, index (index)}
            <PrismicImage class="{index === 0 ? 'show' : ''}" data-client={index} field={item.image} />
          {/each}
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="clients__after">
    <div class="clients__after-list">
      {#each realClients.slice(0, 5) as item, index (index)}
        <div class="client client--fake">
          <span class="client__name">{item.name}</span>
        </div>
      {/each}
    </div>
  </div> -->
</div>