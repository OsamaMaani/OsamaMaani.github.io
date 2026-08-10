/* Scroll reveal. Anything with .reveal fades up once when it enters view.
   If the visitor prefers reduced motion, everything is simply shown. */
(function () {
  var items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduced || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-in'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  items.forEach(function (el) { observer.observe(el); });
})();
