
// Import Firebase modules individually (not the whole package)
import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyA256SunocnN2chgOTHt4bqMCZUKp1lPHI",
  authDomain: "portfoliogaurav-2e88e.firebaseapp.com",
  projectId: "portfoliogaurav-2e88e",
  storageBucket: "portfoliogaurav-2e88e.firebasestorage.app",
  messagingSenderId: "396794211186",
  appId: "1:396794211186:web:50fc6a8592c3620c744beb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Collection references - these are string identifiers
export const studentsCollection = 'students';
export const facultyCollection = 'faculty';
export const researchersCollection = 'researchers';
export const publicationsCollection = 'publications';
export const projectsCollection = 'projects';
export const eventsCollection = 'events';
export const messagesCollection = 'messages';
export const imagesCollection = 'gallery';
