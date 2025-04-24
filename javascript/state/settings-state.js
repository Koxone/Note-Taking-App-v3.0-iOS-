export let currentFontFamily = localStorage.getItem('currentFontFamily') || 'Inter';
export let currentColorTheme = localStorage.getItem('currentColorTheme') || 'Dark Mode';

export function setColorTheme(newTheme) {
  currentColorTheme = newTheme;
  localStorage.setItem('currentColorTheme', newTheme);
}

export function setFontFamily(newFont) {
  currentFontFamily = newFont;
  localStorage.setItem('currentFontFamily', newFont);
}
