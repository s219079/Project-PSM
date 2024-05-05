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

    export default {
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
    };
</script>
  
<style>
  /* Dodaj style dla formularza */
</style>
  