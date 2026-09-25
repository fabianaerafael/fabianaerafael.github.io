(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  const moreButton = document.querySelector('.nav-more');
  const dropdown = document.querySelector('.nav-dropdown');
  if (!menuButton || !nav || !moreButton || !dropdown) return;

  function closeMore() { moreButton.setAttribute('aria-expanded', 'false'); }
  function closeMenu() {
    nav.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    closeMore();
  }

  menuButton.addEventListener('click', () => {
    const opening = !nav.classList.contains('is-open');
    nav.classList.toggle('is-open', opening);
    menuButton.setAttribute('aria-expanded', String(opening));
    if (!opening) closeMore();
  });
  moreButton.addEventListener('click', () => {
    moreButton.setAttribute('aria-expanded', String(moreButton.getAttribute('aria-expanded') !== 'true'));
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.topbar')) closeMenu();
    else if (!event.target.closest('.nav-dropdown')) closeMore();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      const wasOpen = nav.classList.contains('is-open');
      closeMenu();
      if (wasOpen) menuButton.focus();
      else if (dropdown.contains(document.activeElement)) moreButton.focus();
    }
  });
  nav.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1000) closeMenu();
  });
})();
