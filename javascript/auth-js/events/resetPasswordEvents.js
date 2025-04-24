import { updatePassword } from '../../auth-js/logic/auth-logic.js';
import { addError } from '../../auth-js/ui/authUI.js';
import { getCurrentUser } from '../../state/session-state.js';
import { showLoginScreen } from '../../events/navigationEvents.js';

// //Function for Change Password Screen
// export function changePassword() {
//   const newPasswordInput = document.getElementById('newPassword');
//   const confirmPasswordInput = document.getElementById('confirmNewPassword');
//   const resetButton = document.getElementById('resetButtonReset');

//   let newPassword = '';
//   let confirmPassword = '';

//   if (newPasswordInput) {
//     newPasswordInput.addEventListener('input', (e) => {
//       newPassword = e.target.value.trim();
//     });
//   }

//   if (confirmPasswordInput) {
//     confirmPasswordInput.addEventListener('input', (e) => {
//       confirmPassword = e.target.value.trim();
//     });
//   }

//   if (resetButton) {
//     resetButton.addEventListener('click', () => {
//       if (newPassword !== confirmPassword) {
//         addError();
//         console.log('Paswords do not match');
//         return;
//       }

//       const result = updatePassword(newPassword);

//       if (!result.success) {
//         addError();
//         console.log('User not found');
//         return;
//       }

//       showLoginScreen();
//     });
//   }
// }
// changePassword();

//Function for Go Back to Settings
export function goBackToSettings() {
  const goBackToSettings = document.querySelector('.goBackToSettings');

  if (goBackToSettings) {
    goBackToSettings.addEventListener('click', () => {
      window.location.href = '../settings.html';
    });
  }
}
goBackToSettings();

//Function
export function showRecoverPasswordScreen() {
  const loginContainer = document.getElementById('loginContainer');
  const recoverContainer = document.getElementById('recoverContainer');
  const loginMail = document.getElementById('loginMail');
  const loginPassword = document.getElementById('loginPassword');

  if (loginContainer) {
    loginContainer.style.display = 'none';
  }

  if (recoverContainer) {
    recoverContainer.style.display = 'flex';
  }

  if (loginMail) {
    loginMail.value = '';
  }

  if (loginPassword) {
    loginPassword.value = '';
  }

  const recoverMail = document.getElementById('recoverMail');
  if (recoverMail) {
    recoverMail.focus();
  }
}

//Function
export function showChangePasswordScreen() {
  const settingsContainer = document.getElementById('settingsContainer');
  const resetPasswordContainer = document.getElementById('resetPasswordContainer');

  if (settingsContainer) {
    settingsContainer.style.display = 'none';
  }

  if (resetPasswordContainer) {
    const titleText = resetPasswordContainer.querySelector('#titleTextReset');
    const subtitleText = resetPasswordContainer.querySelector('#subtitleTextReset');

    if (titleText) {
      titleText.textContent = 'Change Your Password';
    }

    if (subtitleText) {
      subtitleText.textContent = 'Enter a new password for your account.';
    }

    resetPasswordContainer.style.display = 'flex';
    resetPasswordContainer.style.flexDirection = 'column';

    addBackToSettingsButton(resetPasswordContainer);
  }
}

//Function
function addBackToSettingsButton(container) {
  let backButton = container.querySelector('.backToSettings');

  if (!backButton) {
    backButton = document.createElement('button');
    backButton.className = 'backToSettings';
    backButton.innerHTML = `
      <img class="src" src="./assets/images/icon-arrow-left-darkMode.svg" alt="" />
      <div class="backButtonText color">Settings</div>
    `;

    container.insertBefore(backButton, container.firstChild);

    backButton.addEventListener('click', () => {
      container.style.display = 'none';
      document.getElementById('settingsContainer').style.display = 'flex';
    });
  }
}

//Function
export function changePassword() {
  const newPasswordInput = document.getElementById('newPassword');
  const confirmPasswordInput = document.getElementById('confirmNewPassword');
  const resetButton = document.getElementById('resetButtonReset');

  if (!newPasswordInput || !confirmPasswordInput || !resetButton) return;

  resetButton.removeEventListener('click', handlePasswordChange);
  resetButton.addEventListener('click', handlePasswordChange);

  function handlePasswordChange() {
    const newPassword = newPasswordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    if (!newPassword || !confirmPassword) {
      alert('Please enter both passwords');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const result = updatePassword(newPassword);

    if (!result.success) {
      alert('Failed to update password: ' + (result.reason || 'Unknown error'));
      return;
    }

    alert('Password changed successfully');
    resetPasswordContainer.style.display = 'none';
    document.getElementById('settingsContainer').style.display = 'flex';

    newPasswordInput.value = '';
    confirmPasswordInput.value = '';
  }
}

//Function
export function registerResetPasswordEvents() {
  changePassword();
  goBackToSettings();
  changePassword();
}
