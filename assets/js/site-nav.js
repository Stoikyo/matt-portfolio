(function () {
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');
  var closeMenu = function () {
    if (navLinks) navLinks.classList.remove('open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
  };

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var nextState = !navLinks.classList.contains('open');
      navLinks.classList.toggle('open', nextState);
      navToggle.setAttribute('aria-expanded', String(nextState));
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', function (event) {
      if (!navLinks.classList.contains('open')) return;
      var target = event.target;
      if (!(target instanceof Element)) return;
      if (!navLinks.contains(target) && target !== navToggle) closeMenu();
    });
  }
})();
