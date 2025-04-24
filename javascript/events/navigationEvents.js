import { searchNotes } from './searchEvents.js';
import { currentColorTheme } from '../state/settings-state.js';
import { revertSrc, changeSrc } from '../ui/theme.js';
import { currentFontFamily } from '../state/settings-state.js';
import { setCurrentUser } from '../state/session-state.js';
import { updateUserNotes } from '../state/note-state.js';
import { updateUi } from '../ui/note-list.js';
import { showNotesByTag } from '../ui/note-list.js';
import { getCurrentUser } from '../state/session-state.js';
import { showRecoverPasswordScreen } from '../auth-js/events/resetPasswordEvents.js';
import { loginHandler, registerLoginEvents } from '../auth-js/events/loginEvents.js';

//Function to load notes from with login
export function loadInitialState() {
  window.addEventListener('DOMContentLoaded', () => {
    const allNotesContainer = document.getElementById('allNotesContainer');
    const titleContainer = document.getElementById('titleContainer');
    const openNotes = document.querySelectorAll('.openNoteContainer');
    const archivedNotesScreen = document.querySelector('.archivedNotesContainer');
    const subtitle = document.querySelector('.archivedNotesSubtitle');
    const logoText = document.querySelector('.logoText');
    const goBackToTags = document.querySelector('.goBackToTags');
    const allArchivedNotesContainer = document.getElementById('allArchivedNotesContainer');
    const loginContainer = document.getElementById('loginContainer');
    const newNoteButton = document.getElementById('newNoteButton');
    const mainHeader = document.querySelector('.mainHeader');
    const footer = document.querySelector('footer');
    const signUpContainer = document.getElementById('signUpContainer');
    const titleText = document.getElementById('titleText');
    const forgotPasswordContainer = document.getElementById('forgotPasswordContainer');
    const titleTextForgot = document.getElementById('titleTextForgot');
    const subtitleTextForgot = document.getElementById('subtitleTextForgot');
    const titleContainerForgot = document.getElementById('titleContainerForgot');
    const subtitleTextReset = document.getElementById('subtitleTextReset');
    const titleTextReset = document.getElementById('titleTextReset');
    const titleContainerReset = document.getElementById('titleContainerReset');
    const resetPasswordContainer = document.getElementById('resetPasswordContainer');

    const user = getCurrentUser();

    if (user) {
      allNotesContainer.style.display = 'flex'; //flex
      titleContainer.style.display = 'flex'; //flex
      titleContainer.style.flexDirection = 'column'; //column
      loginContainer.style.display = 'none'; //none
      forgotPasswordContainer.style.display = 'none'; //none
      resetPasswordContainer.style.display = 'none'; //none
      signUpContainer.style.display = 'none'; //none
      loginContainer.style.flexDirection = 'column';
      newNoteButton.style.display = 'flex';
      mainHeader.style.display = 'flex';
      footer.style.display = 'flex';
      titleText.style.display = 'flex';
      document.querySelector('.generalContainer').style.justifyContent = 'flexStart';
      document.querySelector('.mainContainer').style.backgroundColor = '#232530'; //Neutral 800
    } else {
      resetPasswordContainer.style.display = 'none'; //none
      resetPasswordContainer.style.flexDirection = 'column';
      forgotPasswordContainer.style.display = 'none'; //none
      document.querySelector('.generalContainer').style.justifyContent = 'center';
      titleTextForgot.style.display = 'flex'; //flex
      titleContainerForgot.style.display = 'flex'; //flex
      titleContainerForgot.style.flexDirection = 'column'; //column
      subtitleTextForgot.style.display = 'flex'; //flex
      subtitleTextReset.style.display = 'flex'; //flex
      titleTextReset.style.display = 'flex'; //flex
      titleContainerReset.style.display = 'flex'; //flex
      titleContainerReset.style.flexDirection = 'column'; //column

      document.querySelector('.mainContainer').style.backgroundColor = '#2a3038';

      forgotPasswordContainer.style.flexDirection = 'column'; //column
      titleContainer.style.flexDirection = 'column'; //column
      loginContainer.style.display = 'flex'; //flex
      allNotesContainer.style.display = 'none'; //none
      titleContainer.style.display = 'none'; //none
      signUpContainer.style.display = 'none'; //none
      loginContainer.style.flexDirection = 'column'; //column
      newNoteButton.style.display = 'none'; //none
      mainHeader.style.display = 'none'; //none
      footer.style.display = 'none'; //none
      titleText.style.display = 'none'; //none
    }

    if (allArchivedNotesContainer) {
      allArchivedNotesContainer.style.display = 'none'; //none
    }

    const elementsForLightMode = document.querySelectorAll(
      '.color, .src, footer, .footerButton, .border, .backImgModal, .fill, .backgroundM, .background, .imgContainer, img, .newNoteHeader, .stroke, body, .spacer, .generalContainer, .mainContainer, .mainHeader, .noteCard'
    );

    if (goBackToTags) {
      goBackToTags.style.display = 'none'; //none
    }

    if (elementsForLightMode) {
      elementsForLightMode.forEach((element) => {
        if (currentColorTheme === 'lightMode') {
          switch (true) {
            case element.classList.contains('color'):
              element.style.color = 'black';
              element.classList.add('lightMode');
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
              element.style.boxShadow = 'none';
              break;

            case element.classList.contains('spacer'):
              element.style.background = 'rgba(224, 228, 234)';
              break;

            case element.classList.contains('mainContainer'):
              element.style.backgroundColor = 'white';
              break;

            case element.classList.length === 1 && element.classList.contains('generalContainer'):
              element.style.backgroundColor = 'white';
              break;

            case element.classList.length === 2 && element.classList.contains('generalContainer') && element.classList.contains('border'):
              element.style.border = '1px solid black';
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

            case element.classList.contains('imgContainer'):
              element.style.backgroundColor = 'white';
              break;

            case element.classList.contains('border'):
              element.style.border = '1px solid black';
              break;

            case element.classList.contains('backgroundM'):
              element.style.backgroundColor = '#ffffff';
              break;

            case element.classList.contains('backImgModal'):
              element.style.backgroundColor = '#ffffff';
          }
        } else if (currentColorTheme === 'darkMode') {
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

            case element.classList.contains('mainContainer') || element.classList.contains('generalContainer'):
              element.style.backgroundColor = '#0e1218';
              break;

            case element.tagName === 'BODY':
              element.style.color = 'white';
              break;

            case element.classList.contains('mainHeader'):
              element.style.backgroundColor = '#232530';
              break;

            case element.classList.contains('newNoteHeader'):
              element.style.backgroundColor = '#0e1218';

            case element.classList.contains('noteCard'):
              element.style.borderBottom = '1px solid rgba(255, 255, 255, 0.04)';
              break;

            case element.classList.contains('footerButton'):
              element.classList.remove('lightMode');
              break;

            case element.classList.contains('background'):
              element.style.backgroundColor = '#525866';
              break;

            case element.classList.contains('backgroundM'):
              element.style.backgroundColor = '#2a3038';
              break;
          }
        }
      });
    }

    if (logoText) {
      logoText.style.fontFamily = 'Pacifico';
    }

    if (openNotes) {
      openNotes.forEach((note) => {
        note.style.display = 'none'; //none
      });
    }

    if (archivedNotesScreen) {
      archivedNotesScreen.style.display = 'none'; //none
      subtitle.style.display = 'none'; //none
    }

    if (currentFontFamily === 'Space Mono, monospace') {
      const modalFont = document.querySelector('.modalTextBottom ');
      if (modalFont) {
        modalFont.style.fontSize = '11px';
      }
    }
    document.body.style.fontFamily = `${currentFontFamily}`;
  });
}
loadInitialState();

