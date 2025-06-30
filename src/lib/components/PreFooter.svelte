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
      </a>
      <div class="pre-footer__copyright">
        ©{(new Date()).getFullYear()}
      </div>
    </div>
  </div>
</div>