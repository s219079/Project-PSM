<template>
    <div class="main-layout">
        <HeaderCash :userBalance="userBalance" />
        <router-view></router-view>
        <FooterMenu />
    </div>
</template>

<script>
    import HeaderCash from '@/components/HeaderCash.vue';
    import FooterMenu from '@/components/FooterMenu.vue';
    import { defineComponent, ref } from 'vue';

    export default defineComponent({
        name: 'MainLayout',
        components: {
            HeaderCash,
            FooterMenu
        },
        setup() {
            const userBalance = ref(0);
            return { userBalance };
        }
    });
</script>

<style>
</style>