//Function to show Footer Buttons Screens
export function showMainFooterMenuScreens() {
  document.addEventListener('click', (event) => {
    if (
      !(
        event.target.closest('#searchButton') ||
        event.target.closest('#tagsButton') ||
        event.target.closest('#archivedButton') ||
        event.target.closest('#goBackToTags') ||
        event.target.closest('#homeButton') ||
        event.target.closest('#settingsButton')
      )
    )
      return;

    const titleText = document.getElementById('titleText');
    const clickedButton = event.target.closest('.footerButton') || event.target.closest('#goBackToTags');

    const resetPasswordContainer = document.getElementById('resetPasswordContainer');

    const elementsToHideSearch = document.querySelectorAll(
      '.tagsListContainer, #modal, #overlay, #settingsContainer, #openNotesContainer, #allArchivedNotesContainer, #newNoteButton, .archivedNotesSubtitle, #newNoteContainer'
    );
    const elementsToShowSearch = document.querySelectorAll('.subtitleSearch, #titleText, #titleContainer, #allNotesContainer, .searchEngineContainer');

    const elementsToShowTags = document.querySelectorAll('.tagsListContainer, #titleText, #titleContainer');
    const elementsToHideTags = document.querySelectorAll(
      '#allNotesContainer, #modal, #overlay, #settingsContainer, #openNotesContainer, #searchEngineContainer, #allArchivedNotesContainer, #goBackToTags, #newNoteButton, .archivedNotesSubtitle, #newNoteContainer'
    );

    const elementsToShowArchive = document.querySelectorAll(
      '.allArchivedNotesContainer, #titleText, .spacer, .archivedNotesSubtitle, #titleContainer, .spacer'
    );
    const elementsToHideArchive = document.querySelectorAll(
      '#searchEngineContainer, #openNotesContainer, #modal, #overlay, #settingsContainer, #subtitleSearch, #newNoteContainer, #allNotesContainer, #newNoteButton, .tagsListContainer'
    );

    const elementsToHideSettings = document.querySelectorAll(
      '#allArchivedNotesContainer, #titleText, #modal, #overlay, #archivedNotesSubtitle, #newNoteButton, #allNotesContainer, #searchEngineContainer, .tagsListContainer'
    );
    const elementsToShowSettings = document.getElementById('settingsContainer');

    const elementsToHideHome = document.querySelectorAll(
      '#allArchivedNotesContainer, #archivedNotesSubtitle, #goBackToTags, #modal, #overlay, #newNoteContainer, #openNotesContainer, #newNoteButton, #searchEngineContainer, .tagsListContainer, #settingsContainer'
    );
    const elementsToShowHome = document.querySelectorAll('#allNotesContainer, #titleContainer, #titleText, #newNoteButton');

    const homeButton = document.getElementById('homeButton');
    const searchButton = document.getElementById('searchButton');
    const archivedButton = document.getElementById('archivedButton');
    const tagsButton = document.getElementById('tagsButton');
    const settingsButton = document.getElementById('settingsButton');

    if (!clickedButton) return;

    const buttonId = clickedButton.id;

    switch (buttonId) {
      case 'searchButton':
        elementsToHideSearch.forEach((element) => {
          element.style.display = 'none';
          resetPasswordContainer.style.display = 'none';
        });

        elementsToShowSearch.forEach((element) => {
          element.style.display = 'flex';
        });

        titleText.textContent = 'Search';
        searchNotes();
        break;

      case 'homeButton':
        elementsToHideHome.forEach((element) => {
          element.style.display = 'none';
        });
        elementsToShowHome.forEach((element) => {
          element.style.display = 'flex';
        });
        titleText.textContent = 'All Notes';
        resetPasswordContainer.style.display = 'none';
        break;

      case 'tagsButton':
        elementsToHideTags.forEach((element) => {
          element.style.display = 'none';
        });
        elementsToShowTags.forEach((element) => {
          element.style.display = 'flex';
        });
        titleText.textContent = 'Tags';
        resetPasswordContainer.style.display = 'none';
        break;

      case 'goBackToTags':
        elementsToHideTags.forEach((element) => {
          element.style.display = 'none';
        });
        elementsToShowTags.forEach((element) => {
          element.style.display = 'flex';
        });
        titleText.textContent = 'Tags';
        resetPasswordContainer.style.display = 'none';
        break;

      case 'archivedButton':
        elementsToShowArchive.forEach((element) => {
          element.style.display = 'flex';
        });
        elementsToHideArchive.forEach((element) => {
          element.style.display = 'none';
        });
        titleText.textContent = 'Archived Notes';
        resetPasswordContainer.style.display = 'none';
        break;

      case 'settingsButton':
        elementsToHideSettings.forEach((element) => {
          element.style.display = 'none';
        });
        elementsToShowSettings.style.display = 'flex';
        resetPasswordContainer.style.display = 'none';
        elementsToShowSettings.style.flexDirection = 'column';
        document.querySelector('.generalContainer').style.justifyContent = 'flex-start';
    }
  });
}
showMainFooterMenuScreens();

