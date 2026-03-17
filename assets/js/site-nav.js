(function () {
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');
  var sectionIds = ['projects', 'about', 'contact'];
  var navItems = navLinks ? Array.prototype.slice.call(navLinks.querySelectorAll('a[href^="#"]')) : [];

  var setActiveNav = function (id) {
    navItems.forEach(function (link) {
      var isActive = link.getAttribute('href') === '#' + id;
      if (isActive) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

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

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeMenu();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 768) closeMenu();
    });
  }

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        setActiveNav(entry.target.id);
      });
    }, {
      rootMargin: '-35% 0px -55% 0px',
      threshold: 0
    });

    sectionIds.forEach(function (id) {
      var section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  } else {
    var setFromHash = function () {
      var id = window.location.hash.replace('#', '');
      if (sectionIds.indexOf(id) !== -1) {
        setActiveNav(id);
      }
    };

    window.addEventListener('hashchange', setFromHash);
    setFromHash();
  }
})();
