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
    award: 'Award',
    year: 'Year'
  }
  if (arabic) {
    titles.awards = 'الجوائز'
    titles.number = 'الرقم'
    titles.projectName = 'اسم المشروع'
    titles.award = 'جائزة'
    titles.year = 'السنة'
  }

</script>

<div class="awards">
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
          <th>({titles.number})</th>
          <th>({titles.projectName})</th>
          <th></th>
          <th>({titles.award})</th>
          <th>({titles.year})</th>
        </tr>
      </thead>
      <tbody>
        {#each slice.primary.awards as item, i (i)}
          <tr class="award-row" data-award={i}>
            <td>
              ({_.padStart(`${i + 1}`, 2, '0')})
              <div class="award-row__image">
                <div>
                  <PrismicImage field={item.image} />
                </div>
              </div>
            </td>
            <td>
              {item.name}
            </td>
            <td><PrismicImage field={item.image} /></td>
            <td>{item.award}</td>
            <td>{item.year}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
