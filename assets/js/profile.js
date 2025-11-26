// import { getCurrentUser, getProfile, updateProfileData, signOutUser, onAuthStateChange } from './auth.js';

// const logoutBtn = document.getElementById('logoutBtn');
// const profileForm = document.getElementById('profileForm');
// const errorMessage = document.getElementById('errorMessage');
// const successMessage = document.getElementById('successMessage');
// const saveBtn = document.getElementById('saveBtn');

// let currentUserId = null;

// // Check authentication state
// onAuthStateChange(async (user) => {
//   if (!user) {
//     window.location.href = '/login.html';
//     return;
//   }
//   currentUserId = user.uid;
//   await loadProfile(user);
// });

// async function loadProfile(user) {
//   const { data: profile, error: profileError } = await getProfile(user.uid);

//   if (profile) {
//     document.getElementById('fullName').value = profile.full_name || '';
//     document.getElementById('email').value = profile.email || user.email || '';
//     document.getElementById('phone').value = profile.phone || '';
//     document.getElementById('profileName').textContent = profile.full_name || 'User Profile';

//     const initial = profile.full_name ? profile.full_name.charAt(0).toUpperCase() : 'U';
//     document.getElementById('avatarInitial').textContent = initial;

//     if (profile.created_at) {
//       const date = profile.created_at.toDate();
//       document.getElementById('memberSince').value = date.toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric'
//       });
//     }
//   }
// }

// profileForm.addEventListener('submit', async (e) => {
//   e.preventDefault();

//   errorMessage.textContent = '';
//   successMessage.textContent = '';

//   const fullName = document.getElementById('fullName').value;
//   const phone = document.getElementById('phone').value;

//   saveBtn.disabled = true;
//   saveBtn.textContent = 'Saving...';

//   const { data, error } = await updateProfileData(currentUserId, {
//     full_name: fullName,
//     phone: phone
//   });

//   if (error) {
//     errorMessage.textContent = error.message;
//   } else {
//     successMessage.textContent = 'Profile updated successfully!';
//     document.getElementById('profileName').textContent = fullName || 'User Profile';
//     const initial = fullName ? fullName.charAt(0).toUpperCase() : 'U';
//     document.getElementById('avatarInitial').textContent = initial;
//   }

//   saveBtn.disabled = false;
//   saveBtn.textContent = 'Save Changes';
// });

// logoutBtn.addEventListener('click', async () => {
//   await signOutUser();
//   window.location.href = '/login.html';
// });










// import { getCurrentUser, getProfile, updateProfileData, signOutUser, onAuthStateChange } from './auth.js';

// const logoutBtn = document.getElementById('logoutBtn');
// const profileForm = document.getElementById('profileForm');
// const errorMessage = document.getElementById('errorMessage');
// const successMessage = document.getElementById('successMessage');
// const saveBtn = document.getElementById('saveBtn');
// const addContactBtn = document.getElementById('addContactBtn');
// const emergencyContactsContainer = document.getElementById('emergencyContactsContainer');

// let currentUserId = null;
// let emergencyContacts = [];

// // Check authentication state
// onAuthStateChange(async (user) => {
//   if (!user) {
//     window.location.href = '/login.html';
//     return;
//   }
//   currentUserId = user.uid;
//   await loadProfile(user);
// });

// // Initialize emergency contacts
// function initializeEmergencyContacts() {
//   // Add first two emergency contact fields by default
//   if (emergencyContacts.length === 0) {
//     emergencyContacts = [
//       { name: '', phone: '' },
//       { name: '', phone: '' }
//     ];
//   }
//   renderEmergencyContacts();
// }

// // Render emergency contacts
// function renderEmergencyContacts() {
//   emergencyContactsContainer.innerHTML = '';
  
