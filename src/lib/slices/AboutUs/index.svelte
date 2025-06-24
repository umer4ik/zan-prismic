<script lang="ts">
  import type { Content } from '@prismicio/client';
  import { PrismicRichText, type SliceComponentProps } from '@prismicio/svelte';
  import _ from 'lodash';

  type Props = SliceComponentProps<Content.AbountUsSlice>;

  const { slice }: Props = $props();
  const rows = _.chunk(slice.primary.numbers, 2)
</script>
<div class="about-us">
  <div class="about-us__start">
    <div class="title title--about-us">
      About Us
    </div>
  </div>
  <div class="about-us__end">
    <div class="about-us__top">
      <div class="about-us__row">
        <div class="about-us__col">
          <div class="braced">(ZAN)</div>
          <div class="about-us__top-text">
            <PrismicRichText field={slice.primary.description} />
          </div>
        </div>
        <div class="about-us__col">
          <div class="braced">(Numbers)</div>
          <div class="about-us__numbers">
            {#each rows as row, i (i)}
              <div class="about-us__numbers-row">
                {#each row as item, j (j)}
                  <div class="about-us__number">
                    ({item.count})<br />{item.label}
                  </div>
                {/each}
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
    <div class="about-us__philosophy">
      <div class="braced">(Philosophy)</div>
      <div class="about-us__philosophy-text">
        <PrismicRichText field={slice.primary.philosophy} />
      </div>
    </div>
    <div class="about-us__belief">
      <div class="about-us__belief-img">
        <img src="/about-us-belief.png" alt="">
      </div>
      <div class="about-us__belief-text-col">
        <div class="braced">(Belief)</div>
        <div class="about-us__belief-text">
          <PrismicRichText field={slice.primary.belief} />
        </div>
      </div>
    </div>
  </div>
</div>