export function toolTipHandler() {
  const socialButton = document.querySelector('.socialButton');
  const tooltip = document.querySelector('.toolTipContainer');

  if (!socialButton || !tooltip) return;

  socialButton.addEventListener('mouseenter', () => {
    tooltip.style.display = 'block';
  });

  socialButton.addEventListener('mouseleave', () => {
    tooltip.style.display = 'none';
  });
}

toolTipHandler();
