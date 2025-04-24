export let currentUser = JSON.parse(localStorage.getItem('currentUser'));

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem('currentUser'));
}

export function setCurrentUser(user) {
  currentUser = user;
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  } else {
    localStorage.removeItem('currentUser');
  }
}
