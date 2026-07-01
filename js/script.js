/* =========================================================
   NM Full Stack — shared script
   Handles: active nav link detection, back-to-top button,
   navbar shrink shadow on scroll, accordion auto-open via
   URL hash.
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- 1. Highlight the current page in navbar + footer ---- */
  var current = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('a.nav-link, a.foot-link').forEach(function (link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var page = href.split('/').pop();
    if (page === current) {
      link.classList.add('active');
      if (link.classList.contains('nav-link')) {
        link.setAttribute('aria-current', 'page');
      }
    }
  });

  /* ---- 2. Back-to-top button ---- */
  var backBtn = document.getElementById('backToTop');
  if (backBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 480) {
        backBtn.classList.add('show');
      } else {
        backBtn.classList.remove('show');
      }
    });
    backBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---- 3. Navbar background intensifies after scrolling ---- */
  var nav = document.querySelector('.nm-navbar');
  if (nav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 8) {
        nav.style.boxShadow = '0 12px 30px -20px rgba(0,0,0,.8)';
      } else {
        nav.style.boxShadow = 'none';
      }
    });
  }

  /* ---- 4. Open a specific accordion item if URL has #q-id ---- */
  if (window.location.hash) {
    var target = document.querySelector(window.location.hash);
    if (target && target.classList.contains('accordion-collapse')) {
      var collapse = new bootstrap.Collapse(target, { show: true });
      setTimeout(function () {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  }

  /* ---- 5. Simple "copied" feedback for code blocks (optional nicety) ---- */
  document.querySelectorAll('.qa-accordion pre').forEach(function (block) {
    block.addEventListener('click', function () {
      var text = block.innerText;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(function () {
          block.style.outline = '1px solid var(--brand-2)';
          setTimeout(function () { block.style.outline = 'none'; }, 500);
        });
      }
    });
    block.style.cursor = 'pointer';
    block.title = 'Click to copy';
  });

});
