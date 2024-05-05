import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import HeaderCash from './components/HeaderCash.vue';
import FooterMenu from './components/FooterMenu.vue';
import './registerServiceWorker';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGGF8s-eq99d4-WPS_greT54y17sHorFo",
  authDomain: "project-psm-b0980.firebaseapp.com",
  projectId: "project-psm-b0980",
  storageBucket: "project-psm-b0980.appspot.com",
  messagingSenderId: "166483875752",
  appId: "1:166483875752:web:97c02ddf19977412ed2f9d"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const app = createApp(App)
app.use(router) // Zintegruj router z aplikacją Vue
app.component('HeaderCash', HeaderCash);
app.component('FooterMenu', FooterMenu);

app.mount('#app')
