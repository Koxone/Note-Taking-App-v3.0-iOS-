export let currentUserNotes = [];
export let currentUserArchivedNotes = [];

import { getCurrentUser } from './session-state.js';

export function updateUserNotes() {
  const user = getCurrentUser();

  if (!user) {
    currentUserNotes.length = 0;
    currentUserArchivedNotes.length = 0;
    return;
  }

  try {
    const allNotes = JSON.parse(localStorage.getItem('currentUserNotes')) || [];
    const archived = JSON.parse(localStorage.getItem('currentUserArchivedNotes')) || [];

    currentUserNotes.length = 0;
    currentUserArchivedNotes.length = 0;

    const userNotes = allNotes.filter((note) => note.user === user);
    const userArchivedNotes = archived.filter((note) => note.user === user);

    currentUserNotes.push(...userNotes);
    currentUserArchivedNotes.push(...userArchivedNotes);
  } catch (error) {
    console.error('Error al cargar notas:', error);
  }
}

export function saveUserNotes() {
  try {
    const allNotes = JSON.parse(localStorage.getItem('currentUserNotes')) || [];
    const archived = JSON.parse(localStorage.getItem('currentUserArchivedNotes')) || [];

    const currentUser = getCurrentUser();

    if (!currentUser) {
      console.error('No hay usuario activo, no se pueden guardar notas');
      return;
    }

    const otherUsersNotes = allNotes.filter((note) => note.user !== currentUser);
    const otherUsersArchived = archived.filter((note) => note.user !== currentUser);

    const updatedNotes = [...otherUsersNotes, ...currentUserNotes];
    const updatedArchived = [...otherUsersArchived, ...currentUserArchivedNotes];

    localStorage.setItem('currentUserNotes', JSON.stringify(updatedNotes));
    localStorage.setItem('currentUserArchivedNotes', JSON.stringify(updatedArchived));
  } catch (error) {
    console.error('Error al guardar notas:', error);
  }
}
