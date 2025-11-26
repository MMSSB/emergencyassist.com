// import { getCurrentUser, getProfile, signOutUser, onAuthStateChange } from './auth.js';
// import { getEmergencyNumbers, getCountryName } from './emergency-numbers.js';

// const logoutBtn = document.getElementById('logoutBtn');
// const locationBtn = document.getElementById('locationBtn');
// const locationStatus = document.getElementById('locationStatus');
// const userName = document.getElementById('userName');

// let userCountry = 'US'; // Default country
// let userCoordinates = null;

// // Check authentication state
// onAuthStateChange(async (user) => {
//   if (!user) {
//     window.location.href = '/login.html';
//     return;
//   }
//   await loadDashboard(user);
// });

// async function loadDashboard(user) {
//   const { data: profile } = await getProfile(user.uid);

//   if (profile && profile.full_name) {
//     userName.textContent = profile.full_name;
//   } else if (user.displayName) {
//     userName.textContent = user.displayName;
//   }
// }

// // Location detection function
// async function detectUserLocation() {
//   return new Promise((resolve, reject) => {
//     if (!navigator.geolocation) {
//       reject(new Error('Geolocation is not supported by this browser.'));
//       return;
//     }

//     locationBtn.textContent = 'Detecting location...';
//     locationBtn.disabled = true;

//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const { latitude, longitude } = position.coords;
//         userCoordinates = { latitude, longitude };
        
//         try {
//           // Reverse geocoding to get country
//           const countryCode = await getCountryFromCoordinates(latitude, longitude);
//           userCountry = countryCode;
          
//           // Update emergency numbers based on country
//           updateEmergencyNumbers(countryCode);
          
//           locationStatus.innerHTML = `
//             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
//               <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
//               <circle cx="12" cy="10" r="3"/>
//             </svg>
//             Location: ${getCountryName(countryCode)} (${latitude.toFixed(4)}, ${longitude.toFixed(4)})
//           `;
//           locationStatus.style.color = '#10b981';
//           locationBtn.textContent = 'Update Location';
//           locationBtn.classList.add('enabled');
//           locationBtn.disabled = false;
          
//           resolve({ latitude, longitude, countryCode });
//         } catch (error) {
//           locationStatus.innerHTML = `
//             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
//               <circle cx="12" cy="12" r="10"/>
//               <line x1="15" y1="9" x2="9" y2="15"/>
//               <line x1="9" y1="9" x2="15" y2="15"/>
//             </svg>
//             Location detected but country not found
//           `;
//           locationStatus.style.color = '#f59e0b';
//           locationBtn.disabled = false;
//           locationBtn.textContent = 'Try Again';
//           reject(error);
//         }
//       },
//       (error) => {
//         let errorMessage = 'Location access denied';
//         switch (error.code) {
//           case error.PERMISSION_DENIED:
//             errorMessage = 'Location access denied by user';
//             break;
//           case error.POSITION_UNAVAILABLE:
//             errorMessage = 'Location information unavailable';
//             break;
//           case error.TIMEOUT:
//             errorMessage = 'Location request timed out';
//             break;
//         }
        
//         locationStatus.innerHTML = `
//           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
//             <circle cx="12" cy="12" r="10"/>
//             <line x1="15" y1="9" x2="9" y2="15"/>
//             <line x1="9" y1="9" x2="15" y2="15"/>
//           </svg>
//           ${errorMessage}
//         `;
//         locationStatus.style.color = '#ef4444';
//         locationBtn.disabled = false;
//         locationBtn.textContent = 'Try Again';
//         reject(error);
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 10000,
//         maximumAge: 60000
//       }
//     );
//   });
// }

// // Reverse geocoding using OpenStreetMap Nominatim
// async function getCountryFromCoordinates(lat, lng) {
//   try {
//     const response = await fetch(
//       `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=3`
//     );
//     const data = await response.json();
    
//     if (data && data.address && data.address.country_code) {
//       return data.address.country_code.toUpperCase();
//     }
//     return 'US'; // Default to US if country not found
//   } catch (error) {
//     console.error('Reverse geocoding failed:', error);
//     return 'US'; // Default to US on error
//   }
// }

