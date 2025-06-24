<script lang="ts">
  import type { Content } from '@prismicio/client';
  import { PrismicImage, type SliceComponentProps } from '@prismicio/svelte';

  type Props = SliceComponentProps<Content.WorkHeaderSlice>;

  const { slice }: Props = $props();
</script>

<div class="hide-it">
  <div>
    {slice.primary.project_name}
  </div>
  <div>
    {slice.primary.project_place}
  </div>
  <div>
    {#each slice.primary.tags as item, index (index)}
      <div>
        {item.tag}
      </div>
    {/each}
  </div>
  <div>
    <PrismicImage field={slice.primary.company_thumbnail} />
  </div>
</div>

<style lang="scss">
  .hide-it {
    display: none;
  }
</style>
