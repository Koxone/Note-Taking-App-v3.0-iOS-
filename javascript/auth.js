// Global Auth State
import './auth-js/state/authState.js';
import('./debug.js'); // Carga debug solo si existe
import { toolTipHandler } from './auth-js/ui/tooltip.js';

// Shared Theme Helper
import { applyThemeToDynamicContent } from './ui/theme.js';

// Espera a que el DOM esté listo
document.addEventListener('DOMContentLoaded', async () => {
  // Aplica tema al contenido dinámico
  const theme = localStorage.getItem('currentColorTheme') || 'darkMode';
  applyThemeToDynamicContent(theme);

  // Ejecuta tooltip (por ahora activo en cualquier vista)
  toolTipHandler();

  // Detección por contenedores visibles
  const loginContainer = document.getElementById('loginContainer');
  const signupContainer = document.getElementById('signUpContainer');
  const resetContainer = document.getElementById('resetPasswordContainer');
  const forgotContainer = document.getElementById('forgotPasswordContainer');

  if (loginContainer && loginContainer.style.display !== 'none') {
    const { registerLoginEvents } = await import('./auth-js/events/loginEvents.js');
    registerLoginEvents();
  }

  if (signupContainer && signupContainer.style.display !== 'none') {
    const { registerSignupEvents } = await import('./auth-js/events/signupEvents.js');
    registerSignupEvents();
  }

  if (resetContainer && resetContainer.style.display !== 'none') {
    const { registerResetPasswordEvents } = await import('./auth-js/events/resetPasswordEvents.js');
    registerResetPasswordEvents();
  }

  if (forgotContainer && forgotContainer.style.display !== 'none') {
    const { registerForgotPasswordEvents } = await import('./auth-js/events/forgotPasswordEvents.js');
    registerForgotPasswordEvents();
  }
});