//   emergencyContacts.forEach((contact, index) => {
//     const contactElement = document.createElement('div');
//     contactElement.className = 'emergency-contact-item';
//     contactElement.innerHTML = `
//       <div class="form-row">
//         <div class="form-group">
//           <label for="contactName${index}">Contact ${index + 1} Name</label>
//           <input
//             type="text"
//             id="contactName${index}"
//             name="contactName${index}"
//             placeholder="Contact name"
//             value="${contact.name || ''}"
//           />
//         </div>
//         <div class="form-group">
//           <label for="contactPhone${index}">Contact ${index + 1} Phone</label>
//           <input
//             type="tel"
//             id="contactPhone${index}"
//             name="contactPhone${index}"
//             placeholder="Phone number"
//             value="${contact.phone || ''}"
//           />
//         </div>
//         ${index >= 2 ? `
//         <div class="form-group" style="display: flex; align-items: flex-end;">
//           <button type="button" class="btn-logout" style="padding: 8px 12px; font-size: 12px;" data-index="${index}">
//             Remove
//           </button>
//         </div>
//         ` : ''}
//       </div>
//     `;
//     emergencyContactsContainer.appendChild(contactElement);
//   });

//   // Add event listeners to remove buttons
//   document.querySelectorAll('.emergency-contact-item .btn-logout').forEach(button => {
//     button.addEventListener('click', (e) => {
//       const index = parseInt(e.target.getAttribute('data-index'));
//       removeEmergencyContact(index);
//     });
//   });
// }

// // Add new emergency contact
// function addEmergencyContact() {
//   emergencyContacts.push({ name: '', phone: '' });
//   renderEmergencyContacts();
// }

// // Remove emergency contact
// function removeEmergencyContact(index) {
//   if (emergencyContacts.length > 2) {
//     emergencyContacts.splice(index, 1);
//     renderEmergencyContacts();
//   }
// }

// // Load emergency contacts from profile data
// function loadEmergencyContacts(profile) {
//   if (profile.emergency_contacts && Array.isArray(profile.emergency_contacts)) {
//     emergencyContacts = profile.emergency_contacts;
//   } else {
//     emergencyContacts = [
//       { name: '', phone: '' },
//       { name: '', phone: '' }
//     ];
//   }
//   renderEmergencyContacts();
// }

// // Get emergency contacts from form
// function getEmergencyContactsFromForm() {
//   const contacts = [];
//   for (let i = 0; i < emergencyContacts.length; i++) {
//     const name = document.getElementById(`contactName${i}`)?.value || '';
//     const phone = document.getElementById(`contactPhone${i}`)?.value || '';
    
//     if (name.trim() || phone.trim()) {
//       contacts.push({
//         name: name.trim(),
//         phone: phone.trim()
//       });
//     }
//   }
//   return contacts;
// }

// async function loadProfile(user) {
//   const { data: profile, error: profileError } = await getProfile(user.uid);

//   if (profile) {
//     // Personal Information
//     document.getElementById('fullName').value = profile.full_name || '';
//     document.getElementById('email').value = profile.email || user.email || '';
//     document.getElementById('phone').value = profile.phone || '';
//     document.getElementById('profileName').textContent = profile.full_name || 'User Profile';

//     // Medical Records
//     document.getElementById('age').value = profile.age || '';
//     document.getElementById('gender').value = profile.gender || '';
//     document.getElementById('weight').value = profile.weight || '';
//     document.getElementById('height').value = profile.height || '';
//     document.getElementById('bloodType').value = profile.blood_type || '';

//     // Emergency Contacts
//     loadEmergencyContacts(profile);

//     const initial = profile.full_name ? profile.full_name.charAt(0).toUpperCase() : 'U';
//     document.getElementById('avatarInitial').textContent = initial;

//     if (profile.created_at) {
//       const date = profile.created_at.toDate();
//       document.getElementById('memberSince').value = date.toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric'
//       });
//     }
//   } else {
//     initializeEmergencyContacts();
//   }
// }

// // Add event listener for adding contacts
// addContactBtn.addEventListener('click', addEmergencyContact);

// profileForm.addEventListener('submit', async (e) => {
//   e.preventDefault();

//   errorMessage.textContent = '';
//   successMessage.textContent = '';

//   // Get personal information
//   const fullName = document.getElementById('fullName').value;
//   const phone = document.getElementById('phone').value;

//   // Get medical records
//   const age = document.getElementById('age').value;
//   const gender = document.getElementById('gender').value;
//   const weight = document.getElementById('weight').value;
//   const height = document.getElementById('height').value;
//   const bloodType = document.getElementById('bloodType').value;

