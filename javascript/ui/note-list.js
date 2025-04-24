import { currentUser, getCurrentUser } from '../state/session-state.js';
import { currentUserNotes, currentUserArchivedNotes } from '../state/note-state.js';
import { updateUserNotes } from '../state/note-state.js';
import { currentColorTheme } from '../state/settings-state.js';
import { applyThemeToDynamicContent } from './theme.js';
import { noteOpenHandler } from '../events/noteEvents.js';

export function openNotes(category, forcedArchived = null) {
  const openNotesContainer = document.getElementById('openNotesContainer');
  const isArchived = forcedArchived !== null ? forcedArchived : category === currentUserArchivedNotes;

  openNotesContainer.innerHTML = '';
  openNotesContainer.style.display = 'flex';

  category.forEach((note) => {
    const openNoteContainer = document.createElement('div');
    openNoteContainer.classList.add(isArchived ? 'openArchivedNoteContainer' : 'openNoteContainer');
    openNoteContainer.setAttribute('data-id', note.id);

    const header = document.createElement('header');
    header.classList.add('openNoteHeader');

    const backButton = document.createElement('button');
    backButton.classList.add('backButton');
    backButton.innerHTML = `
        <img class="lightMode src" src="./assets/images/icon-arrow-left-darkMode.svg" alt="">
        <span class="backButtonText color"> Go Back </span>
      `;

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('deleteButton');
    deleteButton.innerHTML = `
        <img class="lightMode src" src="./assets/images/icon-delete-darkMode.svg" alt="">
      `;

    const archiveButton = document.createElement('button');
    archiveButton.classList.add('archiveButton');
    archiveButton.innerHTML = `
        <img class="lightMode src" src="./assets/images/icon-archive-darkMode.svg" alt="" />
      `;
    if (isArchived) {
      archiveButton.classList.remove('archiveButton');
      archiveButton.classList.add('restore');
      archiveButton.innerHTML = `
          <img class="lightMode src" src="./assets/images/icon-restore-darkMode.svg" alt="" />
        `;
    }

    const cancelButton = document.createElement('button');
    cancelButton.classList.add('cancelButton');
    cancelButton.classList.add('color');
    cancelButton.innerText = 'Cancel';

    const saveButton = document.createElement('button');
    saveButton.classList.add('saveButton');
    saveButton.innerText = 'Save Note';
    if (isArchived) saveButton.disabled = true;

    const spacer = document.createElement('div');
    spacer.classList.add('spacer');

    const openNote = document.createElement('div');
    openNote.classList.add('openNote');
    if (isArchived) {
      openNote.classList.add('openArchivedNote');
    }

    const openNoteTitleContainer = document.createElement('div');
    openNoteTitleContainer.classList.add('openNoteTitleContainer');

    const h2 = document.createElement('h2');
    h2.classList.add('openNoteTitle');
    h2.innerText = note.title;

    const openNoteTagsAndDateContainer = document.createElement('div');
    openNoteTagsAndDateContainer.classList.add('openNoteTagsAndDateContainer');

    const openNoteTagsContainer = document.createElement('div');
    openNoteTagsContainer.classList.add('openNoteTagsContainer');

    const tagsIconSpan = document.createElement('span');
    tagsIconSpan.innerHTML = `
        <img class="lightMode src" src="./assets/images/icon-tag-darkMode.svg" alt="" />
        <p>Tags</p>
      `;

    const openNoteTagTextContainer = document.createElement('div');
    openNoteTagTextContainer.classList.add('openNoteTagTextContainer');

    let tagsArray = note.tags.split(',');
    tagsArray.forEach((tagText, index) => {
      let tagSpan = document.createElement('span');
      tagSpan.setAttribute('data-tag', 'tagNumber-' + (index + 1));
      tagSpan.innerText = tagText.trim();
      openNoteTagTextContainer.appendChild(tagSpan);
    });

    openNoteTagsContainer.append(tagsIconSpan, openNoteTagTextContainer);

    if (isArchived) {
      const statusContainer = document.createElement('div');
      statusContainer.classList.add('statusContainer');

      const statusIcon = document.createElement('span');
      statusIcon.classList.add('statusIcon');
      statusIcon.innerHTML = `
          <img class="lightMode src" src="./assets/images/icon-status-darkMode.svg" alt="" />
          <p>Status</p>
        `;

      const statusTextContainer = document.createElement('div');
      statusTextContainer.classList.add('statusTextContainer');
      statusTextContainer.textContent = 'Archived';

      statusContainer.append(statusIcon, statusTextContainer);
      openNoteTagsAndDateContainer.append(openNoteTagsContainer, statusContainer);
    } else {
      openNoteTagsAndDateContainer.append(openNoteTagsContainer);
    }

    const openNoteDateContainer = document.createElement('div');
    openNoteDateContainer.classList.add('openNoteDateContainer');
    openNoteDateContainer.innerHTML = `
        <span class="last">
          <img class="lightMode src" src="./assets/images/icon-clock-darkMode.svg" alt="" />
          <p>Last Edited</p>
        </span>
        <div class="openNoteDateTextContainer">
          <span data-time="${note.id}">${new Date(note.createdAt).toLocaleDateString('en-GB')}</span>
        </div>
      `;

    openNoteTagsAndDateContainer.append(openNoteDateContainer);

    const spacer2 = document.createElement('div');
    spacer2.classList.add('spacer');

    const openNoteTextAreaContainer = document.createElement('div');
    openNoteTextAreaContainer.classList.add('openNoteTextAreaContainer');
    openNoteTextAreaContainer.innerHTML = `
        <textarea class="lightMode color" data-id="${note.id}" ${isArchived ? 'disabled' : ''}>${note.content || ''}</textarea>
      `;

    openNoteTitleContainer.appendChild(h2);
    openNote.append(openNoteTitleContainer, openNoteTagsAndDateContainer, spacer2, openNoteTextAreaContainer);
    header.append(backButton, deleteButton, archiveButton, cancelButton, saveButton);
    openNoteContainer.append(header, spacer, openNote);
    openNotesContainer.appendChild(openNoteContainer);

    applyThemeToDynamicContent(currentColorTheme);
  });
}