// // Update emergency numbers display
// function updateEmergencyNumbers(countryCode) {
//   const numbers = getEmergencyNumbers(countryCode);
//   const countryName = getCountryName(countryCode);
  
//   // Update emergency contact display
//   const contactList = document.querySelector('.contact-list');
//   if (contactList) {
//     contactList.innerHTML = `
//       <div class="contact-item">
//         <strong>Police (${countryName}):</strong> ${numbers.police}
//       </div>
//       <div class="contact-item">
//         <strong>Medical (${countryName}):</strong> ${numbers.medical}
//       </div>
//       <div class="contact-item">
//         <strong>Fire (${countryName}):</strong> ${numbers.fire}
//       </div>
//     `;
//   }
  
//   // Update emergency buttons with actual calling functionality
//   updateEmergencyButtons(numbers, countryName);
// }

// // Update emergency buttons with actual phone calling
// function updateEmergencyButtons(numbers, countryName) {
//   const policeBtn = document.querySelector('.police .emergency-btn');
//   const medicalBtn = document.querySelector('.medical .emergency-btn');
//   const fireBtn = document.querySelector('.fire .emergency-btn');
  
//   if (policeBtn) {
//     policeBtn.onclick = () => callEmergencyNumber(numbers.police, 'Police', countryName);
//     policeBtn.textContent = `Call Police (${numbers.police})`;
//   }
  
//   if (medicalBtn) {
//     medicalBtn.onclick = () => callEmergencyNumber(numbers.medical, 'Medical', countryName);
//     medicalBtn.textContent = `Call Medical (${numbers.medical})`;
//   }
  
//   if (fireBtn) {
//     fireBtn.onclick = () => callEmergencyNumber(numbers.fire, 'Fire', countryName);
//     fireBtn.textContent = `Call Fire (${numbers.fire})`;
//   }
// }

// // Emergency number calling function
// function callEmergencyNumber(number, service, country) {
//   const confirmCall = confirm(`Call ${service} emergency in ${country}?\nNumber: ${number}\n\nThis will attempt to call the emergency number.`);
  
//   if (confirmCall) {
//     // For web apps, we can only show an alert
//     // For mobile apps, you would use tel: protocol
//     if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
//       // Mobile device - try to initiate call
//       window.location.href = `tel:${number}`;
//     } else {
//       // Desktop - show instructions
//       alert(`To call ${service} emergency in ${country}:\n\nDial: ${number}\n\nOn a mobile device, this would automatically dial the number.`);
//     }
//   }
// }

// // Event Listeners
// logoutBtn.addEventListener('click', async () => {
//   await signOutUser();
//   window.location.href = '/login.html';
// });

// locationBtn.addEventListener('click', () => {
//   detectUserLocation().catch(console.error);
// });

// // Auto-detect location on page load
// window.addEventListener('load', () => {
//   setTimeout(() => {
//     detectUserLocation().catch(console.error);
//   }, 1000);
// });

















// import { getCurrentUser, getProfile, signOutUser, onAuthStateChange } from './auth.js';
// import { getEmergencyNumbers, getCountryName } from './emergency-numbers.js';

// const logoutBtn = document.getElementById('logoutBtn');
// const locationBtn = document.getElementById('locationBtn');
// const locationStatus = document.getElementById('locationStatus');
// const userName = document.getElementById('userName');

// let userCountry = 'EG'; // Default to Egypt
// let userCoordinates = null;

// // Check authentication state
// onAuthStateChange(async (user) => {
//   if (!user) {
//     window.location.href = '/login.html';
//     return;
//   }
//   await loadDashboard(user);
// });

// async function loadDashboard(user) {
//   const { data: profile } = await getProfile(user.uid);

//   if (profile && profile.full_name) {
//     userName.textContent = profile.full_name;
//   } else if (user.displayName) {
//     userName.textContent = user.displayName;
//   }

//   // Load manual country selector
//   createCountrySelector();
  
//   // Apply default country (Egypt) on initial load
//   updateEmergencyNumbers(userCountry);
// }

// // Create manual country selection dropdown
// function createCountrySelector() {
//   const infoSection = document.querySelector('.info-section');
//   if (!infoSection) return;

