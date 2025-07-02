<script>
  const {
    mail,
  } = $props();
</script>
<div class="pre-footer">
  <div class="pre-footer__content">
    <div class="pre-footer__logo">
      <img src="/footer-logo.svg" alt="">
    </div>
    <div class="pre-footer__copyright mobile">
      ©{(new Date()).getFullYear()}
    </div>
    <div class="pre-footer__text">
      <p>
        Zan Agency is a brand development firm that works in thought and in action: <a href="mailto:{mail}">{mail}</a>  
      </p>
    </div>
    <div class="pre-footer__button-box">
      <a href="mailto:{mail}">
        Send us an E-mail!
        <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.999771 6H10.2424M10.2424 6L5.62109 1.37868M10.2424 6L5.62109 10.6213" stroke="#33092E" stroke-width="1.4"/>
        </svg>
      </a>
      <div class="pre-footer__copyright">
        ©{(new Date()).getFullYear()}
      </div>
    </div>
  </div>
</div>