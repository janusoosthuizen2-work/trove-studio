/* Trove Studio: progressive enhancement only. No third-party services or tracking. */
(() => {
  'use strict';
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());

  const toggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('#primary-nav');
  if (toggle && nav) {
    const closeMenu = () => {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      toggle.textContent = '☰';
      nav.classList.remove('is-open');
    };
    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) { closeMenu(); return; }
      nav.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close menu');
      toggle.textContent = '×';
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeMenu();
    });
    document.addEventListener('click', event => {
      if (nav.classList.contains('is-open') && !nav.contains(event.target) && !toggle.contains(event.target)) closeMenu();
    });
  }

  const filters = [...document.querySelectorAll('[data-filter]')];
  const galleryCards = [...document.querySelectorAll('[data-category]')];
  const count = document.querySelector('[data-gallery-count]');
  if (filters.length && galleryCards.length) {
    filters.forEach(filter => filter.addEventListener('click', () => {
      const selected = filter.dataset.filter;
      filters.forEach(item => item.setAttribute('aria-pressed', String(item === filter)));
      let visible = 0;
      galleryCards.forEach(card => {
        const show = selected === 'all' || card.dataset.category === selected;
        card.hidden = !show;
        if (show) visible++;
      });
      if (count) count.textContent = `SHOWING ${visible} ${visible === 1 ? 'PIECE' : 'PIECES'}`;
    }));
  }

  const dialog = document.querySelector('#art-dialog');
  if (dialog && typeof dialog.showModal === 'function') {
    const photo = dialog.querySelector('#dialog-photo');
    const title = dialog.querySelector('#dialog-title');
    const style = dialog.querySelector('#dialog-style');
    const close = dialog.querySelector('[data-dialog-close]');
    document.querySelectorAll('[data-lightbox-image]').forEach(card => {
      card.addEventListener('click', () => {
        photo.src = card.dataset.lightboxImage;
        photo.alt = card.dataset.lightboxAlt || '';
        title.textContent = card.dataset.lightboxTitle || '';
        style.textContent = card.dataset.lightboxStyle || '';
        dialog.showModal();
      });
    });
    if (close) close.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener('close', () => photo.removeAttribute('src'));
  }

  const form = document.getElementById('enquiry-form');
  if (form) {
    const feedback = form.querySelector('#form-feedback');
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.checkValidity()) {
        if (feedback) feedback.textContent = 'Please enter your name and tattoo idea first.';
        form.reportValidity();
        return;
      }
      const read = id => (form.querySelector('#' + id)?.value || '').trim();
      const lines = [
        'Hi Decan, I would like to enquire about a tattoo.',
        '',
        `Name: ${read('full-name')}`,
        `Idea: ${read('idea')}`,
      ];
      if (read('placement')) lines.push(`Placement: ${read('placement')}`);
      if (read('size')) lines.push(`Approximate size: ${read('size')}`);
      if (read('availability')) lines.push(`Preferred timing: ${read('availability')}`);
      lines.push('', 'Please let me know how we can discuss the next steps.');
      const message = encodeURIComponent(lines.join('\n'));
      const url = `https://wa.me/27625638490?text=${message}`;
      // Open only following a direct click, and never collect or store visitor data.
      window.open(url, '_blank', 'noopener,noreferrer');
      if (feedback) feedback.textContent = 'WhatsApp should open in a new tab. Review your message before sending. If blocked, use the direct contact link.';
    });
  }
})();
