<script lang="ts">
    import { isArabic } from '$lib/is-arabic';
  import type { Content } from '@prismicio/client';
  import { PrismicImage, type SliceComponentProps } from '@prismicio/svelte';

  type Props = SliceComponentProps<Content.NextProjectsSlice> & {
    context: {
      locale: string
    }
  };

  const { slice, context }: Props = $props();
  const arabic = isArabic(context.locale)
  const titles = {
    next: 'Next',
    backToTop: 'Back to Top',
  }
  if (arabic) {
    titles.next = 'التالي'
    titles.backToTop = 'العودة إلى الأعلى'
  }
</script>
<div class="project__next-header">
  <div class="title">Next<sup>({slice.primary.projects.length})</sup></div>
  <span class="project__back-to-top">Back to Top</span>
</div>
<div class="project__row">
  {#each slice.primary.projects as item, index (index)}
    <div class="project__col">
      <div class="next-project" data-work-reference={item.work_reference_id}>
        <div class="next-project__top">
          <div class="next-project__img">
            <PrismicImage field={item.thumb} />
          </div>
          <span class="next-project__btn arrow-btn">
            <svg width="9" height="10" viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.57143 1L8 5M8 5L4.57143 9M8 5H0" stroke="#F2EDDE" />
            </svg>
          </span>
        </div>
        <div class="next-project__title">{item.name}</div>
        <div class="next-project__subtitle">{item.location}</div>
        <div class="next-project__tag project__tag">{item.tag}</div>
      </div>
    </div>
  {/each}
</div>
<!-- <div class="gap gap--200"></div> -->