<script lang="ts">
  import { isArabic } from '$lib/is-arabic';
  import type { Content } from '@prismicio/client';
  import { PrismicImage, type SliceComponentProps } from '@prismicio/svelte';

  type Props = SliceComponentProps<Content.WorksScreenSlice> & {
    context: {
      locale: string;
    };
  };

  const { slice, context }: Props = $props();
  const aboveTableItems = slice.primary.works.filter((x) => x.show_above_the_table && !x.full_screen);
  const otherProjects = slice.primary.works.filter((x) => !x.show_above_the_table && !x.full_screen);
  const fullScreenProject = slice.primary.works.find((x) => x.full_screen);
  const arabic = isArabic(context.locale);

  let worksTitle = 'Works';
  let nameTitle = 'Name';
  let yearTitle = 'Year';
  let serviceTitle = 'Service';
  let otherProjectsTitle = 'Other Projects';
  if (arabic) {
    worksTitle = 'أعمالنا';
    nameTitle = 'الاسم';
    yearTitle = 'السنة';
    serviceTitle = 'الخدمة';
    otherProjectsTitle = 'مشاريع أخرى';
  }
</script>

<div data-scroll-section id="mwf">
  {#if fullScreenProject}
    <div
      data-scroll
      data-work-reference={fullScreenProject.work_reference_id}
      class="mwf"
      style:background-image="url({fullScreenProject.big_image.url})"
    >
    <div class="mwf__content"
      data-scroll>
      <div class="blurred-block">
        <div class="blurred-block__start">
          <img src="/blurred-block-img.png" alt="" />
        </div>
        <div class="blurred-block__text">
          <div class="blurred-block__title">{fullScreenProject.name}</div>
          <div class="blurred-block__subtitle">{fullScreenProject.location}</div>
        </div>
        <div class="blurred-block__end">
          {#if fullScreenProject.tag}
            <button class="blurred-block__button">{fullScreenProject.tag}</button>
          {/if}
          {#if fullScreenProject.tag2}
            <button class="blurred-block__button">{fullScreenProject.tag2}</button>
          {/if}
        </div>
      </div>
    </div>
  </div>
    
    <div class="works" id="works">
      <div class="works__content">
        <div class="title title--works">
          {worksTitle}<sup>({slice.primary.works.length})</sup>
        </div>
        <div class="works__row">
          {#each aboveTableItems as item, index (index)}
            <div class="work work--{item.size === 'big' ? 'x2' : 'x1'}" data-work-reference={item.work_reference_id}>
              <div class="work__img">
                <PrismicImage field={item.big_image} />
              </div>
              <div class="work__description">
                <div class="work__titles">
                  <div class="work__title">{item.name}</div>
                  <div class="work__tag">{item.tag}</div>
                  <!-- <div class="work__subtitle">{item.location}</div> -->
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>

    <div class="w-table" data-scroll>
      <div class="w-table__content">
        <div class="w-table__body">
          <div class="w-row" data-scroll>
            <div class="w-row__col">{nameTitle}</div>
            <div class="w-row__col">{serviceTitle}</div>
            <div class="w-row__col">{yearTitle}</div>
            <div class="w-row__col desktop-hidden">{otherProjectsTitle}</div>
          </div>
          {#each otherProjects as item, index (index)}
            <div class="w-row" data-work-reference={item.work_reference_id} data-scroll>
              <div class="w-row__col">{item.name}</div>
              <div class="w-row__col">{item.tag}</div>
              <div class="w-row__col">{item.year}</div>
              <div class="w-row__image">
                <div>
                  <PrismicImage field={item.thumbnail} />
                </div>
              </div>
            </div>
          {/each}
          <div class="w-row" data-scroll></div>
        </div>
      </div>
    </div>
  {/if}
</div>
