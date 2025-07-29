<script lang="ts">
  import { isArabic } from '$lib/is-arabic';
  import type { Content } from '@prismicio/client';
  import { PrismicImage, type SliceComponentProps } from '@prismicio/svelte';

  type Props = SliceComponentProps<Content.AwardsSlice> & {
    context: {
      locale: string;
    };
  };
  const { slice, context }: Props = $props();

  const arabic = isArabic(context.locale);
  const titles = {
    awards: 'Awards',
    number: 'Number',
    projectName: 'Project Name',
    category: 'Category',
    award: 'Award',
    year: 'Year'
  }
  if (arabic) {
    titles.awards = 'الجوائز'
    titles.number = 'الرقم'
    titles.projectName = 'اسم المشروع'
    titles.award = 'جائزة'
    titles.category = 'فئة'
    titles.year = 'السنة'
  }

</script>

<div class="awards" data-scroll-section>
  <div class="awards-follower">
    <img data-award="1" src="/award-1.png" alt="">
    <img data-award="2" src="/award-2.png" alt="">
    {#each slice.primary.awards as item, i (i)}
      <PrismicImage field={item.image} data-award={i} />
    {/each}
  </div>
  <div class="awards__content">
    <div class="title title--awards" data-scroll data-scroll-id="awards-title">
      <span class="split">{titles.awards}</span>
      <sup>({slice.primary.awards.length})</sup>
    </div>
    <div class="awards-table">
      <div class="awards-table__head">
        <div class="award-row award-row--head">
          <div class="award-col award-col--head award-col--year">{titles.year}</div>
          <div class="award-col award-col--head award-col--award">{titles.award}</div>
          <div class="award-col award-col--head award-col--category">{titles.category}</div>
          <div class="award-col award-col--head award-col--project-name">{titles.projectName}</div>
        </div>
      </div>
      <div class="awards-table__body">
        {#each slice.primary.awards as item, i (i)}
          <div class="award-row" data-award={i}>
            <div class="award-col award-col--year">
              <span>{item.year}</span>
              <div class="award-row__image">
                <div>
                  <PrismicImage field={item.image} />
                </div>
              </div>
            </div>
            <div class="award-col award-col--award">
              <span>{item.award}</span>
            </div>
            <div class="award-col award-col--mobile-image"><PrismicImage field={item.image} /></div>
            <div class="award-col award-col--category"><span>{item.award}</span></div>
            <div class="award-col award-col--project-name"><span>{item.name}</span></div>
          </div>
        {/each}
        <div class="award-row award-row--last"></div>
      </div>
    </div>
  </div>
</div>
