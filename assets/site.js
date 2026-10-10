/* Prano — shared behaviour for inner pages: mobile menu + back to top */
(function () {
  var burger = document.getElementById('burger'), panel = document.getElementById('mnav'), nav = document.querySelector('.snav');
  if (burger && panel) {
    var lockY = 0;
    var open = function (v) {
      if (v) { lockY = window.scrollY; document.body.style.top = (-lockY) + 'px'; }
      panel.hidden = !v;
      burger.setAttribute('aria-expanded', v);
      burger.setAttribute('aria-label', v ? 'Close menu' : 'Open menu');
      document.body.classList.toggle('locked', v);
      if (nav) nav.classList.toggle('menuopen', v);
      if (!v) { document.body.style.top = ''; window.scrollTo(0, lockY); }
      if (v) { panel.querySelector('a').focus(); } else { burger.focus({ preventScroll: true }); }
    };
    burger.addEventListener('click', function () { open(panel.hidden); });
    panel.addEventListener('click', function (e) { if (e.target.closest('a')) open(false); });
    addEventListener('keydown', function (e) { if (e.key === 'Escape' && !panel.hidden) open(false); });
    addEventListener('resize', function () { if (innerWidth > 820 && !panel.hidden) open(false); });
  }
  var top = document.getElementById('totop');
  if (top) {
    addEventListener('scroll', function () { top.classList.toggle('show', scrollY > 900); }, { passive: true });
    top.addEventListener('click', function () {
      var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
      scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
      var lock = document.querySelector('.snav .lock'); if (lock) lock.focus({ preventScroll: true });
    });
  }
})();

/* A table that scrolls sideways must be reachable by keyboard (WCAG 2.1.1),
   and should say so to a screen reader rather than silently clipping. */
(function () {
  var tables = document.querySelectorAll('.prose table');
  for (var i = 0; i < tables.length; i++) {
    (function (t) {
      var sync = function () {
        if (t.scrollWidth > t.clientWidth + 1) {
          t.setAttribute('tabindex', '0');
          t.setAttribute('role', 'region');
          if (!t.getAttribute('aria-label')) t.setAttribute('aria-label', 'Table, scrolls sideways');
        } else {
          t.removeAttribute('tabindex');
          t.removeAttribute('role');
          t.removeAttribute('aria-label');
        }
      };
      sync();
      addEventListener('resize', sync);
    })(tables[i]);
  }
})();
