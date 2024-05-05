<template>
    <div class="new-transaction">
        <h2>Dodaj nową transakcję</h2>
        <form @submit.prevent="addTransaction">
        <!-- Pola formularza: kwota, data, kategoria, opis, zdjęcie: -->
            <select v-model="transactionType" required>
                <option value="">Wybierz typ</option>
                <!-- Lista opcji typów -->
                <option v-for="transactionType in types" :key="transactionType.id" :value="transactionType.id">{{ transactionType.name }}</option>
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
export default {
    name: 'NewTransaction',
    data() {
        return {
            types: [ /* lista typów transakcji */ ],
            categories: [ /* lista kategorii */ ],
            amount: null,
            date: '',
            category: '',
            description: '',
            receiptImage: null
        };
    },
    methods: {
        addTransaction() {
            // Logika dodawania transakcji
            // Walidacja pól formularza
            if (!this.amount || this.amount <= 0) {
                // Wyświetlenie komunikatu błędu
                return;
            }
            // Przygotowanie danych transakcji
            const transactionData = {
                amount: this.amount,
                date: this.date,
                category: this.category,
                description: this.description,
                receiptImage: this.receiptImage // Jeśli chcesz przesyłać zdjęcie
            };
        },
        handleFileUpload(event) {
            // Obsługa przesłania zdjęcia
            this.receiptImage = event.target.files[0];
        }
    }
};
</script>

<style scoped>
/* Dodaj style dla formularza */
</style>
