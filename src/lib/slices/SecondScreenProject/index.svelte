<script lang="ts">
  import type { Content } from '@prismicio/client';
  import type { SliceComponentProps } from '@prismicio/svelte';

  type Props = SliceComponentProps<Content.SecondScreenProjectSlice>;

  const { slice }: Props = $props();
</script>

<div class="mwf" style:background-image="url({slice.primary.background.url})">
  <div class="mwf__content">
    <div class="blurred-block">
      <div class="blurred-block__start">
        <img src="/blurred-block-img.png" alt="">
      </div>
      <div class="blurred-block__text">
        <div class="blurred-block__title">{slice.primary.project_name}</div>
        <div class="blurred-block__subtitle">{slice.primary.project_place}</div>
      </div>
      <div class="blurred-block__end">
        {#each slice.primary.tags as item, index (index)}
          <button class="blurred-block__button">{item.tag}</button>
        {/each}
      </div>
    </div>
  </div>
</div>