export function renderSearchNotes(notesArray) {
  const allNotesContainer = document.getElementById('allNotesContainer');

  if (!allNotesContainer) {
    return;
  }

  const user = getCurrentUser();

  allNotesContainer.innerHTML = '';

  const userNotes = notesArray.filter((note) => note.user === user);

  if (userNotes.length === 0) {
    allNotesContainer.innerHTML = '<div class="no-notes-message">You dont have any notes yet. Start a new note to capture your thoughts and ideas.</div>';
    return;
  }

  userNotes.forEach((note) => {
    const article = document.createElement('article');
    article.classList.add('noteCard');
    article.classList.add('regularNote');
    article.setAttribute('data-id', note.id);

    const title = document.createElement('h2');
    title.classList.add('noteTitleText');
    title.innerText = note.title;

    const tags = document.createElement('ul');
    tags.classList.add('noteTags');

    const tagsArray = note.tags ? note.tags.split(',') : [];

    tagsArray.forEach((tagText, index) => {
      const li = document.createElement('li');
      const span = document.createElement('span');
      li.classList.add('background');
      span.classList.add('tag');
      span.setAttribute('data-tag', 'tagNumber-' + (index + 1));
      span.innerText = tagText.trim();
      li.appendChild(span);
      tags.appendChild(li);
    });

    const time = document.createElement('time');
    time.classList.add('noteTimeTag');
    time.setAttribute('data-time', note.createdAt);

    const date = new Date(note.createdAt);
    const formattedDate = date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    time.innerText = formattedDate;

    article.appendChild(title);
    article.appendChild(tags);
    article.appendChild(time);

    allNotesContainer.appendChild(article);
  });

  noteOpenHandler();
}

