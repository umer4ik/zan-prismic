<script>
  import { isArabic } from "$lib/is-arabic";

  let { locale } = $props();
  const titles = {
    brand: 'All right reserved.',
    designedBy: 'Designed by',
    tos: 'Terms',
    pp: 'Privacy Policy',
  }
  const arabic = isArabic(locale);
  if (arabic) {
    titles.brand = ' جميع الحقوق محفوظة.'
    titles.tos = 'الشروط'
    titles.pp = 'سياسة الخصوصية'
    titles.designedBy = 'صممه'
  }
</script>

<div class="post-footer">
  <div class="post-footer__row">
    <div class="post-footer__copyright" style="{arabic ? 'direction: ltr; text-align: end;' : ''}">
      <span>© 2025 Zan Agency.</span> <span  style="direction: {arabic ? 'rtl' : 'ltr'}">{titles.brand}</span>
    </div>
    <div class="post-footer__tos-links">
      <a href="#">{titles.tos}</a>, <a href="#">{titles.pp}</a>
    </div>
    <div class="post-footer__obys">
      {titles.designedBy} <a target="_blank" href="https://obys.agency/">Obys</a>
    </div>
  </div>
</div>