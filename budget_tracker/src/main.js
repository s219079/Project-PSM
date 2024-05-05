import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import HeaderCash from './components/HeaderCash.vue';
import FooterMenu from './components/FooterMenu.vue';
import './registerServiceWorker';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

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
const appFirebase = initializeApp(firebaseConfig);
const auth = getAuth(appFirebase);

window.handleSignInSignUp = async (email, password) => {
    try {
        // Sprawdź, czy użytkownik istnieje
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('Zalogowano:', userCredential.user);
    } catch (error) {
        // Jeśli użytkownik nie istnieje, utwórz nowego
        if (error.code === 'auth/user-not-found') {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                console.log('Zarejestrowano:', userCredential.user);
            } catch (error) {
                console.error('Błąd podczas rejestracji:', error);
            }
        } else {
            console.error('Błąd podczas logowania:', error);
        }
    }
};

export { appFirebase }; // Eksportuj appFirebase
const appVue = createApp(App)
appVue.use(router) // Zintegruj router z aplikacją Vue
appVue.component('HeaderCash', HeaderCash);
appVue.component('FooterMenu', FooterMenu);

appVue.mount('#app')
