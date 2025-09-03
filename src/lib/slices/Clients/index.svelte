<script lang="ts">
    import { browser } from '$app/environment';
  import { isArabic } from '$lib/is-arabic';
  import type { Content } from '@prismicio/client';
  import { PrismicImage, type SliceComponentProps } from '@prismicio/svelte';
  import { onMount } from 'svelte';

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
  const lengthCoeffs1440: Record<string, number> = {
    5: 0.62,
    6: 0.69,
    7: 0.73,
    8: 0.76,
    9: 0.78,
    10: 0.80,
    11: 0.82,
    12: 0.83,
    13: 0.84,
    14: 0.85,
    15: 0.86,
    16: 0.87,
    17: 0.88,
    18: 0.885,
    19: 0.89,
    20: 0.895,
  }
  const lengthCoeffs1920: Record<string, number> = {
    5: 0.62,
    6: 0.69,
    7: 0.73,
    8: 0.76,
    9: 0.79,
    10: 0.80,
    11: 0.82,
    12: 0.83,
    13: 0.84,
    14: 0.85,
    15: 0.86,
    16: 0.87,
    17: 0.88,
    18: 0.885,
    19: 0.89,
    20: 0.895,
  }
  onMount(() => {
    if (browser) {
      // alert(slice.primary.clients.length)
      window.clientMaskCoeff1440 = lengthCoeffs1440[realClients.length] || 0.78;
      window.clientMaskCoeff1920 = lengthCoeffs1920[realClients.length] || 0.78;
    }
  })
</script>
<div class="clients" data-scroll-section data-scroll-id="clients" data-scroll>
  <div class="clients__content" id="clients-content">
    <div class="clients-box" id="clients-box" data-scroll>
      <div
      class="clients-box__start"
      data-scroll
      data-scroll-id="clients-start"
      data-scroll-sticky
      data-scroll-target="#clients-box">
        <div class="title title--clients">
          {clientsTitle}<sup>({slice.primary.clients.length})</sup>
        </div>
      </div>
      <div class="clients-box__list">
        {#each clients as item, index (index)}
          <div class="client {index === 1 ? 'hovered' : ''}" data-client="{index - 5}">
            <span class="client__name">{item.name}</span>
            <div class="client__mobile-image">
              <img data-client={index - 5} src={item.image.url} alt="">
            </div>
          </div>
        {/each}
        <div
          class="clients-box__mask"
          data-scroll
          data-scroll-id="clients-mask"
          data-scroll-sticky
          data-scroll-target="#clients-box">
          {#each realClients as item, index (index)}
            <div class="client client--fake">
              <span class="client__name">{item.name}</span>
            </div>
          {/each}
           <div class="client client--fake">
            <span class="client__name">{realClients[0]?.name}</span>
          </div>
        </div>
      </div>
      <div
        class="clients-box__img"
        data-scroll
        data-scroll-id="clients-end"
        data-scroll-sticky
        data-scroll-target="#clients-box">
        {#each slice.primary.clients as item, index (index)}
          <PrismicImage class="show" data-client={index} field={item.image} />
        {/each}
      </div>
    </div>
  </div>
  <div class="clients__after">
    <div class="clients__after-list">
      {#each realClients.slice(0, 5) as item, index (index)}
        <div class="client client--fake">
          <span class="client__name">{item.name}</span>
        </div>
      {/each}
    </div>
  </div>
</div>