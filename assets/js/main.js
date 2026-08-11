/* Scroll behaviour.
   .reveal  — fades up once when it enters view
   .seq     — same, but its children cascade (uses --n on each child)
   .loop    — each stage lights up while it sits in the middle band
   .arch    — the wire animation only runs while the diagram is on screen

   No scroll listener and no getBoundingClientRect anywhere: reading
   layout on every frame forces a synchronous reflow, which Firefox pays
   for far more visibly than Chromium does. IntersectionObserver does the
   same job off the main thread.

   Everything is skipped for visitors who prefer reduced motion. */
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var items = document.querySelectorAll('.reveal');
  var steps = document.querySelectorAll('.loop__step');
  var arch  = document.querySelector('.arch');

  /* No observer support, or the visitor asked for stillness: show
     everything in its final state and leave. */
  if (reduced || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-in'); });
    return;
  }

  /* --- reveal on enter (fires once per element, then stops watching) --- */
  if (items.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    items.forEach(function (el) { io.observe(el); });
  }

  /* --- light each delivery stage while it passes the middle of the screen ---
     Observing .loop__card rather than .loop__step: the step is
     display:contents and generates no box, so it can't be measured or
     observed reliably. Cropping the root by 45% top and bottom leaves a
     thin band across the centre — "intersecting" then means "currently
     in the middle of the viewport". */
  if (steps.length) {
    var lit = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var step = e.target.parentNode;
        if (step && step.classList.contains('loop__step')) {
          step.classList.toggle('is-lit', e.isIntersecting);
        }
      });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

    steps.forEach(function (step) {
      var card = step.querySelector('.loop__card');
      if (card) lit.observe(card);
    });
  }

  /* --- only animate the architecture wires while they're visible ---
     stroke-dashoffset repaints on the main thread, so leaving it running
     forever costs frames on a page that has nothing to do with it. */
  if (arch) {
    var live = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        arch.classList.toggle('is-live', e.isIntersecting);
      });
    }, { threshold: 0 });

    live.observe(arch);
  }
})();
