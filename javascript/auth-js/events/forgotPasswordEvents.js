import { getAllUsers } from '../logic/auth-logic.js';

export function registerForgotPasswordEvents() {
  const recoverButton = document.getElementById('recoverButton');

  if (!recoverButton) return;

  const forgotPasswordContainer = document.getElementById('forgotPasswordContainer');
  let backButton = document.getElementById('backToLogin');
  if (!backButton) {
    const backButton = document.createElement('button');
    backButton.className = 'backToLogin mainButton';
    backButton.id = 'backToLogin';
    backButton.textContent = 'Back to Login';
    backButton.style.marginTop = '20px';

    const formContainer = forgotPasswordContainer.querySelector('.formContainer');
    if (formContainer) {
      formContainer.appendChild(backButton);
    }

    backButton.addEventListener('click', (e) => {
      e.preventDefault();
      forgotPasswordContainer.style.display = 'none';
      document.getElementById('loginContainer').style.display = 'flex';
    });

    recoverButton.addEventListener('click', (e) => {
      e.preventDefault();

      const emailInput = document.getElementById('forgottenEmail');
      const email = emailInput.value.trim();

      if (!email) {
        alert('Please enter your email');
        return;
      }

      const users = getAllUsers();
      const userExists = users.some((u) => u.user === email);

      if (!userExists) {
        alert('No account exists with this email address');
        return;
      }

      localStorage.setItem('currentUserReset', JSON.stringify(email));

      const resetPasswordContainer = document.getElementById('resetPasswordContainer');
      forgotPasswordContainer.style.display = 'none';
      resetPasswordContainer.style.display = 'flex';
      resetPasswordContainer.style.flexDirection = 'column';

      alert(`Recovery link sent to ${email}`);
    });
  }
}