//   // Get emergency contacts
//   const emergencyContacts = getEmergencyContactsFromForm();

//   saveBtn.disabled = true;
//   saveBtn.textContent = 'Saving...';

//   const { data, error } = await updateProfileData(currentUserId, {
//     full_name: fullName,
//     phone: phone,
//     age: age ? parseInt(age) : null,
//     gender: gender,
//     weight: weight ? parseFloat(weight) : null,
//     height: height ? parseFloat(height) : null,
//     blood_type: bloodType,
//     emergency_contacts: emergencyContacts
//   });

//   if (error) {
//     errorMessage.textContent = error.message;
//   } else {
//     successMessage.textContent = 'Profile updated successfully!';
//     document.getElementById('profileName').textContent = fullName || 'User Profile';
//     const initial = fullName ? fullName.charAt(0).toUpperCase() : 'U';
//     document.getElementById('avatarInitial').textContent = initial;
//   }

//   saveBtn.disabled = false;
//   saveBtn.textContent = 'Save Changes';
// });

// logoutBtn.addEventListener('click', async () => {
//   await signOutUser();
//   window.location.href = '/login.html';
// });















import { getCurrentUser, getProfile, updateProfileData, signOutUser, onAuthStateChange } from './auth.js';

const logoutBtn = document.getElementById('logoutBtn');
const profileForm = document.getElementById('profileForm');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');
const saveBtn = document.getElementById('saveBtn');
const addContactBtn = document.getElementById('addContactBtn');
const emergencyContactsContainer = document.getElementById('emergencyContactsContainer');

let currentUserId = null;
let emergencyContacts = [];

// Check authentication state
onAuthStateChange(async (user) => {
  if (!user) {
    window.location.href = '/login.html';
    return;
  }
  currentUserId = user.uid;
  await loadProfile(user);
  initializeCollapsibleSections();
});

// Initialize collapsible sections
function initializeCollapsibleSections() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const faqItem = question.parentElement;
      const answer = question.nextElementSibling;
      const arrow = question.querySelector('.faq-arrow');
      
      // Toggle active class
      faqItem.classList.toggle('active');
      
      // Toggle answer visibility
      if (faqItem.classList.contains('active')) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        answer.style.opacity = '1';
        arrow.style.transform = 'rotate(180deg)';
      } else {
        answer.style.maxHeight = '0';
        answer.style.opacity = '0';
        arrow.style.transform = 'rotate(0deg)';
      }
    });
  });
}

// Initialize emergency contacts
function initializeEmergencyContacts() {
  if (emergencyContacts.length === 0) {
    emergencyContacts = [
      { name: '', phone: '' },
      { name: '', phone: '' }
    ];
  }
  renderEmergencyContacts();
}

// Render emergency contacts
function renderEmergencyContacts() {
  emergencyContactsContainer.innerHTML = '';
  
  emergencyContacts.forEach((contact, index) => {
    const contactElement = document.createElement('div');
    contactElement.className = 'emergency-contact-item';
    contactElement.innerHTML = `
      <div class="form-row">
        <div class="form-group">
          <label for="contactName${index}">Contact ${index + 1} Name</label>
          <input
            type="text"
            id="contactName${index}"
            name="contactName${index}"
            placeholder="Contact name"
            value="${contact.name || ''}"
          />
        </div>
        <div class="form-group">
          <label for="contactPhone${index}">Contact ${index + 1} Phone</label>
          <input
            type="tel"
            id="contactPhone${index}"
            name="contactPhone${index}"
            placeholder="Phone number"
            value="${contact.phone || ''}"
          />
        </div>
        ${index >= 2 ? `
        <div class="form-group" style="display: flex; align-items: flex-end;">
          <button type="button" class="btn-logout" style="padding: 8px 12px; font-size: 12px;" data-index="${index}">
            Remove
          </button>
        </div>
        ` : ''}
      </div>
    `;
    emergencyContactsContainer.appendChild(contactElement);
  });

  // Add event listeners to remove buttons
  document.querySelectorAll('.emergency-contact-item .btn-logout').forEach(button => {
    button.addEventListener('click', (e) => {
      const index = parseInt(e.target.getAttribute('data-index'));
      removeEmergencyContact(index);
    });
  });
}

