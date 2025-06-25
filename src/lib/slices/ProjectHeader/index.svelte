<script lang="ts">
  import type { Content } from '@prismicio/client';
  import { PrismicImage, type SliceComponentProps } from '@prismicio/svelte';

  type Props = SliceComponentProps<Content.WorkHeaderSlice>;

  const { slice }: Props = $props();
</script>

<div class="project__header">
  <div class="project__title">
    {slice.primary.project_name}
  </div>
  <div class="braced">({slice.primary.project_place})</div>
</div>
<div class="project__subheader">
  <div class="project__tags">
    {#each slice.primary.tags as item, index (index)}
      <div class="project__tag">
        {item.tag}
      </div>
    {/each}
  </div>
  <div class="project__logo">
    <PrismicImage field={slice.primary.company_thumbnail} />
  </div>
</div>
