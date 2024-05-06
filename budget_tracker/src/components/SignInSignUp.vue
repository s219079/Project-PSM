<!-- Template -->
<template>
    <div class="login">
        <h1>Logowanie / Rejestracja</h1>
        <form @submit.prevent="handleSubmit">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="email" required>
            <label for="password">Hasło:</label>
            <input type="password" id="password" v-model="password" required>
            <button type="submit">Zaloguj / Zarejestruj</button>
        </form>
    </div>
</template>
  
<script>
    import { ref } from 'vue';
	import { collection } from 'firebase/firestore';
	import { getAuth } from 'firebase/auth';
    import { db } from '../firebase/firebase';
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'LoginForm',
        setup() {
            const email = ref('');
            const password = ref('');

            const handleSubmit = async () => {
            // Wywołaj metodę w pliku main.js, przekazując wartości email i password
            window.handleSignInSignUp(email.value, password.value);
            };
        
            return {
                email,
                password,
                handleSubmit
            };
        }
    });

    const user = getAuth.currentUser;
    if (user) {
        const userId = user.uid;

        // Utworzenie referencji do kolekcji transakcji użytkownika
        const userTransactionsCollection = collection(db, userId);
        console.log(userTransactionsCollection);
    }
</script>
  
<style>
  /* Dodaj style dla formularza */
</style>
  