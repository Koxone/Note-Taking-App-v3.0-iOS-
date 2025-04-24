//Function
export function registerUser(user, password) {
  if (!password || password.trim() === '') {
    return { success: false, reason: 'empty_password' };
  }

  const cleanedPassword = password.trim();

  const saved = JSON.parse(localStorage.getItem('Credentials')) || [];

  const exists = saved.some((cred) => cred.user === user);
  if (exists) return { success: false, reason: 'duplicate' };

  const hashed = CryptoJS.SHA256(cleanedPassword).toString();

  saved.push({ user, password: hashed });
  localStorage.setItem('Credentials', JSON.stringify(saved));
  localStorage.setItem('currentUser', JSON.stringify(user));

  return { success: true };
}

//Function
export function getAllUsers() {
  return JSON.parse(localStorage.getItem('Credentials')) || [];
}

//Export the user
export function loginUser(email, password) {
  const users = JSON.parse(localStorage.getItem('Credentials')) || [];

  const found = users.find((userObj) => userObj.user === email);

  if (!found) {
    return { success: false, reason: 'not_found' };
  }

  const hashed = CryptoJS.SHA256(password.trim()).toString();
  const match = hashed === found.password;

  if (!match) {
    return { success: false, reason: 'wrong_password' };
  }

  localStorage.setItem('currentUser', JSON.stringify(email));

  return { success: true };
}

//Function
// export function updatePassword(newPassword) {
//   if (!newPassword || newPassword.trim() === '') {
//     return { success: false, reason: 'empty_password' };
//   }

//   const cleanedPassword = newPassword.trim();
//   const currentUser = JSON.parse(localStorage.getItem('currentUserReset') || localStorage.getItem('currentUser'));

//   const credentials = JSON.parse(localStorage.getItem('Credentials')) || [];

//   const userIndex = credentials.findIndex((user) => user.user === currentUser);
//   if (userIndex === -1) {
//     return { success: false, reason: 'user_not_found' };
//   }

//   const hashed = CryptoJS.SHA256(cleanedPassword).toString();
//   credentials[userIndex].password = hashed;

//   localStorage.setItem('Credentials', JSON.stringify(credentials));

//   return { success: true };
// }

export function updatePassword(newPassword) {
  if (!newPassword || newPassword.trim() === '') {
    return { success: false, reason: 'empty_password' };
  }

  const cleanedPassword = newPassword.trim();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  if (!currentUser) {
    return { success: false, reason: 'no_user_logged_in' };
  }

  const credentials = JSON.parse(localStorage.getItem('Credentials')) || [];

  const userIndex = credentials.findIndex((user) => user.user === currentUser);
  if (userIndex === -1) {
    return { success: false, reason: 'user_not_found' };
  }

  const hashed = CryptoJS.SHA256(cleanedPassword).toString();
  credentials[userIndex].password = hashed;

  localStorage.setItem('Credentials', JSON.stringify(credentials));

  return { success: true };
}
