import { auth, db } from './firebase-config.js';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

export async function signUp(email, password, fullName) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update profile with display name
    await updateProfile(user, {
      displayName: fullName
    });
    
    // Create user profile in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      full_name: fullName,
      email: email,
      phone: '',
      created_at: serverTimestamp(),
      updated_at: serverTimestamp()
    });
    
    return { data: user, error: null };
  } catch (error) {
    return { data: null, error: error };
  }
}

export async function signIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { data: userCredential.user, error: null };
  } catch (error) {
    return { data: null, error: error };
  }
}

export async function signOutUser() {
  try {
    await signOut(auth);
    return { error: null };
  } catch (error) {
    return { error: error };
  }
}

export async function getCurrentUser() {
  try {
    const user = auth.currentUser;
    return { user, error: null };
  } catch (error) {
    return { user: null, error: error };
  }
}

export async function getProfile(userId) {
  try {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { data: docSnap.data(), error: null };
    } else {
      return { data: null, error: { message: 'No profile found' } };
    }
  } catch (error) {
    return { data: null, error: error };
  }
}

export async function updateProfileData(userId, updates) {
  try {
    const docRef = doc(db, 'users', userId);
    await updateDoc(docRef, {
      ...updates,
      updated_at: serverTimestamp()
    });
    
    // Get updated profile
    const updatedDoc = await getDoc(docRef);
    return { data: updatedDoc.data(), error: null };
  } catch (error) {
    return { data: null, error: error };
  }
}

export function onAuthStateChange(callback) {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}