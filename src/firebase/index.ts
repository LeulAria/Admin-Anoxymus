import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyC_010lDzzJKhVs39ZjLaor0L_FlgRjGV4",
  authDomain: "remit-4a8e1.firebaseapp.com",
  projectId: "remit-4a8e1",
  storageBucket: "remit-4a8e1.appspot.com",
  messagingSenderId: "510732562008",
  appId: "1:510732562008:web:ea76766bb25306fe22642d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app