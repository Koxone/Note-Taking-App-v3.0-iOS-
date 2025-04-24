import { showModal } from '../ui/modals.js';
import { updateUi } from '../ui/note-list.js';
import { showNotesByTag } from '../ui/note-list.js';
import { showToast } from '../ui/toast.js';
import { currentUserNotes, currentUserArchivedNotes } from '../state/note-state.js';
import { currentUser } from '../state/session-state.js';
import { openNotes } from '../ui/note-list.js';
import { applyThemeToDynamicContent } from '../ui/theme.js';
import { currentColorTheme } from '../state/settings-state.js';
import { showMainAppView } from './navigationEvents.js';
import { getCurrentUser } from '../state/session-state.js';
import { saveUserNotes } from '../state/note-state.js';

//Function to Open Notes
export function noteOpenHandler() {
  document.addEventListener('click', (event) => {
    const noteCard = event.target.closest('.noteCard');
    if (!noteCard) return;

    const allNotesScreen = document.getElementById('allNotesContainer');
    const allArchivedNotesContainer = document.getElementById('allArchivedNotesContainer');
    const titleContainer = document.getElementById('titleContainer');
    const openNotesContainer = document.getElementById('openNotesContainer');
    const dataId = noteCard.getAttribute('data-id').trim();

    const isArchived = noteCard.classList.contains('archivedNoteCard');

    openNotesContainer.innerHTML = '';

    let noteToOpen;
    if (isArchived) {
      noteToOpen = currentUserArchivedNotes.find((note) => note.id === dataId);
    } else {
      noteToOpen = currentUserNotes.find((note) => note.id === dataId);
    }

    if (!noteToOpen) {
      console.error('Nota no encontrada:', dataId);
      return;
    }

    openNotes([noteToOpen], isArchived);

    setTimeout(() => {
      const containerClass = isArchived ? 'openArchivedNoteContainer' : 'openNoteContainer';
      const target = document.querySelector(`.${containerClass}[data-id="${dataId}"]`);

      if (target) {
        allNotesScreen.style.display = 'none';
        allArchivedNotesContainer.style.display = 'none';
        titleContainer.style.display = 'none';

        openNotesContainer.style.display = 'flex';
        target.style.display = 'flex';
        target.style.flexDirection = 'column';
      } else {
        console.error('Contenedor de nota no encontrado:', containerClass, dataId);
      }
    }, 150);
  });
}

//Function to handle New Note Header Buttons
export function backAndCancelButtonHandler() {
  const archivedNotesContainer = document.getElementById('allArchivedNotesContainer');
  const allNotesContainer = document.getElementById('allNotesContainer');
  const openNotesContainer = document.getElementById('openNotesContainer');
  const newNoteContainer = document.getElementById('newNoteContainer');
  const titleContainer = document.getElementById('titleContainer');
  const newTitleInput = document.getElementById('newTitleInput');
  const newNoteTextArea = document.getElementById('newNoteTextArea');
  const newTagsInput = document.querySelectorAll('.newTagsInput');

  document.addEventListener('click', (event) => {
    const backOrCancel = event.target.closest('.backButton, .cancelButton');

    if (!backOrCancel) return;

    titleContainer.style.display = 'flex';
    const container = event.target.closest('.openArchivedNoteContainer, .openNoteContainer, .newNoteContainer');

    switch (true) {
      case container?.classList.contains('openArchivedNoteContainer'):
        archivedNotesContainer.style.display = 'flex';
        openNotesContainer.style.display = 'none';
        break;

      case container?.classList.contains('openNoteContainer'):
        allNotesContainer.style.display = 'flex';
        openNotesContainer.style.display = 'none';
        break;

      case container?.classList.contains('newNoteContainer'):
        allNotesContainer.style.display = 'flex';
        openNotesContainer.style.display = 'none';
        newNoteContainer.style.display = 'none';
        newTitleInput.value = '';
        newTagsInput.forEach((tag) => {
          tag.value = '';
        });
        break;
    }
  });
}
backAndCancelButtonHandler();

