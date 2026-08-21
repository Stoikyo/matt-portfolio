(function () {
  var header = document.querySelector('[data-global-header]');
  var footer = document.querySelector('[data-global-footer]');

  if (header) {
    header.classList.add('chrome-header');
    header.innerHTML = '<div class="chrome-shell"><a class="chrome-mark" href="/">MG<span>.</span></a><nav class="chrome-nav" aria-label="Primary"><a href="/work/">Work</a><a href="/about/">About</a><a href="/services/">Services</a><a href="/#contact">Contact</a></nav></div>';
  }

  if (footer) {
    footer.classList.add('chrome-footer-wrap');
    footer.id = 'contact';
    footer.innerHTML = '<div class="chrome-footer"><div class="chrome-footer-cta"><p class="chrome-footer-eyebrow"><span class="availability-dot" aria-hidden="true"></span>Available for work</p><h2>Let\'s talk.</h2><p>Working on something and want a second brain? Looking to hire? Either way, drop me a line.</p><a class="chrome-footer-email" href="mailto:matt@matthewgrant.co">Send me an email</a><div class="chrome-footer-links"><a href="https://www.linkedin.com/in/tnargttam/" target="_blank" rel="noopener noreferrer">LinkedIn</a><a href="https://github.com/Stoikyo" target="_blank" rel="noopener noreferrer">GitHub</a></div></div></div>';
  }
})();
