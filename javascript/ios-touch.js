document.addEventListener('DOMContentLoaded', () => {
  let lastTouchEnd = 0;
  document.addEventListener(
    'touchend',
    (event) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    },
    { passive: false }
  );

  const interactiveElements = document.querySelectorAll('textarea, .searchEngine, .newTitleInput, .newTagsInput');
  interactiveElements.forEach((element) => {
    element.addEventListener('touchstart', (e) => {
      e.stopPropagation();
    });
  });

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  if (isIOS) {
    document.documentElement.style.height = '100%';
    document.body.style.height = '100%';
    document.body.style.position = 'fixed';
    document.body.style.overflow = 'hidden';
    document.body.style.width = '100%';

    const scrollableElements = document.querySelectorAll('.allNotesContainer, .tagsListContainer, .allArchivedNotesContainer, .openNotesContainer');
    scrollableElements.forEach((element) => {
      element.style.height = '100%';
      element.style.overflowY = 'scroll';
      element.style.WebkitOverflowScrolling = 'touch';
    });
  }

  const inputs = document.querySelectorAll('input, textarea');
  inputs.forEach((input) => {
    input.addEventListener('focus', () => {
      if (isIOS) {
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 300);
      }
    });
  });
});
