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
    import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Załóżmy, że korzystamy z Firebase Authentication i Firebase Storage
    import { getAuth, updateProfile  } from 'firebase/auth';
    import { getFirestore, doc, addDoc, getDoc, collection } from 'firebase/firestore';
    import { defineComponent } from 'vue';
    import { db, auth } from '../firebase/firebase';

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
            const user = auth.currentUser;
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
                this.email = user.email || '';
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
                        await updateProfile(user, {
                            displayName: this.displayName // Aktualizacja imienia i nazwiska
                        });
                        // Aktualizacja zdjęcia profilowego, jeśli użytkownik wysłał nowe zdjęcie
                        if (this.newPhoto) {
                            const storageRef = ref(getStorage()); // Get the reference to the Firebase Storage
                            const photoRef = ref(storageRef, `users/${user.uid}/profile.jpg`); // Path to save the photo in Storage
                            await uploadBytes(photoRef, this.newPhoto); // Upload the new photo to Storage
                            const photoURL = await getDownloadURL(photoRef); // Get the URL of the new photo
                            await user.updateProfile({ photoURL: photoURL }); // Update user data in Firebase Authentication
                            this.photoURL = photoURL;
                        }

                        // Zapisanie danych w Firestore
                        //await addDoc(collection(db, `users/${userId}/transactions`), transactionData);
                        const userProfileInfoCollection = collection(db, 'userProfileInfo');
                        await addDoc(userProfileInfoCollection, {
                            displayName: this.displayName,
                            email: this.email,
                            photoURL: this.photoURL
                        });
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
            },
        },
    });
</script>

<style scoped>
.profile-page {
    max-width: 600px;
    margin: 0 auto;
    padding: 1rem;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.profile-page h2 {
    text-align: center;
    color: #333;
}

.profile-page form {
    display: flex;
    flex-direction: column;
}

.profile-page label {
    margin-bottom: 1rem;
    font-size: 1rem;
    color: #555;
}

.profile-page input,
.profile-page textarea {
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-top: 0.5rem;
    width: 50%; /* Dodano szerokość 100% */
    box-sizing: border-box;
}

.profile-page button {
    padding: 0.75rem;
    font-size: 1rem;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    align-self: flex-start;
}

.profile-page button:hover {
    background-color: #0056b3;
}

.photo-preview {
    margin-bottom: 1rem;
    text-align: center;
}

.photo-preview img {
    max-width: 100px;
    border-radius: 50%;
    margin-top: 0.5rem;
}
</style>