export function settingsLogOutButton() {
  const wrongMail = document.getElementById('wrongMail');
  const wrongPassword = document.getElementById('wrongPassword');
  const logoutButton = document.getElementById('logoutButton');
  const elementsToHideLogOut = document.querySelectorAll(
    '#allNotesContainer, footer, .mainHeader, #tagsListContainer, #allArchivedNotesContainer, #openNotesContainer, #newNoteContainer, #settingsContainer, #modal'
  );
  const elementsToShowLogOut = document.getElementById('loginContainer');
  logoutButton.addEventListener('click', () => {
    elementsToHideLogOut.forEach((element) => {
      element.style.display = 'none';
    });
    elementsToShowLogOut.style.display = 'flex';
    elementsToShowLogOut.style.flexDirection = 'column';
    wrongMail.style.display = 'none';
    wrongPassword.style.display = 'none';
    setCurrentUser();
    loginHandler();
    registerLoginEvents();
    document.querySelector('.generalContainer').style.justifyContent = 'center';

    if (currentColorTheme === 'darkMode') {
      document.querySelector('.backgroundM').style.backgroundColor = 'red'; //normal
    } else if (currentColorTheme === 'lightMode') {
      document.querySelector('.backgroundM').style.backgroundColor = 'blue';
    }
  });
}
settingsLogOutButton();

