<template>
    <div class="profile-page">
      <h2>Mój profil</h2>
      <form @submit.prevent="saveProfileChanges">
        <!-- Podgląd aktualnego zdjęcia profilowego -->
        <div v-if="photoURL">
            Aktualne zdjęcie profilowe:
            <img :src="photoURL" alt="Zdjęcie profilowe">
        </div>
  
        <!-- Pole formularza: Zdjęcie profilowe -->
        <label>
            Zdjęcie profilowe:
            <input type="file" @change="handleFileUpload">
        </label>
  
        <!-- Pole formularza: Imię i nazwisko -->
        <label>
            Imię i nazwisko:
            <input type="text" v-model="displayName" required>
        </label>
  
        <!-- Pole formularza: E-mail (wyłączone do edycji) -->
        <label>
            E-mail:
            <input type="email" v-model="email" disabled>
        </label>
  
        <!-- Przycisk zapisywania zmian profilu -->
        <button type="submit">Zapisz zmiany</button>
      </form>
    </div>
  </template>
  
<script>
    import { getStorage, ref, uploadBytes } from 'firebase/storage'; // Załóżmy, że korzystamy z Firebase Authentication i Firebase Storage
    import { getAuth } from 'firebase/auth';
    import { getFirestore, doc, getDoc } from 'firebase/firestore';
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'ProfilePage',
        data() {
            return {
                displayName: '', // Imię i nazwisko użytkownika
                email: '', // Adres e-mail użytkownika
                photoURL: '', // URL aktualnego zdjęcia profilowego
                newPhoto: null // Nowe zdjęcie przesłane przez użytkownika
            };
        },
        async created() {
            // Pobranie bieżącego użytkownika (przy założeniu, że jesteśmy już uwierzytelnieni)
            const user = getAuth.currentUser;
            if (user) {
                // Ustawienie danych użytkownika w formularzu
                const db = getFirestore();
                const userDocRef = doc(db, 'users', user.uid);
                const userDocSnap = await getDoc(userDocRef);
                if (userDocSnap.exists()) {
                    const userData = userDocSnap.data();
                    this.email = userData.email || '';
                }
                this.displayName = user.displayName || '';
                this.photoURL = user.photoURL || ''; // Ustawienie URL aktualnego zdjęcia profilowego
            }
        },
        methods: {
            async saveProfileChanges() {
                try {
                // Pobranie bieżącego użytkownika (przy założeniu, że jesteśmy już uwierzytelnieni)
                    const user = getAuth.currentUser;
                    if (user) {
                        // Aktualizacja danych użytkownika
                        await user.updateProfile({
                        displayName: this.displayName // Aktualizacja imienia i nazwiska
                        });
                        // Aktualizacja zdjęcia profilowego, jeśli użytkownik wysłał nowe zdjęcie
                        if (this.newPhoto) {
                            const storageRef = ref(getStorage()); // Get the reference to the Firebase Storage
                            const photoRef = ref(storageRef, `users/${user.uid}/profile.jpg`); // Path to save the photo in Storage
                            await uploadBytes(photoRef, this.newPhoto); // Upload the new photo to Storage
                            const photoURL = await ref.getDownloadURL(photoRef); // Get the URL of the new photo
                            await user.updateProfile({ photoURL: photoURL }); // Update user data in Firebase Authentication
                            this.photoURL = photoURL;
                        }
                        // Powiadomienie użytkownika o zapisaniu zmian
                        alert('Zmiany w profilu zostały zapisane.');
                    }
                } catch (error) {
                // Obsługa błędu zapisu zmian profilu
                    console.error('Błąd podczas zapisywania zmian profilu:', error);
                    alert('Wystąpił błąd podczas zapisywania zmian profilu. Spróbuj ponownie później.');
                }
            },
            handleFileUpload(event) {
                // Obsługa przesłania nowego zdjęcia przez użytkownika
                this.newPhoto = event.target.files[0];
            }
        }
    });
</script>
  
<style scoped>
  /* Dodaj style dla strony profilu */
</style>
  