//Function for Create New Note
export function newNoteButton() {
  const newNoteButton = document.getElementById('newNoteButton');

  if (newNoteButton) {
    newNoteButton.addEventListener('click', () => {
      const allNotesScreen = document.getElementById('allNotesContainer');
      const newNoteScreen = document.getElementById('newNoteContainer');
      const titleContainer = document.getElementById('titleContainer');
      const allArchivedNotesContainer = document.getElementById('allArchivedNotesContainer');
      const openNotesContainer = document.getElementById('openNotesContainer');
      const archivedNotes = document.querySelector('.allArchivedNotesContainer');

      openNotesContainer.style.display = 'none';
      allArchivedNotesContainer.style.display = 'none';
      allNotesScreen.style.display = 'none';
      titleContainer.style.display = 'none';
      archivedNotes.style.display = 'none';
      newNoteScreen.style.display = 'flex';
      applyThemeToDynamicContent(currentColorTheme);
    });
  }
}
newNoteButton();

//Function for Delete and Archive Button
export function deleteAndArchiveNotes() {
  document.addEventListener('click', (event) => {
    const clickedButton = event.target.closest('.deleteButton');
    const clickedArchiveButton = event.target.closest('.archiveButton');
    const clickedRestoreButton = event.target.closest('.restore');

    //DELETE
    if (clickedButton) {
      const targetNote = clickedButton.closest('[data-id]');
      if (targetNote) {
        let noteToDelete = targetNote.getAttribute('data-id');

        const modalBtn = showModal({
          type: 'Delete',
          topText: 'Delete Note',
          bottomText: 'Are you sure you want to permanently delete this note? This action cannot be undone.',
          buttonText: 'Delete Note',
          imgSrc: './assets/images/icon-delete-darkMode.svg',
        });

        modalBtn.onclick = () => {
          const updatedNotes = currentUserNotes.filter((note) => note.id !== noteToDelete);
          currentUserNotes.length = 0;
          currentUserNotes.push(...updatedNotes);
          const updatedArchived = currentUserArchivedNotes.filter((note) => note.id !== noteToDelete);
          currentUserArchivedNotes.length = 0;
          currentUserArchivedNotes.push(...updatedArchived);
          saveUserNotes();
          modal.style.display = 'none';
          overlay.style.display = 'none';
          showMainAppView();
          updateUi();
          showToast('delete');
        };
      }
      //ARCHIVE
    } else if (clickedArchiveButton) {
      const targetNote = clickedArchiveButton.closest('[data-id]');
      if (targetNote) {
        let noteToArchive = targetNote.getAttribute('data-id');

        const modalBtn = showModal({
          type: 'Archive',
          topText: 'Archive Note',
          bottomText: 'Are you sure you want to archive this note? You can find it in the Archived Notes section and restore it anytime.',
          buttonText: 'Archive Note',
          imgSrc: './assets/images/icon-archive-lightMode.svg',
        });

        modalBtn.onclick = () => {
          let archivedNote = currentUserNotes.find((note) => {
            return note.id === noteToArchive;
          });

          let noteStatus = currentUserNotes.find((note) => note.id === noteToArchive);

          if (noteStatus) {
            noteStatus.status = 'archived';
          }

          if (archivedNote) {
            currentUserArchivedNotes.push(archivedNote);
          }

          const newUserNotes = currentUserNotes.filter((note) => note.id !== noteToArchive);
          currentUserNotes.length = 0;
          currentUserNotes.push(...newUserNotes);

          saveUserNotes();
          showMainAppView();
          updateUi();
          showToast('archived');
        };
      }
      //RESTORE
    } else if (clickedRestoreButton) {
      const targetNote = clickedRestoreButton.closest('[data-id]');
      if (targetNote) {
        let noteToRestore = targetNote.getAttribute('data-id');

        const modalBtn = showModal({
          type: 'Restore',
          topText: 'Restore Note',
          bottomText: 'Are you sure you want to restore thi note to All Notes Section?',
          buttonText: 'Restore Note',
          imgSrc: './assets/images/icon-restore-darkMode.svg',
        });

        modalBtn.onclick = () => {
          let noteStatus = currentUserArchivedNotes.find((note) => note.id === noteToRestore);

          if (noteStatus) {
            noteStatus.status = 'active';
          }
          let restoredNote = currentUserArchivedNotes.find((note) => {
            return note.id === noteToRestore;
          });

          if (restoredNote) {
            currentUserNotes.push(restoredNote);
          }

          const newArchivedNotes = currentUserArchivedNotes.filter((note) => note.id !== noteToRestore);
          currentUserArchivedNotes.length = 0;
          currentUserArchivedNotes.push(...newArchivedNotes);

          saveUserNotes();
          showMainAppView();
          updateUi();
          showToast('restore');
        };
      }
    }
    showNotesByTag();
  });
}
deleteAndArchiveNotes();

