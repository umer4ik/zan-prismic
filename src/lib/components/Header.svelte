<script lang="ts">
  interface Props {
    servicesCount?: string | null;
    worksCount?: string | null;
    email?: string | null;
  }
  const { worksCount, servicesCount, email }: Props = $props();
</script>

<header class="header">
  <a href="#" class="header-logo" data-scroll-to=".intro">
    <svg viewBox="0 0 123 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M62.3033 28.2696L69.7416 13.9613L76.0563 26.5456C76.0563 26.5456 64.954 25.6396 62.3033 28.2696ZM66.5978 4.82374H65.1339L67.2449 8.67551L53.4453 35.467H58.6224C58.8942 34.8561 59.267 34.2789 59.7251 33.7858C61.066 32.4462 63.7374 30.9785 69.2575 30.9811C74.4372 30.9824 78.2514 31.0018 78.2514 31.0018L80.453 35.467H85.5874C85.5874 35.467 72.5657 9.16475 72.2447 8.52667C70.6928 5.44759 68.9559 4.82374 66.5978 4.82374Z"
        fill="#F4EDDD"
      />
      <path
        d="M47.2323 11.4534C49.4197 8.58143 49.0275 4.98075 49.0275 4.98075H25.9039C25.9039 4.98075 27.0934 9.446 31.1289 9.446H42.925L27.1037 29.0103C24.9164 31.8836 25.3086 35.483 25.3086 35.483H49.3083V31.0177H31.4098C31.4098 31.0177 47.0628 11.6709 47.2323 11.4534Z"
        fill="#F4EDDD"
      />
      <path
        d="M111.926 4.96769V28.2906L95.3555 8.4234C95.3555 8.4234 93.7389 6.23478 91.7703 5.34303C90.1939 4.68553 87.7969 4.8965 87.7969 4.8965L89.737 8.69779V35.4712H94.1712V14.1791L109.499 32.5668C111.99 35.0622 114.591 35.4867 116.253 35.4867H116.455V4.96769H111.926Z"
        fill="#F4EDDD"
      />
      <path
        d="M9.55953 0L0 9.55953L8.87097 18.4163L0.381812 26.8925C0.381812 26.8925 10.4578 34.4989 8.08276 39.9867C7.92615 40.3465 15.618 33.316 17.0806 30.9073C19.651 26.6776 16.3182 22.9449 10.2882 18.4163L19.1191 9.55953L9.55953 0Z"
        fill="#F4EDDD"
      />
      <path
        d="M120.247 7.10546H120.721C121.209 7.10546 121.366 6.96568 121.366 6.67964C121.366 6.43114 121.245 6.29136 120.789 6.29136H120.247V7.10546ZM120.247 8.56411H119.847V5.96261H120.844C121.465 5.96261 121.766 6.19429 121.766 6.70553C121.766 7.17276 121.476 7.37338 121.087 7.42256L121.83 8.56411H121.391L120.697 7.43421H120.247V8.56411ZM120.727 5.37242C119.683 5.37242 118.874 6.18135 118.874 7.25819C118.874 8.35832 119.683 9.1543 120.727 9.1543C121.762 9.1543 122.57 8.35832 122.57 7.25819C122.57 6.18135 121.762 5.37242 120.727 5.37242ZM120.727 5.00744C121.957 5.00744 123.008 5.96261 123.008 7.25819C123.008 8.56411 121.957 9.51929 120.727 9.51929C119.488 9.51929 118.438 8.56411 118.438 7.25819C118.438 5.96261 119.488 5.00744 120.727 5.00744Z"
        fill="#F4EDDD"
      />
    </svg>
  </a>
  <div class="header__links">
    <a href="#" data-scroll-to=".works" class="header__link"><span>Works</span><sup>({worksCount})</sup></a>
    <a href="#" data-scroll-to=".services" class="header__link"><span>Services</span><sup>({servicesCount})</sup></a>
    <a href="#" data-scroll-to=".about-us" class="header__link"><span>About Us</span></a>
    <a href="mailto:{email}" class="header__button">
      <span>Contact Us</span>
      <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.999771 6H10.2424M10.2424 6L5.62109 1.37868M10.2424 6L5.62109 10.6213" stroke="#33092E" stroke-width="1.4" />
      </svg>
    </a>
  </div>
  <button class="burger">
    <span class="burger__line"></span>
    <span class="burger__line"></span>
  </button>
  <div class="burger-menu">
    <div class="burger-menu__bg">
      <div class="burger-menu__bg-item">
        <div class="burger-menu__bg-item-color"></div>
      </div>
      <div class="burger-menu__bg-item">
        <div class="burger-menu__bg-item-color"></div>
      </div>
      <div class="burger-menu__bg-item">
        <div class="burger-menu__bg-item-color"></div>
      </div>
      <div class="burger-menu__bg-item">
        <div class="burger-menu__bg-item-color"></div>
      </div>
      <div class="burger-menu__bg-item">
        <div class="burger-menu__bg-item-color"></div>
      </div>
      <div class="burger-menu__bg-item">
        <div class="burger-menu__bg-item-color"></div>
      </div>
      <div class="burger-menu__bg-item">
        <div class="burger-menu__bg-item-color"></div>
      </div>
      <div class="burger-menu__bg-item">
        <div class="burger-menu__bg-item-color"></div>
      </div>
      <div class="burger-menu__bg-item">
        <div class="burger-menu__bg-item-color"></div>
      </div>
      <div class="burger-menu__bg-item">
        <div class="burger-menu__bg-item-color"></div>
      </div>
      <div class="burger-menu__bg-item">
        <div class="burger-menu__bg-item-color"></div>
      </div>
      <div class="burger-menu__bg-item">
        <div class="burger-menu__bg-item-color"></div>
      </div>
      <div class="burger-menu__bg-item">
        <div class="burger-menu__bg-item-color"></div>
      </div>
      <div class="burger-menu__bg-item">
        <div class="burger-menu__bg-item-color"></div>
      </div>
      <div class="burger-menu__bg-item">
        <div class="burger-menu__bg-item-color"></div>
      </div>
    </div>
    <ul class="burger-menu__items">
      <li class="burger-menu__item">
        <a href="#" data-scroll-to=".works">
          Works<sup>(9)</sup>
        </a>
        <div class="burger-menu__item-border"></div>
      </li>
      <li class="burger-menu__item">
        <a href="#" data-scroll-to=".services">
          Services<sup>(9)</sup>
        </a>
        <div class="burger-menu__item-border"></div>
      </li>
      <li class="burger-menu__item">
        <a href="#" data-scroll-to=".about-us"> About Us </a>
        <div class="burger-menu__item-border"></div>
      </li>
      <li class="burger-menu__item">
        <a href="mailto:{email}" class="burger-menu__button"> Contact Us </a>
      </li>
    </ul>
  </div>
</header>
