<script lang="ts">
    import { isArabic } from "$lib/is-arabic";

  interface Props {
    phone?: string | null;
    email?: string | null;
    address?: string | null;
    instagram?: string | null;
    twitter?: string | null;
    locale: string
    phoneTitle?: string | null;
    emailTitle?: string | null;
    addressTitle?: string | null;
    companyTitle?: string | null;
    socialTitle?: string | null;
  }
  const {
    phone,
    email,
    address,
    instagram,
    twitter,
    locale,
    phoneTitle,
    emailTitle,
    addressTitle,
    companyTitle,
    socialTitle
  }: Props = $props();

  const titles = {
    phone: phoneTitle ?? 'Phone',
    email: emailTitle ?? 'Email',
    address: addressTitle ?? 'Address',
    location: 'Based in Riyadh, Saudi Arabia',
    company: companyTitle ?? 'Company',
    works: 'Works',
    services: 'Services',
    aboutUs: 'About Us',
    social: socialTitle ?? 'Social',
    instagram: 'Instagram',
    copyright: `© ${new Date().getFullYear()} Zan Agency. All right reserved.`,
    designedBy: 'Designed by',
    tos: 'Terms',
    pp: 'Privacy Policy',
    contactUs: 'Contact Us'
  }
  const arabic = isArabic(locale)
  if (arabic) {
    titles.phone = phoneTitle ?? 'الهاتف'
    titles.email = emailTitle ?? 'البريد الإلكتروني'
    titles.address = addressTitle ?? 'العنوان'
    titles.location = 'مقرها في الرياض، المملكة العربية السعودية الحصول على الاتجاهات'
    titles.company = companyTitle ?? 'الشركة'
    titles.works = 'الأعمال'
    titles.services = 'الخدمات'
    titles.aboutUs = 'نبذة عنا'
    titles.contactUs = 'اتصل بنا'
    titles.social = socialTitle ?? 'اجتماعي'
    titles.instagram = 'إنستغرام'
    titles.copyright = `© ${new Date().getFullYear()} Zan Agency. جميع الحقوق محفوظة.`
    titles.tos = 'الشروط'
    titles.pp = 'سياسة الخصوصية'
    titles.designedBy = 'صممه'
  }
</script>

<div class="footer" data-scroll data-scroll-id="footer">
  {#if phone}
    <div class="footer__row">
      <div class="footer__dt braced">({titles.phone})</div>
      <a href="tel:{phone}" class="footer__dd phone">{phone}</a>
    </div>
  {/if}
  {#if email}
    <div class="footer__row">
      <div class="footer__dt braced">({titles.email})</div>
      <a href="mailto:{email}" class="footer__dd">{email}</a>
    </div>
  {/if}
  {#if address}
    <div class="footer__row">
      <div class="footer__dt braced">({titles.address})</div>
      <div class="footer__dd">{titles.location}</div>
    </div>
  {/if}
  <div class="footer__row">
    <div class="footer__dt braced">({titles.company})</div>
    <div class="footer__dd">
      <a href="#" data-scroll-to=".works">{titles.works}</a>
      <a href="#" data-scroll-to=".services">{titles.services}</a>
      <a href="#" data-scroll-to=".about-us">{titles.aboutUs}</a>
      <a href="mailto:{email}">{titles.contactUs}</a>
    </div>
  </div>
  {#if instagram || twitter}
    <div class="footer__row">
      <div class="footer__dt braced">({titles.social})</div>
      <div class="footer__dd">
        {#if instagram}
          <a href={instagram} target="_blank">{titles.instagram}</a>
        {/if}
        {#if twitter}
          <a href={twitter} target="_blank">X</a>
        {/if}
      </div>
    </div>
  {/if}
  <div class="footer__row mobile">
    <div class="footer__dt braced">{titles.copyright}</div>
    <div class="footer__dd">
      <div class="footer__toc-links"><a href="#">{titles.tos}</a>, <a href="#">{titles.pp}</a></div>
      <div>{titles.designedBy} <a href="https://obys.agency/" target="_blank">Obys</a></div>
    </div>
  </div>

  <div class="footer__canvas-box"></div>
</div>
