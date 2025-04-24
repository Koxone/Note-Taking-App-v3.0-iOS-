try {
  import('./state/session-state.js').then(({ currentUser }) => {
    console.log('Current User:', currentUser);
  });

  import('./state/note-state.js').then(({ currentUserNotes, currentUserArchivedNotes }) => {
    console.log('Saved Notes:', currentUserNotes);
    console.log('Saved Notes Number:', currentUserNotes.length);
    console.log('Archived Notes:', currentUserArchivedNotes);
  });

  import('./state/settings-state.js').then(({ currentFontFamily, currentColorTheme }) => {
    console.log('Current Font Family:', currentFontFamily);
    console.log('Current Color Theme:', currentColorTheme);
  });

  import('./auth-js/logic/auth-logic.js').then(({ getAllUsers }) => {
    const users = getAllUsers();
    console.log('All Registered Users:', users);
  });
} catch (err) {
  console.warn('QuickTest error:', err.message);
}
