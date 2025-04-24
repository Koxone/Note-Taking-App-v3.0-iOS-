import { applyThemeToDynamicContent } from '../ui/theme.js';
import { currentColorTheme, currentFontFamily, setColorTheme, setFontFamily } from '../state/settings-state.js';
import { showRecoverPasswordScreen } from '../auth-js/events/resetPasswordEvents.js';

//Function to change Font And Color Theme
export function changeFontOrColorTheme() {
  const applyButton = document.getElementById('applyButton');
  const resetButton = document.getElementById('resetButton');
  const elements = document.querySelectorAll('body, .backButtonText, .generalContainer, .imgContainer, .mainContainer, header, .spacer, li, .settingsButton');

  let fontFamilySelection = currentFontFamily;
  let colorThemeSelection = currentColorTheme;

  document.addEventListener('click', (event) => {
    if (!((event.target.closest('label') && event.target.closest('.font')) || (event.target.closest('label') && event.target.closest('.color')))) {
      return;
    }

    let label = event.target.closest('label');
    let innerText = label.querySelector('.top');

    if (!innerText) return;

    //Change Font Theme
    if (event.target.closest('label') && event.target.closest('.font')) {
      switch (innerText.textContent) {
        case 'Sans-serif':
          fontFamilySelection = 'Open Sans, sans-serif';
          break;
        case 'Serif':
          fontFamilySelection = 'PT Serif, serif';
          break;
        case 'Monospace':
          fontFamilySelection = 'Space Mono, monospace';
          break;
      }

      //Switch Color Theme
    } else if (event.target.closest('label') && event.target.closest('.color')) {
      switch (innerText.textContent) {
        case 'Light Mode':
          colorThemeSelection = 'lightMode';
          break;
        case 'Dark Mode':
          colorThemeSelection = 'darkMode';
          break;
        case 'System':
          const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
          colorThemeSelection = prefersDarkMode ? 'darkMode' : 'lightMode';
          break;
      }
    }
  });

  if (applyButton && resetButton) {
    applyButton.addEventListener('click', () => {
      const openSettingContainer = document.querySelector('.openSettingContainer');

      if (!openSettingContainer) return;
      const mainHeader = document.querySelector('.mainHeader');
      mainHeader.style.backgroundColor = 'rgb(35, 37, 48)';

      if (openSettingContainer.classList.contains('colorSettings')) {
        localStorage.setItem('currentColorTheme', colorThemeSelection);
        setColorTheme(colorThemeSelection);
        applyThemeToDynamicContent(colorThemeSelection);
      } else if (openSettingContainer.classList.contains('fontSettings')) {
        localStorage.setItem('currentFontFamily', fontFamilySelection);
        setFontFamily(fontFamilySelection);
        document.body.style.fontFamily = fontFamilySelection;
      }
    });

    resetButton.addEventListener('click', () => {
      const openSettingContainer = document.querySelector('.openSettingContainer');
      const radios = document.querySelectorAll('input[type="radio"]');
      radios.forEach((radio) => {
        radio.checked = false;
      });

      if (!openSettingContainer) return;

      if (openSettingContainer.classList.contains('colorSettings')) {
        colorThemeSelection = 'darkMode';
        localStorage.setItem('currentColorTheme', 'darkMode');
        setColorTheme('darkMode');
        const mainHeader = document.querySelector('.mainHeader');
        mainHeader.style.backgroundColor = 'rgb(35, 37, 48)';
        applyThemeToDynamicContent('darkMode');
      } else if (openSettingContainer.classList.contains('fontSettings')) {
        fontFamilySelection = 'Inter';
        localStorage.setItem('currentFontFamily', 'Inter');
        setFontFamily('Inter');
        document.body.style.fontFamily = 'Inter';
      }
    });
  }
}
changeFontOrColorTheme();

//Function for Go back to Settings Button
function goBackToSettingsButton() {
  const backToSettingsButton = document.querySelectorAll('.backToSettingsButton');

  if (backToSettingsButton) {
    backToSettingsButton.forEach((button) => {
      button.addEventListener('click', () => {
        const mainSettingsScreen = document.querySelector('.settingsMenu');
        const openSettingsScreen = document.querySelector('.openSettingContainer');
        const settingsTitle = document.querySelector('.stitleContainer');

        const settingsButton = document.getElementById('settingsButton');
        settingsButton.click();

        resetPasswordContainer.style.display = 'none';
        mainSettingsScreen.style.display = 'flex';
        settingsTitle.style.display = 'flex';
        openSettingsScreen.style.display = 'none';
        document.body.style.fontFamily = 'Inter';
      });
    });
  }
}
goBackToSettingsButton();

