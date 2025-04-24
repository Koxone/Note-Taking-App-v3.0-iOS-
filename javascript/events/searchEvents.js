import { currentUserNotes } from '../state/note-state.js';
import { currentUser, getCurrentUser } from '../state/session-state.js';
import { renderSearchNotes } from '../ui/note-list.js';

//Function for search engine
export function searchNotes() {
  const searchEngine = document.getElementById('searchEngine');

  if (searchEngine) {
    searchEngine.addEventListener('input', (event) => {
      const userSearch = event.target.value.toLowerCase().trim();
      const searchedText = document.querySelector('.userSearch');

      if (searchedText) {
        searchedText.textContent = `${event.target.value}`;
      }

      const user = getCurrentUser();

      const allNotes = JSON.parse(localStorage.getItem('currentUserNotes')) || [];

      const filteredNotes = allNotes.filter((note) => note.user === user && note.title.toLowerCase().includes(userSearch));

      renderSearchNotes(filteredNotes);
    });
  }
}

export function registerSearchEvents() {
  searchNotes();
}
