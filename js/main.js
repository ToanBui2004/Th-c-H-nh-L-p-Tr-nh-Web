// Shared JS for the site
console.log('main.js loaded');
document.addEventListener('DOMContentLoaded', function () {
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
  // Smooth scroll for same-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = this.getAttribute('href');
      if (!id || id === '#' || id.length <= 1) return;
      var target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Posts slideshow: rotate .post-card elements inside .posts-grid
  // Posts are displayed as a static grid now; slideshow/carousel logic removed.
});


