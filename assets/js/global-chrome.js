(function () {
  var header = document.querySelector('[data-global-header]');
  var footer = document.querySelector('[data-global-footer]');

  if (header) {
    header.classList.add('chrome-header');
    header.innerHTML = '<div class="chrome-shell"><a class="chrome-mark" href="/">MG<span>.</span></a><nav class="chrome-nav" aria-label="Primary"><a href="/work/">Work</a><a href="/about/">About</a><a href="/services/">Services</a><a href="/ai-overview/">AI overview</a><a href="/#contact">Contact</a></nav></div>';
  }

  if (footer) {
    footer.classList.add('chrome-footer-wrap');
    footer.innerHTML = '<div class="chrome-footer"><span>Melbourne, Australia</span><a href="#top">Back to top</a></div>';
  }
})();
