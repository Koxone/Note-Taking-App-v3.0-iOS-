import { currentUser } from './state/session-state.js';
import { currentColorTheme } from './state/settings-state.js';
import { currentFontFamily } from './state/settings-state.js';
import { updateUserNotes } from './state/note-state.js';
import { getCurrentUser } from './state/session-state.js';
import { registerSignupEvents } from './auth-js/events/signupEvents.js';
import { registerResetPasswordEvents } from './auth-js/events/resetPasswordEvents.js';
import { registerForgotPasswordEvents } from './auth-js/events/forgotPasswordEvents.js';
import { updatePassword } from './auth-js/logic/auth-logic.js';
import { changePassword } from './auth-js/events/resetPasswordEvents.js';
import { saveNewNote } from './events/noteEvents.js';
import { showPassword } from './auth-js/ui/authUI.js';
import('./debug.js');

changePassword();
updatePassword();
registerForgotPasswordEvents();
registerSignupEvents();

//State Imports
import './state/session-state.js';
import './state/note-state.js';
import './state/settings-state.js';

//Initial UI
import { updateUi, showNotesByTag } from './ui/note-list.js';
import { applyThemeToDynamicContent } from './ui/theme.js';

//Events
import { loadInitialState, registerNavigationEvents } from './events/navigationEvents.js';
import { registerNoteEvents } from './events/noteEvents.js';
import { registerSearchEvents } from './events/searchEvents.js';
import { registerSettingsEvents } from './events/settingsEvents.js';

import './auth.js';

document.addEventListener('DOMContentLoaded', () => {
  loadInitialState();
  showPassword();
  updateUserNotes();
  showNotesByTag();
  applyThemeToDynamicContent(currentColorTheme);
  applyThemeToDynamicContent(currentFontFamily);

  registerNavigationEvents();
  registerNoteEvents();
  registerSearchEvents();
  registerSettingsEvents();
  registerResetPasswordEvents();

  // console.log('Aplicación inicializada para usuario:', getCurrentUser());
});
