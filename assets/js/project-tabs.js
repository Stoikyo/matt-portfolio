(function () {
  var tabGroups = document.querySelectorAll('[data-project-tabs]');

  tabGroups.forEach(function (group) {
    var tabs = Array.prototype.slice.call(group.querySelectorAll('[role="tab"]'));
    var panels = Array.prototype.slice.call(group.querySelectorAll('[role="tabpanel"]'));

    if (!tabs.length || !panels.length) return;

    var activateTab = function (tab, moveFocus) {
      tabs.forEach(function (item) {
        var isActive = item === tab;
        var panelId = item.getAttribute('aria-controls');
        var panel = panelId ? group.querySelector('#' + panelId) : null;

        item.setAttribute('aria-selected', String(isActive));
        item.tabIndex = isActive ? 0 : -1;

        if (panel) {
          if (isActive) {
            panel.removeAttribute('hidden');
          } else {
            panel.setAttribute('hidden', '');
          }
        }
      });

      if (moveFocus) tab.focus();
    };

    tabs.forEach(function (tab, index) {
      tab.addEventListener('click', function () {
        activateTab(tab, false);
      });

      tab.addEventListener('keydown', function (event) {
        var nextIndex = index;

        if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') nextIndex = 0;
        if (event.key === 'End') nextIndex = tabs.length - 1;

        if (nextIndex !== index) {
          event.preventDefault();
          activateTab(tabs[nextIndex], true);
        }
      });
    });

    var defaultTab = tabs[0];
    activateTab(defaultTab, false);
  });
})();
