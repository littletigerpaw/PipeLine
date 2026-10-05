import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'demo-api-key',
  authDomain: 'demo-project.firebaseapp.com',
  projectId: 'demo-project',
  storageBucket: 'demo-project.appspot.com',
  messagingSenderId: '1234567890',
  appId: '1:1234567890:web:demo-app',
};

const app = initializeApp(firebaseConfig);

export default app;
