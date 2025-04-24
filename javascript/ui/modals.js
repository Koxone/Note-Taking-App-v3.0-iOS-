import { currentColorTheme } from '../state/settings-state.js';

//Function to close Modal
export function closeModal() {
  const modal = document.querySelector('.modal');
  const overlay = document.getElementById('overlay');
  modal.style.display = 'none';
  overlay.style.display = 'none';
}

//Function to show Modal
export function showModal({ type, topText, bottomText, buttonText, imgSrc }) {
  const modal = document.querySelector('.modal');
  const modalCancelButton = document.querySelector('.modalCancelButton');
  const modalRightButton = document.querySelector('.modalRightButton');
  const modalTextTop = document.querySelector('.modalTextTop');
  const modalTextBottom = document.querySelector('.modalTextBottom');
  const modalImg = document.getElementById('modalImg');
  const overlay = document.getElementById('overlay');

  overlay.style.display = 'block';
  modal.style.display = 'flex';

  modalRightButton.textContent = buttonText;
  modalTextTop.textContent = topText;
  modalTextBottom.textContent = bottomText;

  modalImg.setAttribute('src', imgSrc);
  if (currentColorTheme === 'lightMode') changeSrc(modalImg);

  modalRightButton.className = 'modalRightButton';
  modalRightButton.classList.add(`modal${type}Button`);

  modalCancelButton.addEventListener('click', closeModal);

  return modalRightButton;
}
