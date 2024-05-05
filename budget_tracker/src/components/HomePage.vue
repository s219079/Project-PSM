<template>
    <div class="cashflow">
        <h2>Miesięczne podsumowanie transakcji</h2>
        <PieChart :data="chartData" :options="chartOptions" />
    </div>
</template>

<script>
import PieChart from '@/components/PieChart.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomePage',
  components: {
    PieChart
  },
  setup() {
    // wykres kołowy
    const chartData = {
        labels: ['Przychody', 'Wydatki'],
        datasets: [
            {
                backgroundColor: ['#36A2EB', '#FF6384'],
                data: [0, 0] // pobierz dane podsumowania miesięcznego
            }
        ]
    };
    const chartOptions = {
        responsive: true
    };
    return { chartData, chartOptions };
  }
});
</script>

<style scoped>
    .content {
        padding: 20px;
    }
</style>