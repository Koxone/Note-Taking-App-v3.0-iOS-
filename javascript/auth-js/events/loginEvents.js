import { loginUser } from '../../auth-js/logic/auth-logic.js';
import { addError } from '../../auth-js/ui/authUI.js';
import { showPassword } from '../../auth-js/ui/authUI.js';
import { showMainAppView } from '../../events/navigationEvents.js';
import { updateUi } from '../../ui/note-list.js';
import { showNotesByTag } from '../../ui/note-list.js';
import { updateUserNotes } from '../../state/note-state.js';
import { getCurrentUser } from '../../state/session-state.js';
import { currentUserNotes } from '../../state/note-state.js';
import { currentUserArchivedNotes } from '../../state/note-state.js';
import { currentColorTheme } from '../../state/settings-state.js';

//Function to handle login with Local Storage Credentials
export function loginHandler() {
  const loginButton = document.getElementById('loginButton');

  if (loginButton) {
    loginButton.addEventListener('click', (event) => {
      const wrongMail = document.getElementById('wrongMail');
      const wrongPassword = document.getElementById('wrongPassword');

      const mailInput = document.getElementById('loginMail');
      const passwordInput = document.getElementById('loginPassword');

      const user = mailInput.value.trim();
      const password = passwordInput.value.trim();

      const result = loginUser(user, password);

      if (!result.success) {
        addError();

        if (result.reason === 'not_found') {
          console.log('User not found');
        } else if (result.reason === 'wrong_password') {
          console.log('Wrong Password');
        }

        event.preventDefault();
        return;
      }

      currentUserNotes.length = 0;
      currentUserArchivedNotes.length = 0;

      updateUserNotes();
      showMainAppView();

      if (wrongMail) wrongMail.style.display = 'none';
      if (wrongPassword) wrongPassword.style.display = 'none';
      passwordInput.value = '';

      if (currentColorTheme !== 'lightMode') {
        document.querySelector('.backgroundM').style.backgroundColor = '#0e1218';
      } else {
        document.querySelector('.backgroundM').style.backgroundColor = '#ffffff';
      }
    });
  }
}

function stopForm() {
  const loginForm = document.getElementById('formLogin');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
    });
  }
}

//Go to Sign Up Handler
function signUpHandler() {
  const goToTextLogin = document.getElementById('goToTextLogin');
  if (goToTextLogin) {
    goToTextLogin.addEventListener('click', () => {
      const loginContainer = document.getElementById('loginContainer');
      const signUpContainer = document.getElementById('signUpContainer');
      loginContainer.style.display = 'none';
      signUpContainer.style.display = 'flex';
      signUpContainer.style.flexDirection = 'column';
    });
  }
}

//Go to Login Handler
function goToLoginHandler() {
  const goToLogin = document.getElementById('goToTextSignUp');
  if (goToLogin) {
    goToLogin.addEventListener('click', () => {
      const loginContainer = document.getElementById('loginContainer');
      const signUpContainer = document.getElementById('signUpContainer');
      loginContainer.style.display = 'flex';
      signUpContainer.style.display = 'none';
      loginContainer.style.flexDirection = 'column';
    });
  }
}

//Manejador de Forgot Password
function forgotPasswordHandler() {
  document.addEventListener('click', (event) => {
    const forgotPasswordButton = event.target.closest('.forgotPassword');
    if (!forgotPasswordButton) return;

    event.preventDefault();

    const loginContainer = document.getElementById('loginContainer');
    const forgotPasswordContainer = document.getElementById('forgotPasswordContainer');

    if (loginContainer && forgotPasswordContainer) {
      const forgotPasswordContainer = document.getElementById('forgotPasswordContainer');
      const titleTextForgot = document.getElementById('titleTextForgot');
      const subtitleTextForgot = document.getElementById('subtitleTextForgot');
      const titleContainerForgot = document.getElementById('titleContainerForgot');

      titleTextForgot.style.display = 'flex';
      titleContainerForgot.style.display = 'flex';
      titleContainerForgot.style.flexDirection = 'column';
      subtitleTextForgot.style.display = 'flex';

      loginContainer.style.display = 'none';
      forgotPasswordContainer.style.display = 'flex';
      forgotPasswordContainer.style.flexDirection = 'column';

      setTimeout(() => {
        const forgottenEmail = document.getElementById('forgottenEmail');
        if (forgottenEmail) {
          forgottenEmail.focus();
        }
      }, 10);
    }
  });
}

//Function
export function registerLoginEvents() {
  loginHandler();
  stopForm();
  signUpHandler();
  goToLoginHandler();
  forgotPasswordHandler();
}

document.addEventListener('DOMContentLoaded', () => {
  showPassword();
});
