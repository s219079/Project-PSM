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
			path: '/signin-signup',
			name: 'Login Page',
			component: SignInSignUp
		},
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
				name: 'NewTransaction',
				component: NewTransaction
				},
				{
				path: '/profile-page',
				name: 'ProfilePage',
				component: ProfilePage
				},
				{
				path: '/settings-page',
				name: 'Settings Page',
				component: SettingsPage
				}
			]
		}
	]
});

export default router;