export function showNotesByTag() {
  const tagsListContainer = document.querySelector('.tagsListContainer');
  const allNotesContainer = document.getElementById('allNotesContainer');
  if (!tagsListContainer) return;

  const existingTags = currentUserNotes
    .filter((note) => note.user === getCurrentUser())
    .flatMap((note) => note.tags.split(',').map((tag) => tag.trim()))
    .filter((tag, index, self) => self.indexOf(tag) === index);

  const sortedTags = existingTags.sort((a, b) => a.localeCompare(b));

  tagsListContainer.innerHTML = '';

  const tagsUl = document.createElement('ul');
  tagsUl.classList.add('tagsUl');

  sortedTags.forEach((tag) => {
    const li = document.createElement('li');
    li.classList.add('tagElement');
    li.setAttribute('data-tag', tag);

    li.addEventListener('click', () => {
      const goBackToTags = document.querySelector('.goBackToTags');
      goBackToTags.style.display = 'flex';
      document.querySelectorAll('.tagElement').forEach((tagEl) => {
        tagEl.classList.remove('activeTag');
      });

      li.classList.add('activeTag');
      li.classList.add('background');

      const filteredNotes = currentUserNotes.filter((note) => {
        const noteTagsArray = note.tags.split(',').map((t) => t.trim());
        return note.user === getCurrentUser() && noteTagsArray.includes(tag);
      });

      renderSearchNotes(filteredNotes);
      document.getElementById('titleText').textContent = `Notes tagged: ${tag}`;

      tagsListContainer.style.display = 'none';
      allNotesContainer.style.display = 'flex';
    });

    const img = document.createElement('img');
    img.classList.add('src');
    img.setAttribute('src', './assets/images/icon-tag-darkMode.svg');

    const span = document.createElement('span');
    span.classList.add('tagListTitle');
    span.innerText = tag;

    li.appendChild(img);
    li.appendChild(span);
    tagsUl.appendChild(li);
  });

  tagsListContainer.appendChild(tagsUl);
  applyThemeToDynamicContent(currentColorTheme);
}
showNotesByTag();

export function updateUi() {
  const user = getCurrentUser();

  if (!user) {
    return;
  }

  updateUserNotes();

  const allNotesContainer = document.getElementById('allNotesContainer');
  const allArchivedNotesContainer = document.querySelector('.allArchivedNotesContainer');

  if (allNotesContainer) {
    allNotesContainer.innerHTML = '';
    const filteredNotes = currentUserNotes.filter((note) => note.user === user);

    renderSearchNotes(filteredNotes);

    if (filteredNotes.length > 0) {
      renderSearchNotes(filteredNotes);
    }

    if (currentUser) {
      const filteredNotes = currentUserNotes.filter((note) => note.user === currentUser);

      renderSearchNotes(filteredNotes);
    }
  }

  if (allArchivedNotesContainer) {
    allArchivedNotesContainer.innerHTML = '';

    currentUserArchivedNotes
      .filter((note) => note.user === getCurrentUser())
      .forEach((note) => {
        const article = document.createElement('article');
        article.classList.add('noteCard');
        article.classList.add('archivedNoteCard');
        article.setAttribute('data-id', note.id);

        const title = document.createElement('h2');
        title.classList.add('noteTitleText');
        title.innerText = note.title;

        const tags = document.createElement('ul');
        tags.classList.add('noteTags');

        const tagsArray = note.tags ? note.tags.split(',') : [];

        tagsArray.forEach((tagText, index) => {
          const li = document.createElement('li');
          const span = document.createElement('span');
          li.classList.add('background');
          span.classList.add('tag');
          span.setAttribute('data-tag', 'tagNumber-' + (index + 1));
          span.innerText = tagText.trim();
          li.appendChild(span);
          tags.appendChild(li);
        });

        const time = document.createElement('time');
        time.classList.add('noteTimeTag');
        time.setAttribute('data-time', note.createdAt);

        const date = new Date(note.createdAt);
        const formattedDate = date.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        });
        time.innerText = formattedDate;

        article.appendChild(title);
        article.appendChild(tags);
        article.appendChild(time);

        allArchivedNotesContainer.appendChild(article);
      });
  }
}
updateUi();
