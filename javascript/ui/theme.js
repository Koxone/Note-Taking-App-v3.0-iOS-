//Function for dinamic created elements
export function applyThemeToDynamicContent(theme) {
  const elementsForLightMode = document.querySelectorAll(
    '.color, .background, .backgroundM, .imgContainer, #loginContainer, .src, textarea, .fill, .border, img, .stroke, footer, li, .footerButton, body, .spacer, .generalContainer, .mainContainer, .mainHeader, .noteCard'
  );

  localStorage.setItem('currentColorTheme', theme);

  if (theme === 'lightMode') {
    elementsForLightMode.forEach((element) => {
      switch (true) {
        case element.classList.contains('color'):
          element.style.color = 'black';
          break;

        case element.classList.contains('src'):
          changeSrc(element);
          break;

        case element.classList.contains('fill'):
          element.style.fill = 'black';
          break;

        case element.classList.contains('stroke'):
          element.style.stroke = 'black';
          break;

        case element.tagName === 'FOOTER':
          element.style.backgroundColor = 'white';
          break;

        case element.classList.contains('spacer'):
          element.style.background = 'rgba(224, 228, 234)';
          break;

        case element.classList.contains('generalContainer'):
          element.style.backgroundColor = 'white';
          break;

        case element.classList.contains('mainContainer'):
          element.style.backgroundColor = 'white';
          break;

        case element.tagName === 'BODY':
          element.style.color = 'black';
          break;

        case element.tagName === 'HEADER':
          element.style.backgroundColor = 'white';
          break;

        case element.classList.contains('noteCard'):
          element.style.borderBottom = '1px solid #e0e4ea';
          break;

        case element.classList.contains('footerButton'):
          element.classList.add('lightMode');
          break;

        case element.classList.contains('background'):
          element.style.backgroundColor = '#e0e4ea';
          break;

        case element.tagName === 'TEXTAREA':
          element.style.color = 'black';
          break;

        case element.classList.contains('imgContainer'):
          element.style.backgroundColor = 'white';
          break;

        case element.tagName === 'IMG' && element.classList.contains('src'):
          changeSrc(element);
          break;

        case element.classList.contains('border'):
          element.style.border = '1px solid #e0e4ea';
          break;
      }
    });
  } else if (theme === 'darkMode') {
    elementsForLightMode.forEach((element) => {
      switch (true) {
        case element.classList.contains('color'):
          element.style.color = 'white';
          element.classList.remove('lightMode');
          break;

        case element.classList.contains('src'):
          revertSrc(element);
          break;

        case element.classList.contains('fill'):
          element.style.fill = 'white';
          break;

        case element.classList.contains('stroke'):
          element.style.stroke = 'white';
          break;

        case element.tagName === 'FOOTER':
          element.style.backgroundColor = '#0e1218';
          break;

        case element.classList.contains('spacer'):
          element.style.background = '#232530';
          break;

        case element.classList.contains('mainContainer'):
          element.style.backgroundColor = '#232530'; //neutral 800
          break;

        case element.classList.contains('generalContainer'):
          element.style.backgroundColor = '#0e1218';
          break;

        case element.tagName === 'BODY':
          element.style.color = 'white';
          break;

        case element.classList.contains('mainContainer'):
          element.style.backgroundColor = '#232530';
          break;

        case element.classList.contains('newNoteHeader'):
          element.style.backgroundColor = '#0e1218';
          break;

        case element.classList.contains('noteCard'):
          element.style.borderBottom = '1px solid rgba(255, 255, 255, 0.04)';
          break;

        case element.classList.contains('footerButton'):
          element.classList.remove('lightMode');
          break;

        case element.classList.contains('background'):
          element.style.backgroundColor = '#0e1218';
          break;

        case element.classList.contains('backgroundM'):
          element.style.backgroundColor = '#2a3038';
          break;

        case element.classList.contains('imgContainer'):
          element.style.backgroundColor = '#0e1218';
          break;
      }
    });
  }
}

//Function to change SRC
export function changeSrc(element) {
  const toChangeSrc = element;
  const elementSrc = toChangeSrc.getAttribute('src');
  const newSrc = elementSrc.replace('darkMode', 'lightMode');
  toChangeSrc.setAttribute('src', newSrc);
}

//Function to revert SRC
export function revertSrc(element) {
  const toChangeSrc = element;
  const elementSrc = toChangeSrc.getAttribute('src');
  const newSrc = elementSrc.replace('lightMode', 'darkMode');
  toChangeSrc.setAttribute('src', newSrc);
}
