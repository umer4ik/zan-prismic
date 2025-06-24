<script lang="ts">
  import type { Content } from '@prismicio/client';
  import { PrismicImage, type SliceComponentProps } from '@prismicio/svelte';
    import _ from 'lodash';

  type Props = SliceComponentProps<Content.AwardsSlice>;

  const { slice }: Props = $props();
</script>

<div class="awards">
  <div class="awards-follower">
    <img data-award="1" src="/award-1.png" alt="">
    <img data-award="2" src="/award-2.png" alt="">
  </div>
  <div class="awards__content">
    <div class="title">
      Awards<sup>({slice.primary.awards.length})</sup>
    </div>
    <table class="awards-table">
      <thead>
        <tr>
          <th>(Number)</th>
          <th>(Project Name)</th>
          <th></th>
          <th>(Award)</th>
          <th>(Year)</th>
        </tr>
      </thead>
      <tbody>
        {#each slice.primary.awards as item, i (i)}
          <tr class="award-row" data-award={i}>
            <td>({_.padStart(`${i + 1}`, 2, '0')})</td>
            <td>{item.name}</td>
            <td><PrismicImage field={item.image} /></td>
            <td>{item.award}</td>
            <td>{item.year}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
