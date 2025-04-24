import { registerUser } from '../../auth-js/logic/auth-logic.js';
import { addError } from '../../auth-js/ui/authUI.js';
import { showPassword } from '../../auth-js/ui/authUI.js';
import { updateUserNotes } from '../../state/note-state.js';
import { showMainAppView } from '../../events/navigationEvents.js';
import { showNotesByTag, updateUi } from '../../ui/note-list.js';
import { currentUserNotes, currentUserArchivedNotes } from '../../state/note-state.js';

function saveSignUpCredentials() {
  const emailInput = document.getElementById('signUpMail');
  const passwordInput = document.getElementById('signUpPassword');
  const signUpButton = document.getElementById('signUpButton');

  if (!emailInput || !passwordInput || !signUpButton) {
    console.error('Elementos de formulario no encontrados');
    return;
  }

  let user = '';
  let password = '';

  emailInput.addEventListener('input', (e) => {
    user = e.target.value.trim();
  });

  passwordInput.addEventListener('input', (e) => {
    password = e.target.value.trim();
  });

  signUpButton.addEventListener('click', (e) => {
    e.preventDefault();

    if (!user || !password) {
      const inputs = [];
      if (!user) inputs.push(emailInput);
      if (!password) inputs.push(passwordInput);
      addError(inputs);
      return;
    }

    try {
      const result = registerUser(user, password);

      if (!result.success) {
        if (result.reason === 'duplicate') {
          const duplicatedError = document.getElementById('emailExistsErrorMessage');
          if (duplicatedError) {
            duplicatedError.style.display = 'block';
          }
        }
        return;
      }

      currentUserNotes.length = 0;
      currentUserArchivedNotes.length = 0;

      updateUserNotes();

      showMainAppView();

      setTimeout(() => {
        updateUi();
        showNotesByTag();
      }, 100);
    } catch (error) {
      console.error('Error durante el registro:', error);
    }
  });
}

function goToLogin() {
  const goToLoginButton = document.querySelector('.notYet .goToText');
  if (goToLoginButton) {
    goToLoginButton.addEventListener('click', () => {
      document.getElementById('signUpContainer').style.display = 'none';
      document.getElementById('loginContainer').style.display = 'flex';
    });
  }
}

export function registerSignupEvents() {
  showPassword();
  saveSignUpCredentials();
  goToLogin();
}
