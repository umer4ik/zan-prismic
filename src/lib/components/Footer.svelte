<script lang="ts">
  interface Props {
    phone?: string | null;
    email?: string | null;
    address?: string | null;
    instagram?: string | null;
    twitter?: string | null;
  }
  const { phone, email, address, instagram, twitter }: Props = $props();
</script>

<div class="footer">
  {#if phone}
    <div class="footer__row">
      <div class="footer__dt braced">(Phone)</div>
      <a href="tel:{phone}" class="footer__dd">{phone}</a>
    </div>
  {/if}
  {#if email}
    <div class="footer__row">
      <div class="footer__dt braced">(Email)</div>
      <a href="mailto:{email}" class="footer__dd">{email}</a>
    </div>
  {/if}
  {#if address}
    <div class="footer__row">
      <div class="footer__dt braced">(Address)</div>
      <div class="footer__dd">Based in Riyadh, Saudi Arabia get directions</div>
    </div>
  {/if}
  <div class="footer__row">
    <div class="footer__dt braced">(Company)</div>
    <div class="footer__dd">
      <a href="#">(Company)</a>
      <a href="#">Works</a>
      <a href="#">Services</a>
      <a href="#">About Us</a>
    </div>
  </div>
  {#if instagram || twitter}
    <div class="footer__row">
      <div class="footer__dt braced">(Social)</div>
      <div class="footer__dd">
        {#if instagram}
          <a href={instagram} target="_blank">Instagram</a>
        {/if}
        {#if twitter}
          <a href={twitter} target="_blank">X</a>
        {/if}
      </div>
    </div>
  {/if}
  <div class="footer__row mobile">
    <div class="footer__dt braced">© {new Date().getFullYear()} Zan Agency. All right reserved.</div>
    <div class="footer__dd">
      <div class="footer__toc-links"><a href="#">Terms</a>, <a href="#">Privacy Policy</a></div>
      <div>Designed by <a href="https://obys.agency/" target="_blank">Obys</a></div>
    </div>
  </div>

  <div class="footer__canvas-box"></div>
</div>
