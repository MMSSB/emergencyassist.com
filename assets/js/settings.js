import { signOutUser, onAuthStateChange } from './auth.js';

const logoutBtn = document.getElementById('logoutBtn');
const clearDataBtn = document.getElementById('clearDataBtn');

// Check authentication state
onAuthStateChange((user) => {
  if (!user) {
    window.location.href = '/login.html';
    return;
  }
  loadSettings();
});

// Theme Management
function loadSettings() {
  loadThemePreference();
//   loadNotificationSettings();
//   loadPrivacySettings();
  setupEventListeners();
}

function loadThemePreference() {
  const savedTheme = localStorage.getItem('theme') || 'system';
  const themeRadio = document.querySelector(`input[name="theme"][value="${savedTheme}"]`);
  
  if (themeRadio) {
    themeRadio.checked = true;
    applyTheme(savedTheme);
  }
}

// function loadNotificationSettings() {
//   const settings = {
//     emergencyAlerts: localStorage.getItem('emergencyAlerts') !== 'false',
//     locationUpdates: localStorage.getItem('locationUpdates') !== 'false',
//     appUpdates: localStorage.getItem('appUpdates') === 'true'
//   };
  
//   document.getElementById('emergencyAlerts').checked = settings.emergencyAlerts;
//   document.getElementById('locationUpdates').checked = settings.locationUpdates;
//   document.getElementById('appUpdates').checked = settings.appUpdates;
// }

function loadPrivacySettings() {
  const settings = {
    shareLocation: localStorage.getItem('shareLocation') !== 'false',
    dataCollection: localStorage.getItem('dataCollection') === 'true'
  };
  
  document.getElementById('shareLocation').checked = settings.shareLocation;
  document.getElementById('dataCollection').checked = settings.dataCollection;
}

function setupEventListeners() {
  // Theme selection
  document.querySelectorAll('input[name="theme"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      const theme = e.target.value;
      localStorage.setItem('theme', theme);
      applyTheme(theme);
    });
  });
  
//   // Notification toggles
//   document.getElementById('emergencyAlerts').addEventListener('change', (e) => {
//     localStorage.setItem('emergencyAlerts', e.target.checked);
//   });
  
//   document.getElementById('locationUpdates').addEventListener('change', (e) => {
//     localStorage.setItem('locationUpdates', e.target.checked);
//   });
  
//   document.getElementById('appUpdates').addEventListener('change', (e) => {
//     localStorage.setItem('appUpdates', e.target.checked);
//   });
  
  // Privacy toggles
  document.getElementById('shareLocation').addEventListener('change', (e) => {
    localStorage.setItem('shareLocation', e.target.checked);
  });
  
  document.getElementById('dataCollection').addEventListener('change', (e) => {
    localStorage.setItem('dataCollection', e.target.checked);
  });
  
  // Clear data button
  clearDataBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all local data? This will reset your preferences.')) {
      clearLocalData();
    }
  });
}

function applyTheme(theme) {
  const root = document.documentElement;
  
  if (theme === 'system') {
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.setAttribute('data-theme', 'light');
    }
  } else {
    root.setAttribute('data-theme', theme);
  }
  
  // Update meta theme color for mobile browsers
  updateThemeColor();
}

function updateThemeColor() {
  const theme = document.documentElement.getAttribute('data-theme');
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  const color = theme === 'dark' ? '#1e293b' : '#2563eb';
  
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', color);
  }
}

function clearLocalData() {
  const keysToKeep = ['theme']; // Keep theme preference
  const theme = localStorage.getItem('theme');
  
  localStorage.clear();
  
  // Restore theme preference
  if (theme) {
    localStorage.setItem('theme', theme);
  }
  
  // Reload settings
  loadSettings();
  
  // Show success message
  showToast('Local data cleared successfully');
}

function showToast(message) {
  // Create toast element
  const toast = document.createElement('div');
  toast.className = 'toast-message';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: var(--success-color);
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    box-shadow: var(--shadow-lg);
    z-index: 1000;
    animation: slideIn 0.3s ease;
  `;
  
  document.body.appendChild(toast);
  
  // Remove toast after 3 seconds
  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 3000);
}

// Listen for system theme changes
if (window.matchMedia) {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'system') {
      applyTheme('system');
    }
  });
}

// Apply theme on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'system';
  applyTheme(savedTheme);
});

// Event Listeners
logoutBtn.addEventListener('click', async () => {
  await signOutUser();
  window.location.href = '/login.html';
});