//   const countrySelectorHTML = `
//     <div class="info-card">
//       <h3>Select Country Manually</h3>
//       <p class="location-status">
//         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
//           <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
//           <circle cx="12" cy="10" r="3"/>
//         </svg>
//         Choose your country if location detection fails
//       </p>
//       <select id="countrySelect" class="country-select">
//         <option value="EG">Egypt</option>
//         <option value="US">United States</option>
//         <option value="GB">United Kingdom</option>
//         <option value="DE">Germany</option>
//         <option value="FR">France</option>
//         <option value="IT">Italy</option>
//         <option value="ES">Spain</option>
//         <option value="SA">Saudi Arabia</option>
//         <option value="AE">United Arab Emirates</option>
//         <option value="TR">Turkey</option>
//         <option value="IN">India</option>
//         <option value="CN">China</option>
//         <option value="JP">Japan</option>
//         <option value="KR">South Korea</option>
//         <option value="ZA">South Africa</option>
//         <option value="NG">Nigeria</option>
//         <option value="KE">Kenya</option>
//         <option value="BR">Brazil</option>
//         <option value="AR">Argentina</option>
//         <option value="AU">Australia</option>
//         <option value="NZ">New Zealand</option>
//         <option value="CA">Canada</option>
//         <option value="MX">Mexico</option>
//         <option value="NL">Netherlands</option>
//         <option value="must">must</option>
//       </select>
//       <button id="applyCountryBtn" class="btn-secondary" style="margin-top: 12px;">
//         Apply Country
//       </button>
//     </div>
//   `;

//   infoSection.insertAdjacentHTML('beforeend', countrySelectorHTML);

//   // Set default to Egypt
//   const countrySelect = document.getElementById('countrySelect');
//   if (countrySelect) {
//     countrySelect.value = userCountry;
//   }

//   // Add event listener for apply button
//   document.getElementById('applyCountryBtn').addEventListener('click', applyManualCountry);
// }

// // Apply manually selected country
// function applyManualCountry() {
//   const countrySelect = document.getElementById('countrySelect');
//   if (countrySelect) {
//     const selectedCountry = countrySelect.value;
//     userCountry = selectedCountry;
    
//     updateEmergencyNumbers(selectedCountry);
    
//     locationStatus.innerHTML = `
//       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
//         <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
//         <circle cx="12" cy="10" r="3"/>
//       </svg>
//       Manual selection: ${getCountryName(selectedCountry)}
//     `;
//     locationStatus.style.color = '#3b82f6';
    
//     showToast(`Country set to ${getCountryName(selectedCountry)}`);
//   }
// }

// // Location detection function
// async function detectUserLocation() {
//   return new Promise((resolve, reject) => {
//     if (!navigator.geolocation) {
//       // If geolocation not supported, use Egypt as default
//       locationStatus.innerHTML = `
//         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
//           <circle cx="12" cy="12" r="10"/>
//           <line x1="15" y1="9" x2="9" y2="15"/>
//           <line x1="9" y1="9" x2="15" y2="15"/>
//         </svg>
//         Geolocation not supported. Using Egypt as default.
//       `;
//       locationStatus.style.color = '#f59e0b';
//       updateEmergencyNumbers('EG');
//       reject(new Error('Geolocation not supported'));
//       return;
//     }

//     locationBtn.textContent = 'Detecting location...';
//     locationBtn.disabled = true;

//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const { latitude, longitude } = position.coords;
//         userCoordinates = { latitude, longitude };
        
//         try {
//           // Reverse geocoding to get country
//           const countryCode = await getCountryFromCoordinates(latitude, longitude);
//           userCountry = countryCode;
          
//           // Update emergency numbers based on country
//           updateEmergencyNumbers(countryCode);
          
//           // Update country selector
//           const countrySelect = document.getElementById('countrySelect');
//           if (countrySelect) {
//             countrySelect.value = countryCode;
//           }
          
//           locationStatus.innerHTML = `
//             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
//               <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
//               <circle cx="12" cy="10" r="3"/>
//             </svg>
//             Auto-detected: ${getCountryName(countryCode)} (${latitude.toFixed(4)}, ${longitude.toFixed(4)})
//           `;
//           locationStatus.style.color = '#10b981';
//           locationBtn.textContent = 'Update Location';
//           locationBtn.classList.add('enabled');
//           locationBtn.disabled = false;
          