//Function open Settings Options
function showSettingsOptions() {
  document.addEventListener('click', (event) => {
    const button = event.target.closest('.settingsButton');

    if (button) {
      const buttonDataSection = button.getAttribute('data-section');
      const mainSettingsScreen = document.querySelector('.settingsMenu');
      const openSettingsScreen = document.querySelector('.openSettingContainer');
      const settingsTitle = document.querySelector('.stitleContainer');

      const images = document.querySelectorAll('#option1Img, #option2Img, #option3Img');
      const tops = document.querySelectorAll('.top');
      const bottoms = document.querySelectorAll('.bottom');
      const options = document.querySelectorAll('.option');

      switch (buttonDataSection) {
        case 'color':
          options.forEach((option) => {
            if (option.classList.contains('font')) {
              option.classList.remove('font');
              option.classList.add('color');
            } else {
              option.classList.add('color');
            }
          });

          if (openSettingsScreen.classList.contains('fontSettings')) {
            openSettingsScreen.classList.remove('fontSettings');
            openSettingsScreen.classList.add('colorSettings');
          } else {
            openSettingsScreen.classList.add('colorSettings');
          }

          images.forEach((image, index) => {
            switch (index) {
              case 0:
                image.src = './assets/images/icon-sun-darkMode.svg';
                break;

              case 1:
                image.src = './assets/images/icon-moon-darkMode.svg';
                break;

              case 2:
                image.src = './assets/images/icon-system-theme-darkMode.svg';
                break;
            }
          });

          tops.forEach((top, index) => {
            switch (index) {
              case 0:
                top.textContent = 'Light Mode';
                break;

              case 1:
                top.textContent = 'Dark Mode';
                break;

              case 2:
                top.textContent = 'System';
                break;
            }
          });

          bottoms.forEach((bottom, index) => {
            switch (index) {
              case 0:
                bottom.textContent = 'Pick a clean and classic light theme';
                break;

              case 1:
                bottom.textContent = 'Select a sleek and modern dark theme';
                break;

              case 2:
                bottom.textContent = 'Adapts to your devices theme';
                break;
            }
          });

          mainSettingsScreen.style.display = 'none';
          settingsTitle.style.display = 'none';
          openSettingsScreen.style.display = 'flex';
          break;

        case 'font':
          options.forEach((option) => {
            if (option.classList.contains('color')) {
              option.classList.remove('color');
              option.classList.add('font');
            } else {
              option.classList.add('font');
            }
          });

          if (openSettingsScreen.classList.contains('colorSettings')) {
            openSettingsScreen.classList.remove('colorSettings');
            openSettingsScreen.classList.add('fontSettings');
          } else {
            openSettingsScreen.classList.add('fontSettings');
          }
          const settingNameTitle = document.getElementById('settingNameTitle');
          const settingNameSubtitle = document.getElementById('settingNameSubtitle');

          settingNameTitle.textContent = 'Font';
          settingNameSubtitle.textContent = 'font';

          images.forEach((image, index) => {
            switch (index) {
              case 0:
                image.src = './assets/images/icon-font-sans-serif-darkMode.svg';
                break;

              case 1:
                image.src = './assets/images/icon-font-serif-darkMode.svg';
                break;

              case 2:
                image.src = './assets/images/icon-font-monospace-darkMode.svg';
                break;
            }
          });

          tops.forEach((top, index) => {
            switch (index) {
              case 0:
                top.textContent = 'Sans-serif';
                break;

              case 1:
                top.textContent = 'Serif';
                break;

              case 2:
                top.textContent = 'Monospace';
                break;
            }
          });

          bottoms.forEach((bottom, index) => {
            switch (index) {
              case 0:
                bottom.textContent = 'Clean and modern, easy to read.';
                break;

              case 1:
                bottom.textContent = 'Classic and elegant for a timeless feel.';
                break;

              case 2:
                bottom.textContent = 'Code-like, great for a technical vibe.';
                break;
            }
          });

          mainSettingsScreen.style.display = 'none';
          settingsTitle.style.display = 'none';
          openSettingsScreen.style.display = 'flex';
          break;
      }
    }
    applyThemeToDynamicContent(currentColorTheme);
  });
}
showSettingsOptions();

//Function
function changePasswordHandler() {
  document.addEventListener('click', (event) => {
    const button = event.target.closest('.settingsButton[data-section="changePassword"]');
    if (!button) return;

    const settingsContainer = document.getElementById('settingsContainer');
    if (settingsContainer) {
      settingsContainer.style.display = 'none';
    }

    const subtitleTextReset = document.getElementById('subtitleTextReset');
    const titleTextReset = document.getElementById('titleTextReset');
    const titleContainerReset = document.getElementById('titleContainerReset');
    const resetPasswordContainer = document.getElementById('resetPasswordContainer');
    const backToSettingsButton = document.querySelector('.backToSettingsButton');

    // backToSettingsButton.style.display = 'flex';
    subtitleTextReset.style.display = 'flex';
    titleTextReset.style.display = 'flex';
    titleContainerReset.style.display = 'flex';
    titleContainerReset.style.flexDirection = 'column';

    if (resetPasswordContainer) {
      resetPasswordContainer.style.display = 'flex';
      resetPasswordContainer.style.flexDirection = 'column';
    }
  });
}

export function registerSettingsEvents() {
  showSettingsOptions();
  changeFontOrColorTheme();
  changePasswordHandler();
}