export function showMainAppView() {
  document.getElementById('titleText').textContent = 'All Notes';
  console.log('KOXONE WORKS')
  document.getElementById('loginContainer').style.display = 'none';
  document.getElementById('signUpContainer').style.display = 'none';
  document.getElementById('allArchivedNotesContainer').style.display = 'none';
  document.getElementById('archivedNotesSubtitle').style.display = 'none';
  document.getElementById('goBackToTags').style.display = 'none';
  document.getElementById('modal').style.display = 'none';
  document.getElementById('overlay').style.display = 'none';
  document.getElementById('openNotesContainer').style.display = 'none';
  document.getElementById('searchEngineContainer').style.display = 'none';
  document.getElementById('tagsListContainer').style.display = 'none';
  document.getElementById('settingsContainer').style.display = 'none';

  updateUserNotes();

  document.querySelector('.mainHeader').style.display = 'flex';
  document.getElementById('titleText').style.display = 'flex';
  document.querySelector('footer').style.display = 'flex';
  document.getElementById('allNotesContainer').style.display = 'flex';
  document.getElementById('titleContainer').style.display = 'flex';
  document.getElementById('newNoteButton').style.display = 'flex';

  setTimeout(() => {
    updateUi();
    showNotesByTag();
    console.log('Vista principal actualizada con las notas del usuario:', getCurrentUser());
  }, 0);
}

export function showLoginScreen() {
  document.getElementById('loginContainer').style.display = 'flex';
  document.getElementById('signUpContainer').style.display = 'none';
  document.getElementById('allArchivedNotesContainer').style.display = 'none';
  document.getElementById('archivedNotesSubtitle').style.display = 'none';
  document.getElementById('goBackToTags').style.display = 'none';
  document.getElementById('modal').style.display = 'none';
  document.getElementById('overlay').style.display = 'none';
  document.getElementById('openNotesContainer').style.display = 'none';
  document.getElementById('searchEngineContainer').style.display = 'none';
  document.getElementById('tagsListContainer').style.display = 'none';
  document.getElementById('settingsContainer').style.display = 'none';
  document.getElementById('resetPasswordContainer').style.display = 'none';

  updateUserNotes();

  document.querySelector('.mainHeader').style.display = 'none';
  document.getElementById('titleText').style.display = 'none';
  document.querySelector('footer').style.display = 'none';
  document.getElementById('allNotesContainer').style.display = 'none';
  document.getElementById('titleContainer').style.display = 'none';
  document.getElementById('newNoteButton').style.display = 'none';
}

export function registerNavigationEvents() {
  const forgotButton = document.getElementById('forgotPasswordButton');

  if (forgotButton) {
    forgotButton.addEventListener('click', function () {
      showRecoverPasswordScreen();
    });
  }
  loadInitialState();
  showMainFooterMenuScreens();
  settingsLogOutButton();
}
