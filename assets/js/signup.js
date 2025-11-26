import { signUp } from './auth.js';

const signupForm = document.getElementById('signupForm');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');
const signupBtn = document.getElementById('signupBtn');

signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const fullName = document.getElementById('fullName').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  errorMessage.textContent = '';
  successMessage.textContent = '';

  // Validation
  if (password !== confirmPassword) {
    errorMessage.textContent = 'Passwords do not match';
    return;
  }

  if (password.length < 6) {
    errorMessage.textContent = 'Password must be at least 6 characters long';
    return;
  }

  signupBtn.disabled = true;
  signupBtn.textContent = 'Creating account...';

  const { data, error } = await signUp(email, password, fullName);

  if (error) {
    errorMessage.textContent = getErrorMessage(error.code);
    signupBtn.disabled = false;
    signupBtn.textContent = 'Create Account';
  } else {
    successMessage.textContent = 'Account created successfully! Redirecting...';
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 1500);
  }
});

function getErrorMessage(errorCode) {
  const errorMessages = {
    'auth/email-already-in-use': 'This email is already registered.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/weak-password': 'Password is too weak.',
    'auth/network-request-failed': 'Network error. Please check your connection.'
  };
  
  return errorMessages[errorCode] || 'An error occurred. Please try again.';
}