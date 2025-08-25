<script lang="ts">
  import { isArabic } from '$lib/is-arabic';
  import type { Content } from '@prismicio/client';
  import { PrismicImage, type SliceComponentProps } from '@prismicio/svelte';
    import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';

  type Props = SliceComponentProps<Content.WorksScreenSlice> & {
    context: {
      locale: string;
    };
  };
  let tag = $state('');
  let dropdownIsOpen = $state(false);

  const setTag = (newTag: string) => {
    tag = newTag;
    dropdownIsOpen = false;
  };

  const { slice, context }: Props = $props();
  const aboveTableItems = $derived(
    slice.primary.works.filter((x) => x.show_above_the_table && !x.full_screen).filter((x) => (tag ? x.tag?.includes(tag) || x.tag2?.includes(tag) : true)),
  );

  const otherProjects = slice.primary.works.filter((x) => !x.show_above_the_table && !x.full_screen);
  const fullScreenProject = slice.primary.works.find((x) => x.full_screen);
  const arabic = isArabic(context.locale);

  const toggleDropdown = () => {
    dropdownIsOpen = !dropdownIsOpen;
  };

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
  let timeout: NodeJS.Timeout;
  const scheduleUpdateScroll = () => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      window.updateScroll?.();
    }, 0);
  };

  let interval: NodeJS.Timeout;
  let imageStyles: string[] = [];
  onMount(() => {
    interval = setInterval(() => {
      imageStyles = [];
      imageStyles.push(document.querySelector('.work img')?.getAttribute('style') || '');
    }, 100);

    return () => {
      if (interval) clearInterval(interval);
    }
  });

  const setImageStyle = () => {
    document.querySelectorAll('.work img')?.forEach((img, index) => {
      img.setAttribute('style', imageStyles[index] || imageStyles[0] || '');
    });
  }

</script>

<div data-scroll-section id="mwf">
  {#if fullScreenProject}
    <div data-scroll data-work-reference={fullScreenProject.work_reference_id} data-scroll-id="mwf" class="mwf">
      <div class="mwf__content" data-scroll>
        <PrismicImage class="mwf__image" field={fullScreenProject.big_image} />
        <div class="blurred-block">
          <div class="blurred-block__start">
            <PrismicImage field={fullScreenProject.thumbnail} />
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
  {/if}

  <div class="works" id="works" data-scroll>
    <div class="works__content" data-scroll data-scroll-id="works-content">
      <div class="works__header">
        <div class="title title--works">
          <span class="split">{worksTitle}</span>
          <sup>({slice.primary.works.length})</sup>
        </div>
        <div class="works__filter">
          <div class="dropdown {dropdownIsOpen ? 'open' : ''}">
            <button class="dropdown__toggle" onclick={toggleDropdown}>
              <span class="dropdown__label">{tag || 'All Works'}</span>
              <span class="dropdown__arrow">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="7" viewBox="0 0 12 7" fill="none">
                  <path d="M1 5.99707L5.98166 1.01541M5.98166 1.01541L10.994 5.99707M5.98166 1.01541L5.98166 1.44471" stroke="#634F1E" />
                </svg>
              </span>
            </button>
            {#if dropdownIsOpen}
              <div class="dropdown__menu" transition:fly={{ y: -10, duration: 300 }}>
                <button class="dropdown__item" onclick={() => setTag('')}>
                  <span class="dropdown__item-label">All Works</span>
                </button>
                <button class="dropdown__item" onclick={() => setTag('Branding +1')}>
                  <span class="dropdown__item-label">Branding</span>
                </button>
                <button class="dropdown__item" onclick={() => setTag('Company +1')}>
                  <span class="dropdown__item-label">Company</span>
                </button>
              </div>
            {/if}
          </div>
        </div>
      </div>
      <div class="works__row">
        {#each aboveTableItems as item, index (item.thumbnail)}
          <div
            onoutroend={scheduleUpdateScroll}
            onoutrostart={setImageStyle}
            onintrostart={setImageStyle}
            transition:fade data-scroll data-scroll-id="work-{index}" class="work work--x1" data-work-reference={item.work_reference_id}>
            <div class="work__img">
              <div class="work__img-reel">
                <PrismicImage field={item.big_image}/>
              </div>
            </div>
            <div class="work__description">
              <div class="work__titles">
                <div class="work__title">{item.name}</div>
                <div class="work__tag">{item.tag}</div>
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
            <div class="w-row__col w-row__col--year">
              <span>{item.year}</span>
              <svg viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-row__arrow">
                <path
                  d="M5.11573 10.7372L4.12619 9.74768L7.55262 6.32125H-0.000440352L-0.00113089 4.92154H7.55193L4.1255 1.49511L5.11573 0.504886L10.2319 5.62105L5.11573 10.7372Z"
                  fill="#634F1E"
                />
              </svg>
            </div>
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
</div>
