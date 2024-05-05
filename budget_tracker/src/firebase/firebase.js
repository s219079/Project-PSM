import { initializeFirestore } from 'firebase/firestore'; // Importuj instancję Firebase Firestore
import { getAuth } from 'firebase/auth';
import { appFirebase } from '../main.js';

const db = initializeFirestore(appFirebase);

// Funkcja do pobierania identyfikatora bieżącego użytkownika
export const getCurrentUserId = () => {
    const user = getAuth.currentUser;
    console.log("Current user:", user); // Dodaj ten console.log
    if (user) {
        return user.uid;
    } else {
        return null;
    }
};


// Funkcja do zapisywania ustawień powiadomień w bazie danych
export const updateNotificationSettings = async (notificationsEnabled) => {
    try {
        // Pobierz identyfikator aktualnie zalogowanego użytkownika (jeśli jest wymagane)
        const userId = getCurrentUserId(); // Załóżmy, że masz funkcję getCurrentUserId do pobrania identyfikatora użytkownika

        // Zaktualizuj dokument w kolekcji użytkowników zawierający ustawienia powiadomień
        await db.collection('users').doc(userId).update({
            notificationsEnabled: notificationsEnabled
        });

        // Zwróć sukces
        return true;
    } catch (error) {
        // Obsłuż błąd
        console.error('Błąd podczas zapisywania ustawień powiadomień:', error);
        throw error;
    }
};