//           showToast(`Location detected: ${getCountryName(countryCode)}`);
//           resolve({ latitude, longitude, countryCode });
//         } catch (error) {
//           // If reverse geocoding fails, use Egypt as default
//           locationStatus.innerHTML = `
//             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
//               <circle cx="12" cy="12" r="10"/>
//               <line x1="15" y1="9" x2="9" y2="15"/>
//               <line x1="9" y1="9" x2="15" y2="15"/>
//             </svg>
//             Location detected but country not found. Using Egypt as default.
//           `;
//           locationStatus.style.color = '#f59e0b';
//           locationBtn.disabled = false;
//           locationBtn.textContent = 'Try Again';
//           updateEmergencyNumbers('EG');
//           reject(error);
//         }
//       },
//       (error) => {
//         let errorMessage = 'Location access denied';
//         switch (error.code) {
//           case error.PERMISSION_DENIED:
//             errorMessage = 'Location access denied by user. Using Egypt as default.';
//             break;
//           case error.POSITION_UNAVAILABLE:
//             errorMessage = 'Location information unavailable. Using Egypt as default.';
//             break;
//           case error.TIMEOUT:
//             errorMessage = 'Location request timed out. Using Egypt as default.';
//             break;
//         }
        
//         locationStatus.innerHTML = `
//           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
//             <circle cx="12" cy="12" r="10"/>
//             <line x1="15" y1="9" x2="9" y2="15"/>
//             <line x1="9" y1="9" x2="15" y2="15"/>
//           </svg>
//           ${errorMessage}
//         `;
//         locationStatus.style.color = '#ef4444';
//         locationBtn.disabled = false;
//         locationBtn.textContent = 'Try Again';
        
//         // Use Egypt as default when location fails
//         updateEmergencyNumbers('EG');
//         reject(error);
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 10000,
//         maximumAge: 60000
//       }
//     );
//   });
// }

// // Reverse geocoding using OpenStreetMap Nominatim
// async function getCountryFromCoordinates(lat, lng) {
//   try {
//     const response = await fetch(
//       `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=3`
//     );
//     const data = await response.json();
    
//     if (data && data.address && data.address.country_code) {
//       return data.address.country_code.toUpperCase();
//     }
//     return 'EG'; // Default to Egypt if country not found
//   } catch (error) {
//     console.error('Reverse geocoding failed:', error);
//     return 'EG'; // Default to Egypt on error
//   }
// }

// // Update emergency numbers display
// function updateEmergencyNumbers(countryCode) {
//   const numbers = getEmergencyNumbers(countryCode);
//   const countryName = getCountryName(countryCode);
  
//   // Update emergency contact display
//   const contactList = document.querySelector('.contact-list');
//   if (contactList) {
//     contactList.innerHTML = `
//       <div class="contact-item">
//         <strong>Police (${countryName}):</strong> ${numbers.police}
//       </div>
//       <div class="contact-item">
//         <strong>Medical (${countryName}):</strong> ${numbers.medical}
//       </div>
//       <div class="contact-item">
//         <strong>Fire (${countryName}):</strong> ${numbers.fire}
//       </div>
//     `;
//   }
  
//   // Update emergency buttons with actual calling functionality
//   updateEmergencyButtons(numbers, countryName);
// }

// // Update emergency buttons with actual phone calling
// function updateEmergencyButtons(numbers, countryName) {
//   const policeBtn = document.querySelector('.police .emergency-btn');
//   const medicalBtn = document.querySelector('.medical .emergency-btn');
//   const fireBtn = document.querySelector('.fire .emergency-btn');
  
//   if (policeBtn) {
//     policeBtn.onclick = () => callEmergencyNumber(numbers.police, 'Police', countryName);
//     policeBtn.textContent = `Call Police (${numbers.police})`;
//   }
  
//   if (medicalBtn) {
//     medicalBtn.onclick = () => callEmergencyNumber(numbers.medical, 'Medical', countryName);
//     medicalBtn.textContent = `Call Medical (${numbers.medical})`;
//   }
  
//   if (fireBtn) {
//     fireBtn.onclick = () => callEmergencyNumber(numbers.fire, 'Fire', countryName);
//     fireBtn.textContent = `Call Fire (${numbers.fire})`;
//   }
// }

