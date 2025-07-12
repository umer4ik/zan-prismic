<script lang="ts">
    import { isArabic } from '$lib/is-arabic';
  import type { Content } from '@prismicio/client';
  import { PrismicImage, type SliceComponentProps } from '@prismicio/svelte';
    import _ from 'lodash';

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
    <div class="title">
      {titles.awards}<sup>({slice.primary.awards.length})</sup>
    </div>
    <table class="awards-table">
      <thead>
        <tr>
          <th>{titles.year}</th>
          <th>{titles.award}</th>
          <th></th>
          <th>{titles.category}</th>
          <th>{titles.projectName}</th>
        </tr>
      </thead>
      <tbody>
        {#each slice.primary.awards as item, i (i)}
          <tr class="award-row" data-award={i}>
            <td>
              {item.year}
              <div class="award-row__image">
                <div>
                  <PrismicImage field={item.image} />
                </div>
              </div>
            </td>
            <td>
              {item.award}
            </td>
            <td><PrismicImage field={item.image} /></td>
            <td>{item.award}</td>
            <td>{item.name}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
