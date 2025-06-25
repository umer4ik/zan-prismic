<script lang="ts">
  import type { Content } from '@prismicio/client';
  import { PrismicImage, type SliceComponentProps } from '@prismicio/svelte';

  type Props = SliceComponentProps<Content.ClientsSlice>;

  const { slice }: Props = $props();
</script>
<div class="clients">
  <div class="clients__content">
    <div class="clients-box">
      <div class="clients-box__start">
        <div class="title title--clients">
          Clients<sup>({slice.primary.clients.length})</sup>
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
      <div class="clients-box__img">
        {#each slice.primary.clients as item, index (index)}
          <PrismicImage class="show" data-client={index} field={item.image} />
        {/each}
      </div>
    </div>
  </div>
</div>