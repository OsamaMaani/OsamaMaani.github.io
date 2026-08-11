/* Scroll behaviour.
   .reveal  — fades up once when it enters view
   .seq     — same, but its children cascade (uses --n on each child)
   .loop    — each stage lights up as it reaches the middle of the screen
   Everything is skipped for visitors who prefer reduced motion. */
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var items = document.querySelectorAll('.reveal');
  var steps = document.querySelectorAll('.loop__step');

  /* --- reveal on enter --- */
  if (items.length) {
    if (reduced || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-in'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
      items.forEach(function (el) { io.observe(el); });
    }
  }

  /* --- light the delivery stages as they pass the middle of the viewport --- */
  if (!steps.length || reduced) return;

  var ticking = false;

  function paint() {
    ticking = false;
    var mid = window.innerHeight * 0.55;
    steps.forEach(function (step) {
      var box = step.getBoundingClientRect();
      var lit = box.top < mid && box.bottom > 0;
      step.classList.toggle('is-lit', lit);
    });
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(paint);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  paint();
})();
