<script lang="ts">
  import type { Content } from '@prismicio/client';
  import { PrismicRichText, type SliceComponentProps } from '@prismicio/svelte';
  import Label from './Label.svelte';

  type Props = SliceComponentProps<Content.RichTextSlice>;

  const { slice }: Props = $props();
</script>

<section class="container">
  <PrismicRichText
    field={slice.primary.content}
    components={{
      label: Label
    }}
  />
</section>

<style>
</style>