//Function edit and save existing notes
export function editAndSaveNotes() {
  const editedContents = {};

  document.addEventListener('input', (event) => {
    const textarea = event.target.closest('textarea[data-id]');
    if (textarea) {
      const noteId = textarea.getAttribute('data-id');
      editedContents[noteId] = textarea.value;
    }
  });

  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('saveButton')) {
      const container = event.target.closest('[data-id]');
      if (!container) {
        return;
      }

      const noteId = container.getAttribute('data-id');

      if (!noteId) {
        return;
      }

      if (!editedContents[noteId]) {
        const textarea = container.querySelector(`textarea[data-id="${noteId}"]`);
        if (textarea) {
          editedContents[noteId] = textarea.value;
        } else {
          return;
        }
      }

      const noteToEdit = currentUserNotes.find((note) => note.id === noteId);
      if (noteToEdit) {
        noteToEdit.content = editedContents[noteId];
        saveUserNotes();

        const allNotesContainer = document.getElementById('allNotesContainer');
        const openNotesContainer = document.getElementById('openNotesContainer');
        const titleContainer = document.getElementById('titleContainer');

        if (openNotesContainer) openNotesContainer.style.display = 'none';
        if (allNotesContainer) allNotesContainer.style.display = 'flex';
        if (titleContainer) titleContainer.style.display = 'flex';

        updateUi();
        showToast('newNote');
      }
    }
  });
}

editAndSaveNotes();

//Function to Save New Note
export function saveNewNote() {
  const newNoteSaveButton = document.getElementById('newNoteSaveButton');

  if (newNoteSaveButton) {
    newNoteSaveButton.addEventListener('click', (event) => {
      const titleText = document.getElementById('titleText');
      const titleInput = document.getElementById('newTitleInput');
      const tagsInput = document.querySelector('.newTagsInput');
      const contentInput = document.getElementById('newNoteTextArea');

      if (!titleInput || !tagsInput) {
        return;
      }

      const title = titleInput.value.trim();
      const rawTags = tagsInput.value.trim();
      const content = contentInput.value.trim();

      if (title === '' || rawTags === '') {
        alert('Title and Tags cannot be empty');
        event.preventDefault();
        return;
      }

      const tagList = rawTags.split(',').map((tag) => tag.trim());
      const invalidTags = tagList.some((tag) => tag === '');

      if (invalidTags) {
        alert('Tags must be separated by commas and cannot be empty');
        event.preventDefault();
        return;
      }

      const noteNumbers = currentUserNotes.map((note) => parseInt(note.id.split('-')[1], 10));
      const highestNumber = noteNumbers.length > 0 ? Math.max(...noteNumbers) : 0;
      const nextIdNumber = highestNumber + 1;

      const newNote = {
        user: getCurrentUser(),
        id: 'note-' + nextIdNumber,
        title: title,
        tags: rawTags,
        content: content,
        createdAt: new Date().toISOString(),
        status: 'active',
      };

      currentUserNotes.push(newNote);
      saveUserNotes();
      updateUi();
      showNotesByTag();

      titleInput.value = '';
      tagsInput.value = '';
      contentInput.value = '';

      showToast('newNote');

      newNoteContainer.style.display = 'none';
      allNotesContainer.style.display = 'flex';
      titleContainer.style.display = 'flex';
      titleText.style.display = 'flex';
    });
  }
}

export function registerNoteEvents() {
  noteOpenHandler();
  backAndCancelButtonHandler();
  newNoteButton();
  deleteAndArchiveNotes();
  editAndSaveNotes();
  saveNewNote();
}
