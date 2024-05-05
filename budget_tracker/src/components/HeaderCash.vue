<template>
    <header>
        <div>{{ userBalance }}</div>
    </header>
</template>
  
<script>
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'HeaderCash',
    props: {
        userBalance: Number
    }
  });
</script>
  
<style scoped>
  header {
    background-color: #333;
    color: white;
    padding: 10px;
    text-align: center;
  }
</style>
  