// // Emergency number calling function
// function callEmergencyNumber(number, service, country) {
//   const confirmCall = confirm(`Call ${service} emergency in ${country}?\nNumber: ${number}\n\nThis will attempt to call the emergency number.`);
  
//   if (confirmCall) {
//     // For web apps, we can only show an alert
//     // For mobile apps, you would use tel: protocol
//     if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
//       // Mobile device - try to initiate call
//       window.location.href = `tel:${number}`;
//     } else {
//       // Desktop - show instructions
//       alert(`To call ${service} emergency in ${country}:\n\nDial: ${number}\n\nOn a mobile device, this would automatically dial the number.`);
//     }
//   }
// }

// // Show toast notification
// function showToast(message) {
//   // Remove existing toasts
//   document.querySelectorAll('.toast-message').forEach(toast => toast.remove());
  
//   // Create toast element
//   const toast = document.createElement('div');
//   toast.className = 'toast-message';
//   toast.textContent = message;
//   toast.style.cssText = `
//     position: fixed;
//     bottom: 20px;
//     right: 20px;
//     background: var(--success-color);
//     color: white;
//     padding: 12px 20px;
//     border-radius: 8px;
//     box-shadow: var(--shadow-lg);
//     z-index: 1000;
//     animation: slideIn 0.3s ease;
//     max-width: 300px;
//     word-wrap: break-word;
//   `;
  
//   document.body.appendChild(toast);
  
//   // Remove toast after 3 seconds
//   setTimeout(() => {
//     toast.style.animation = 'slideOut 0.3s ease';
//     setTimeout(() => {
//       if (toast.parentNode) {
//         toast.parentNode.removeChild(toast);
//       }
//     }, 300);
//   }, 3000);
// }

// // Event Listeners
// logoutBtn.addEventListener('click', async () => {
//   await signOutUser();
//   window.location.href = '/login.html';
// });

// locationBtn.addEventListener('click', () => {
//   detectUserLocation().catch(console.error);
// });

// // Auto-detect location on page load
// window.addEventListener('load', () => {
//   setTimeout(() => {
//     detectUserLocation().catch(console.error);
//   }, 1000);
// });










import { getCurrentUser, getProfile, signOutUser, onAuthStateChange } from './auth.js';
import { getEmergencyNumbers, getCountryName } from './emergency-numbers.js';

const logoutBtn = document.getElementById('logoutBtn');
const locationBtn = document.getElementById('locationBtn');
const locationStatus = document.getElementById('locationStatus');
const userName = document.getElementById('userName');

let userCountry = 'EG'; // Default to Egypt
let userCoordinates = null;

// Check authentication state
onAuthStateChange(async (user) => {
  if (!user) {
    window.location.href = '/login.html';
    return;
  }
  await loadDashboard(user);
});

async function loadDashboard(user) {
  const { data: profile } = await getProfile(user.uid);

  if (profile && profile.full_name) {
    userName.textContent = profile.full_name;
  } else if (user.displayName) {
    userName.textContent = user.displayName;
  }

  // Load manual country selector
  createCountrySelector();
  
  // Apply default country (Egypt) on initial load
  updateEmergencyNumbers(userCountry);
}

// Create manual country selection dropdown
function createCountrySelector() {
  const infoSection = document.querySelector('.info-section');
  if (!infoSection) return;

  const countrySelectorHTML = `
    <div class="info-card">
      <h3>Select Country Manually</h3>
      <p class="location-status">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
        Choose your country if location detection fails
      </p>
      <select id="countrySelect" class="country-select">
        <option value="EG">Egypt</option>
        <option value="US">United States</option>
        <option value="GB">United Kingdom</option>
        <option value="DE">Germany</option>
        <option value="FR">France</option>
        <option value="IT">Italy</option>
        <option value="ES">Spain</option>
        <option value="SA">Saudi Arabia</option>
        <option value="AE">United Arab Emirates</option>
        <option value="TR">Turkey</option>
        <option value="IN">India</option>
        <option value="CN">China</option>
        <option value="JP">Japan</option>
        <option value="KR">South Korea</option>
        <option value="ZA">South Africa</option>
        <option value="NG">Nigeria</option>
        <option value="KE">Kenya</option>
        <option value="BR">Brazil</option>
        <option value="AR">Argentina</option>
        <option value="AU">Australia</option>
        <option value="NZ">New Zealand</option>
        <option value="CA">Canada</option>
        <option value="MX">Mexico</option>
        <option value="NL">Netherlands</option>
      </select>
      <button id="applyCountryBtn" class="btn-secondary" style="margin-top: 12px;">
        Apply Country
      </button>
    </div>
  `;

  infoSection.insertAdjacentHTML('beforeend', countrySelectorHTML);

  // Set default to Egypt
  const countrySelect = document.getElementById('countrySelect');
  if (countrySelect) {
    countrySelect.value = userCountry;
  }

  // Add event listener for apply button
  document.getElementById('applyCountryBtn').addEventListener('click', applyManualCountry);
}