// Add new emergency contact
function addEmergencyContact() {
  emergencyContacts.push({ name: '', phone: '' });
  renderEmergencyContacts();
}

// Remove emergency contact
function removeEmergencyContact(index) {
  if (emergencyContacts.length > 2) {
    emergencyContacts.splice(index, 1);
    renderEmergencyContacts();
  }
}

// Load emergency contacts from profile data
function loadEmergencyContacts(profile) {
  if (profile.emergency_contacts && Array.isArray(profile.emergency_contacts)) {
    emergencyContacts = profile.emergency_contacts;
  } else {
    emergencyContacts = [
      { name: '', phone: '' },
      { name: '', phone: '' }
    ];
  }
  renderEmergencyContacts();
}

// Get emergency contacts from form
function getEmergencyContactsFromForm() {
  const contacts = [];
  for (let i = 0; i < emergencyContacts.length; i++) {
    const name = document.getElementById(`contactName${i}`)?.value || '';
    const phone = document.getElementById(`contactPhone${i}`)?.value || '';
    
    if (name.trim() || phone.trim()) {
      contacts.push({
        name: name.trim(),
        phone: phone.trim()
      });
    }
  }
  return contacts;
}

async function loadProfile(user) {
  const { data: profile, error: profileError } = await getProfile(user.uid);

  if (profile) {
    // Personal Information
    document.getElementById('fullName').value = profile.full_name || '';
    document.getElementById('email').value = profile.email || user.email || '';
    document.getElementById('phone').value = profile.phone || '';
    document.getElementById('profileName').textContent = profile.full_name || 'User Profile';

    // Medical Records
    document.getElementById('age').value = profile.age || '';
    document.getElementById('gender').value = profile.gender || '';
    document.getElementById('weight').value = profile.weight || '';
    document.getElementById('height').value = profile.height || '';
    document.getElementById('bloodType').value = profile.blood_type || '';

    // Emergency Contacts
    loadEmergencyContacts(profile);

    const initial = profile.full_name ? profile.full_name.charAt(0).toUpperCase() : 'U';
    document.getElementById('avatarInitial').textContent = initial;

    if (profile.created_at) {
      const date = profile.created_at.toDate();
      document.getElementById('memberSince').value = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  } else {
    initializeEmergencyContacts();
  }
}

// Add event listener for adding contacts
addContactBtn.addEventListener('click', addEmergencyContact);

profileForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  errorMessage.textContent = '';
  successMessage.textContent = '';

  // Get personal information
  const fullName = document.getElementById('fullName').value;
  const phone = document.getElementById('phone').value;

  // Get medical records
  const age = document.getElementById('age').value;
  const gender = document.getElementById('gender').value;
  const weight = document.getElementById('weight').value;
  const height = document.getElementById('height').value;
  const bloodType = document.getElementById('bloodType').value;

  // Get emergency contacts
  const emergencyContacts = getEmergencyContactsFromForm();

  saveBtn.disabled = true;
  saveBtn.textContent = 'Saving...';

  const { data, error } = await updateProfileData(currentUserId, {
    full_name: fullName,
    phone: phone,
    age: age ? parseInt(age) : null,
    gender: gender,
    weight: weight ? parseFloat(weight) : null,
    height: height ? parseFloat(height) : null,
    blood_type: bloodType,
    emergency_contacts: emergencyContacts
  });

  if (error) {
    errorMessage.textContent = error.message;
  } else {
    successMessage.textContent = 'Profile updated successfully!';
    document.getElementById('profileName').textContent = fullName || 'User Profile';
    const initial = fullName ? fullName.charAt(0).toUpperCase() : 'U';
    document.getElementById('avatarInitial').textContent = initial;
  }

  saveBtn.disabled = false;
  saveBtn.textContent = 'Save Changes';
});

logoutBtn.addEventListener('click', async () => {
  await signOutUser();
  window.location.href = '/login.html';
});