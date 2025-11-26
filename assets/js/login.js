import { signIn } from './auth.js';

const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');
const loginBtn = document.getElementById('loginBtn');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  errorMessage.textContent = '';
  loginBtn.disabled = true;
  loginBtn.textContent = 'Signing in...';

  const { data, error } = await signIn(email, password);

  if (error) {
    errorMessage.textContent = getErrorMessage(error.code);
    loginBtn.disabled = false;
    loginBtn.textContent = 'Sign In';
  } else {
    window.location.href = 'dashboard.html';
  }
});

function getErrorMessage(errorCode) {
  const errorMessages = {
    'auth/invalid-email': 'Invalid email address.',
    'auth/user-disabled': 'This account has been disabled.',
    'auth/user-not-found': 'No account found with this email.',
    'auth/wrong-password': 'Incorrect password.',
    'auth/network-request-failed': 'Network error. Please check your connection.'
  };
  
  return errorMessages[errorCode] || 'An error occurred. Please try again.';
}