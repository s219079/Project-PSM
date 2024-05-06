import { createApp } from 'vue';
import App from './App.vue';
import { db } from './firebase/firebase';
import router from './router';
import HeaderCash from './components/HeaderCash.vue';
import FooterMenu from './components/FooterMenu.vue';
import './registerServiceWorker';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

window.handleSignInSignUp = async (email, password) => {
    try {
        // Sprawdź, czy użytkownik istnieje
        const userCredential = await signInWithEmailAndPassword(email, password);
        console.log('Zalogowano:', userCredential.user);
    } catch (error) {
        // Jeśli użytkownik nie istnieje, utwórz nowego
        if (error.code === 'auth/user-not-found') {
            try {
                const userCredential = await createUserWithEmailAndPassword(email, password);
                console.log('Zarejestrowano:', userCredential.user);
            } catch (error) {
                console.error('Błąd podczas rejestracji:', error);
            }
        } else {
            console.error('Błąd podczas logowania:', error);
        }
    }
};

const appVue = createApp(App);
appVue.use(router); // Zintegruj router z aplikacją Vue
appVue.component('HeaderCash', HeaderCash);
appVue.component('FooterMenu', FooterMenu);

appVue.config.globalProperties.$db = db; // Dodajemy Firestore do globalnych właściwości

appVue.mount('#app');
