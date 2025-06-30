<script lang="ts">
  import type { Content } from '@prismicio/client';
  import type { SliceComponentProps } from '@prismicio/svelte';

  type Props = SliceComponentProps<Content.SecondScreenProjectSlice>;

  const { slice }: Props = $props();
</script>

<div
  data-work-reference={slice.primary.work_reference_id}
  class="mwf"
  style:background-image="url({slice.primary.background.url})">
  <span class="arrow-btn">
    <svg width="9" height="10" viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.57143 1L8 5M8 5L4.57143 9M8 5H0" stroke="#F4EDDD" />
    </svg>
  </span>
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
