//Function to show Toast
export function showToast(element) {
  const toastContainer = document.querySelector('.toastContainer');
  const toastText = toastContainer.querySelector('p');

  switch (element) {
    case 'newNote':
      toastText.textContent = 'Note saved successfully!';
      break;

    case 'archived':
      toastText.textContent = 'Note succesfully archived!';
      break;

    case 'delete':
      toastText.textContent = 'Note succesfully deleted!';
      break;
  }

  toastContainer.classList.add('active');
  setTimeout(() => {
    toastContainer.classList.remove('active');
  }, 2000);
}