// Apply manually selected country
function applyManualCountry() {
  const countrySelect = document.getElementById('countrySelect');
  if (countrySelect) {
    const selectedCountry = countrySelect.value;
    userCountry = selectedCountry;
    
    updateEmergencyNumbers(selectedCountry);
    
    locationStatus.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
      Manual selection: ${getCountryName(selectedCountry)}
    `;
    locationStatus.style.color = '#3b82f6';
    
    showToast(`Country set to ${getCountryName(selectedCountry)}`);
  }
}

// Improved location detection function
async function detectUserLocation() {
  return new Promise((resolve, reject) => {
    // Check if geolocation is available
    if (!navigator.geolocation) {
      const errorMsg = 'Geolocation is not supported by this browser.';
      console.error(errorMsg);
      updateLocationUI('error', errorMsg);
      reject(new Error(errorMsg));
      return;
    }

    // Update UI to show detection in progress
    updateLocationUI('detecting', 'Detecting location...');

    // Request location with better error handling
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        userCoordinates = { latitude, longitude };
        
        try {
          // Reverse geocoding to get country
          const countryCode = await getCountryFromCoordinates(latitude, longitude);
          userCountry = countryCode;
          
          // Update emergency numbers based on country
          updateEmergencyNumbers(countryCode);
          
          // Update country selector
          const countrySelect = document.getElementById('countrySelect');
          if (countrySelect) {
            countrySelect.value = countryCode;
          }
          
          updateLocationUI('success', `Auto-detected: ${getCountryName(countryCode)} (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`);
          showToast(`Location detected: ${getCountryName(countryCode)}`);
          resolve({ latitude, longitude, countryCode });
        } catch (error) {
          console.error('Reverse geocoding failed:', error);
          updateLocationUI('warning', 'Location detected but country not found. Using Egypt as default.');
          updateEmergencyNumbers('EG');
          reject(error);
        }
      },
      (error) => {
        handleGeolocationError(error);
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000, // Increased timeout
        maximumAge: 300000 // 5 minutes
      }
    );
  });
}

// Helper function to update location UI
function updateLocationUI(status, message) {
  const icons = {
    detecting: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
    </svg>`,
    success: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>`,
    warning: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>`,
    error: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"/>
      <line x1="15" y1="9" x2="9" y2="15"/>
      <line x1="9" y1="9" x2="15" y2="15"/>
    </svg>`
  };

  const colors = {
    detecting: '#f59e0b',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444'
  };

  const buttonTexts = {
    detecting: 'Detecting...',
    success: 'Update Location',
    warning: 'Try Again',
    error: 'Try Again'
  };

  locationStatus.innerHTML = `${icons[status]} ${message}`;
  locationStatus.style.color = colors[status];
  locationBtn.textContent = buttonTexts[status];
  locationBtn.disabled = status === 'detecting';
}

// Improved error handling for geolocation
function handleGeolocationError(error) {
  let errorMessage = 'Location access denied';
  
  switch (error.code) {
    case error.PERMISSION_DENIED:
      errorMessage = 'Location access denied by user. Please enable location permissions in your browser settings.';
      break;
    case error.POSITION_UNAVAILABLE:
      errorMessage = 'Location information unavailable. Please check your connection and try again.';
      break;
    case error.TIMEOUT:
      errorMessage = 'Location request timed out. Please try again.';
      break;
    default:
      errorMessage = 'An unknown error occurred while detecting location.';
      break;
  }
  
  updateLocationUI('error', errorMessage);
  updateEmergencyNumbers('EG'); // Use Egypt as default
  
  // Show detailed instructions for permission issues
  if (error.code === error.PERMISSION_DENIED) {
    showToast('Please enable location permissions in your browser settings');
  }
}

// Reverse geocoding using OpenStreetMap Nominatim
async function getCountryFromCoordinates(lat, lng) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=3`
    );
    
    if (!response.ok) {
      throw new Error('Reverse geocoding request failed');
    }
    
    const data = await response.json();
    
    if (data && data.address && data.address.country_code) {
      return data.address.country_code.toUpperCase();
    }
    return 'EG'; // Default to Egypt if country not found
  } catch (error) {
    console.error('Reverse geocoding failed:', error);
    return 'EG'; // Default to Egypt on error
  }
}

