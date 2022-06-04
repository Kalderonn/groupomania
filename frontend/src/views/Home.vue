<template>
    <div>
        <header>
            <HeaderNav/>
        </header>
        <main>
            <Login/>
        </main>
            
    </div>
</template>

<script>
    import HeaderNav from '@/components/HeaderNav.vue'
    import Login from '@/components/Login.vue'
    export default {
        name: 'Home',
        components: {
            HeaderNav,  
            Login,
        }
    }
</script>

<style lang="scss" scoped>

</style>