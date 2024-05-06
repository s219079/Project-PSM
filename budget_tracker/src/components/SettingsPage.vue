<template>
    <div class="settings-page">
        <h2>Ustawienia</h2>
        <!-- Formularz ustawień powiadomień -->
        <form @submit.prevent="saveNotificationSettings">
            <!-- Pole formularza: Powiadomienia -->
            <label>
                <input type="checkbox" v-model="notificationsEnabled">
                Odbieraj powiadomienia
            </label>

            <!-- Przycisk zapisywania ustawień powiadomień -->
            <button type="submit">Zapisz ustawienia powiadomień</button>
        </form>

        <!-- Przycisk wylogowania -->
        <button @click="logout">Wyloguj</button>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { getAuth } from 'firebase/auth';
import { updateNotificationSettings } from '../firebase/firebase'; // Importuj funkcję zapisującą ustawienia powiadomień
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'SettingsPage',
    data() {
        return {
            notificationsEnabled: false // Domyślnie powiadomienia są wyłączone
        };
    },
    methods: {
        async saveNotificationSettings() {
            try {
                // Aktualizacja ustawień powiadomień w bazie danych lub innym magazynie danych
                // Tutaj użyjemy przykładowej funkcji updateNotificationSettings
                await updateNotificationSettings(this.notificationsEnabled);
                // Powiadomienie użytkownika o zapisaniu ustawień
                alert('Ustawienia powiadomień zostały zapisane.');
            } catch (error) {
                // Obsługa błędu zapisu ustawień powiadomień
                console.error('Błąd podczas zapisywania ustawień powiadomień:', error);
                alert('Wystąpił błąd podczas zapisywania ustawień powiadomień. Spróbuj ponownie później.');
            }
        },
        async logout() {
            try {
                // Wylogowanie użytkownika
                await getAuth().signOut(); // Wylogowanie z Firebase Authentication
                const router = useRouter();
                // Po wylogowaniu przekieruj użytkownika na stronę logowania
                router.push('/login');
            } catch (error) {
                // Obsługa błędu wylogowania
                console.error('Błąd podczas wylogowywania użytkownika:', error);
                alert('Wystąpił błąd podczas wylogowywania użytkownika. Spróbuj ponownie później.');
            }
        }
    }
});
</script>

<style scoped>
/* Dodaj style dla strony ustawień */
</style>
