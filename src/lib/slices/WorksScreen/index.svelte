<script lang="ts">
  import type { Content } from '@prismicio/client';
  import { PrismicImage, type SliceComponentProps } from '@prismicio/svelte';

  type Props = SliceComponentProps<Content.WorksScreenSlice>;

  const { slice }: Props = $props();
  const aboveTableItems = slice.primary.works.filter(x => x.show_above_the_table);
</script>

<div class="works" id="works">
  <div class="works__content">
    <div class="title title--works">
      Works<sup>({slice.primary.works.length})</sup>
    </div>
    <div class="works__row">
      {#each aboveTableItems as item, index (index)}
        <div class="work work--{item.size === 'big' ? 'x2' : 'x1'}" data-work-reference={item.work_reference_id}>
          <div class="work__img">
            <PrismicImage field={item.big_image} />
            <span class="arrow-btn">
              <svg width="9" height="10" viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.57143 1L8 5M8 5L4.57143 9M8 5H0" stroke="#F4EDDD" />
              </svg>
            </span>
          </div>
          <div class="work__description">
            <div class="work__titles">
              <div class="work__title">{item.name}</div>
              <div class="work__subtitle">{item.location}</div>
            </div>
            <div class="work__tag">{item.tag}</div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<div class="w-table">
  <div class="w-table__content">
    <div class="w-table__body">
      <div class="w-row">
        <div class="w-row__col">(Name)</div>
        <div class="w-row__col">(Location)</div>
        <div class="w-row__col">(Service)</div>
        <div class="w-row__col desktop-hidden">(Other Projects)</div>
      </div>
      {#each slice.primary.works as item, index (index)}
        <div class="w-row">
          <div class="w-row__col">{item.name}</div>
          <div class="w-row__col">{item.location}</div>
          <div class="w-row__col">{item.tag}</div>
          <div class="w-row__image">
            <div>
              <PrismicImage field={item.thumbnail} />
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>