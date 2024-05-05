import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '../components/MainLayout.vue';
import HomePage from '../components/HomePage.vue';
import NewTransaction from '../components/NewTransaction.vue';
import ProfilePage from '../components/ProfilePage.vue';
import SettingsPage from '../components/SettingsPage.vue';
import SignInSignUp from '../components/SignInSignUp.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'HomePage',
          component: HomePage
        },
        {
          path: '/new-transaction',
          name: 'New Transaction',
          component: NewTransaction
        },
        {
          path: '/profile-page',
          name: 'Profile Page',
          component: ProfilePage
        },
        {
          path: '/settings-page',
          name: 'Settings Page',
          component: SettingsPage
        },
        {
          path: '/signin-signup',
          name: 'Login Page',
          component: SignInSignUp
        }
      ]
    }
  ]
});

export default router;