// Update emergency numbers display
function updateEmergencyNumbers(countryCode) {
  const numbers = getEmergencyNumbers(countryCode);
  const countryName = getCountryName(countryCode);
  
  // Update emergency contact display
  const contactList = document.querySelector('.contact-list');
  if (contactList) {
    contactList.innerHTML = `
      <div class="contact-item">
        <strong>Police (${countryName}):</strong> ${numbers.police}
      </div>
      <div class="contact-item">
        <strong>Medical (${countryName}):</strong> ${numbers.medical}
      </div>
      <div class="contact-item">
        <strong>Fire (${countryName}):</strong> ${numbers.fire}
      </div>
    `;
  }
  
  // Update emergency buttons with actual calling functionality
  updateEmergencyButtons(numbers, countryName);
}

// Update emergency buttons with actual phone calling
function updateEmergencyButtons(numbers, countryName) {
  const policeBtn = document.querySelector('.police .emergency-btn');
  const medicalBtn = document.querySelector('.medical .emergency-btn');
  const fireBtn = document.querySelector('.fire .emergency-btn');
  
  if (policeBtn) {
    policeBtn.onclick = () => callEmergencyNumber(numbers.police, 'Police', countryName);
    policeBtn.textContent = `Call Police (${numbers.police})`;
  }
  
  if (medicalBtn) {
    medicalBtn.onclick = () => callEmergencyNumber(numbers.medical, 'Medical', countryName);
    medicalBtn.textContent = `Call Medical (${numbers.medical})`;
  }
  
  if (fireBtn) {
    fireBtn.onclick = () => callEmergencyNumber(numbers.fire, 'Fire', countryName);
    fireBtn.textContent = `Call Fire (${numbers.fire})`;
  }
}

// Emergency number calling function
function callEmergencyNumber(number, service, country) {
  const confirmCall = confirm(`Call ${service} emergency in ${country}?\nNumber: ${number}\n\nThis will attempt to call the emergency number.`);
  
  if (confirmCall) {
    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      // Mobile device - try to initiate call
      window.location.href = `tel:${number}`;
    } else {
      // Desktop - show instructions
      alert(`To call ${service} emergency in ${country}:\n\nDial: ${number}\n\nOn a mobile device, this would automatically dial the number.`);
    }
  }
}

// Show toast notification
function showToast(message) {
  // Remove existing toasts
  document.querySelectorAll('.toast-message').forEach(toast => toast.remove());
  
  // Create toast element
  const toast = document.createElement('div');
  toast.className = 'toast-message';
  toast.textContent = message;
  
  document.body.appendChild(toast);
  
  // Remove toast after 3 seconds
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// Event Listeners
logoutBtn.addEventListener('click', async () => {
  await signOutUser();
  window.location.href = '/login.html';
});

locationBtn.addEventListener('click', () => {
  detectUserLocation().catch(error => {
    console.error('Location detection failed:', error);
  });
});

// Auto-detect location on page load
window.addEventListener('load', () => {
  // Small delay to ensure DOM is fully loaded
  setTimeout(() => {
    detectUserLocation().catch(error => {
      console.error('Auto-location detection failed:', error);
    });
  }, 500);
});

// Add click event listener to manually trigger location if auto-detection fails
document.addEventListener('DOMContentLoaded', function() {
  console.log('Dashboard loaded, location services initialized');
});