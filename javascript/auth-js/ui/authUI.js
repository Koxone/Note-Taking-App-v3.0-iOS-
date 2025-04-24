//Function to add error classs
export function showPassword() {
  document.addEventListener('click', (event) => {
    const button = event.target.closest('#showPasswordLogin, #showPasswordSignUp, .showPassword, .showPasswordLogin');

    if (!button) return;

    const container = button.closest('.inputWrapper');
    if (!container) return;

    const input = container.querySelector('input[type="password"], input[type="text"]');

    if (!input) return;

    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';

    if (button.src) {
      const srcParts = button.src.split('/');
      const imgName = srcParts[srcParts.length - 1];
      
      if (imgName.includes('hide-password')) {
        button.src = button.src.replace('hide-password', 'show-password');
      } else if (imgName.includes('show-password')) {
        button.src = button.src.replace('show-password', 'hide-password');
      }
    }
  });
}

//Function to add error class
export function addError(inputs = [], showGlobalMessage = true) {
  if (!Array.isArray(inputs)) return;

  inputs.forEach((input) => {
    if (!input) return;
    input.classList.add('error');
    const sibling = input.nextElementSibling;
    if (sibling) sibling.style.display = 'block';
  });

  if (showGlobalMessage) {
    const wrongMail = document.getElementById('wrongMail');
    const wrongPassword = document.getElementById('wrongPassword');

    if (wrongMail) wrongMail.style.display = 'block';
    if (wrongPassword) wrongPassword.style.display = 'block';
  }
}
