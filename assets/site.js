/* Prano — shared behaviour for inner pages: mobile menu + back to top */
(function () {
  var burger = document.getElementById('burger'), panel = document.getElementById('mnav'), nav = document.querySelector('.snav');
  if (burger && panel) {
    var open = function (v) {
      panel.hidden = !v;
      burger.setAttribute('aria-expanded', v);
      burger.setAttribute('aria-label', v ? 'Close menu' : 'Open menu');
      document.body.classList.toggle('locked', v);
      if (nav) nav.classList.toggle('menuopen', v);
      if (v) { panel.querySelector('a').focus(); } else { burger.focus(); }
    };
    burger.addEventListener('click', function () { open(panel.hidden); });
    panel.addEventListener('click', function (e) { if (e.target.closest('a')) open(false); });
    addEventListener('keydown', function (e) { if (e.key === 'Escape' && !panel.hidden) open(false); });
    addEventListener('resize', function () { if (innerWidth > 620 && !panel.hidden) open(false); });
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
