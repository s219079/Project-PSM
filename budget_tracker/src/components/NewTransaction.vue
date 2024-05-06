<template>
    <div class="new-transaction">
        <h2>Dodaj nową transakcję</h2>
        <form @submit.prevent="addTransaction">
        <!-- Pola formularza: kwota, data, kategoria, opis, zdjęcie: -->
            <select v-model="transactionType" required>
                <option value="">Wybierz typ</option>
                <!-- Lista opcji typów -->
                <option value="income">Przychód</option>
                <option value="expense">Wydatek</option>
            </select>

            <!-- Pole kwoty -->
            <input type="number" v-model="amount" required placeholder="Kwota transakcji">

            <!-- Pole daty -->
            <input type="date" v-model="date" required>

            <!-- Pole kategorii -->
            <select v-model="category" required>
                <option value="">Wybierz kategorię</option>
                <!-- Lista opcji kategorii -->
                <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
            </select>

            <!-- Pole opisu -->
            <textarea v-model="description" placeholder="Opis transakcji"></textarea>

            <!-- Pole dodawania zdjęcia paragonu -->
            <input type="file" @change="handleFileUpload">

            <!-- Przycisk dodawania transakcji -->
            <button type="submit">Dodaj transakcję</button>
        </form>
    </div>
</template>

<script>
import { collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Dodaj import storage
import { db } from '../firebase/firebase';
import { getAuth } from 'firebase/auth';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'NewTransaction',
    data() {
        return {
            categories: [
                { id: 1, name: 'Jedzenie' },
                { id: 2, name: 'Transport' },
                { id: 3, name: 'Rozrywka' },
                { id: 4, name: 'Zakupy' },
                { id: 5, name: 'Inne' }
            ],
            transactionType: '', // Typ transakcji
            amount: null,
            date: '',
            category: '',
            description: '',
            receiptImage: null
        };
    },
    methods: {
        async addTransaction() {
            // Walidacja typu transakcji
            if (!this.transactionType) {
                alert('Proszę wybrać typ transakcji.');
                return;
            }
            // Walidacja pól formularza
            if (!this.amount || this.amount <= 0) {
                // Wyświetlenie komunikatu błędu
                alert('Proszę wprowadzić prawidłową kwotę transakcji.');
                return;
            }

            let imageUrl = null;

            // Jeśli użytkownik załadował zdjęcie
            if (this.receiptImage) {
                // Prześlij zdjęcie do Firebase Storage
                const storage = getStorage(); // Uzyskanie instancji Firebase Storage
                const storageRef = ref(storage, this.receiptImage.name); // Utworzenie referencji do pliku
                await uploadBytes(storageRef, this.receiptImage); // Przesłanie danych binarnych do Firebase Storage

                // Pobierz adres URL przesłanego zdjęcia
                imageUrl = await getDownloadURL(storageRef);
            }
            try {
                const auth = getAuth(); // Pobieramy obiekt autentykacji
                const user = auth.currentUser; // Pobieramy bieżącego użytkownika
                if (!user) {
                    throw new Error('Użytkownik niezalogowany');
                }
                const userId = user.uid;
                // Przygotowanie danych transakcji
                const transactionData = {
                    type: this.transactionType,
                    amount: this.amount,
                    date: this.date,
                    category: this.category,
                    description: this.description,
                    receiptImage: imageUrl
                };

                // Dodanie transakcji do kolekcji 'transactions' w bazie danych Firestore
                await addDoc(collection(db, `users/${userId}/transactions`), transactionData);

                // Zresetowanie pól formularza po pomyślnym dodaniu transakcji
                this.transactionType = '';
                this.amount = null;
                this.date = '';
                this.category = '';
                this.description = '';
                this.receiptImage = null;

                // Powiadomienie użytkownika o pomyślnym dodaniu transakcji
                alert('Transakcja została dodana pomyślnie.');

                // Opcjonalnie, możesz wykonać inne akcje po dodaniu transakcji, np. przekierowanie użytkownika
            } catch (error) {
                // Obsługa błędu dodawania transakcji
                console.error('Błąd podczas dodawania transakcji:', error);
                alert('Wystąpił błąd podczas dodawania transakcji. Spróbuj ponownie później.');
            }
        }
    }
});
</script>

<style scoped>
/* Dodaj style dla formularza */
</style>
