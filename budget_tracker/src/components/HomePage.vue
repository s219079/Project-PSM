<template>
    <div class="cashflow">
        <h2>Miesięczne podsumowanie transakcji</h2>
        <!-- <PieChart :data="chartData" :options="chartOptions" /> -->
        <div>
            <div class="chart-container">
                <h3>Przychody:</h3>
                <PieChart v-if="incomeTransactions.length" :data="incomeChartData" :options="chartOptions" />
                <p v-else>Brak transakcji przychodów</p>
            </div>
            <ul>
                <li v-for="transaction in incomeTransactions" :key="transaction.id">
                {{ transaction.date }} - {{ transaction.amount }} - {{ transaction.category }}
                </li>
            </ul>
        </div>
        <div>
            <div class="chart-container">
                <h3>Wydatki:</h3>
                <PieChart v-if="expenseTransactions.length" :data="expenseChartData" :options="chartOptions" />
                <p v-else>Brak transakcji wydatków</p>
            </div>
            <ul>
                <li v-for="transaction in expenseTransactions" :key="transaction.id">
                {{ transaction.date }} - {{ transaction.amount }} - {{ transaction.category }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, onMounted  } from 'vue';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase/firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Pie } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

ChartJS.defaults.font.size = 12;

export default defineComponent({
  name: 'HomePage',
  components: {
    PieChart: Pie,
  },
  setup() {
    const incomeTransactions = ref([]);
    const expenseTransactions = ref([]);
    const incomeChartData = ref({});
    const expenseChartData = ref({});
    const chartOptions = ref({
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Podział według kategorii',
        },
      },
      width: 5,
        height: 5,
    });

    const fetchTransactions = async (userId) => {
        try {
            const querySnapshot = await getDocs(collection(db, `users/${userId}/transactions`));
            const income = [];
            const expenses = [];
            const incomeCategoryData = {};
            const expenseCategoryData = {};

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const transaction = { id: doc.id, ...data };

                if (data.type === 'income') {
                    income.push(transaction);
                    incomeCategoryData[data.category] = (incomeCategoryData[data.category] || 0) + data.amount;
                } else if (data.type === 'expense') {
                    expenses.push(transaction);
                    expenseCategoryData[data.category] = (expenseCategoryData[data.category] || 0) + data.amount;
                }
            });

            incomeTransactions.value = income;
            expenseTransactions.value = expenses;

            incomeChartData.value = {
                labels: Object.keys(incomeCategoryData),
                datasets: [
                    {
                    label: 'Przychody',
                    backgroundColor: Object.keys(incomeCategoryData).map(() => '#36A2EB'),
                    data: Object.values(incomeCategoryData),
                    },
                ],
            };

            expenseChartData.value = {
                labels: Object.keys(expenseCategoryData),
                datasets: [
                    {
                    label: 'Wydatki',
                    backgroundColor: Object.keys(expenseCategoryData).map(() => '#FF6384'),
                    data: Object.values(expenseCategoryData),
                    },
                ],
                };
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
            };


            onMounted(() => {
            const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
                if (user) {
                fetchTransactions(user.uid);
                }
            });
    });

        return { incomeTransactions, expenseTransactions, incomeChartData, expenseChartData, chartOptions };
    }
});
</script>

<style scoped>
    .content {
        padding: 20px;
    }
</style>