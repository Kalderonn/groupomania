<template>
    <div>
            <HeaderNav/>
            <SignUp/>
    </div>
</template>

<script>
    import HeaderNav from '@/components/HeaderNav.vue'
    import SignUp from '@/components/SignUp.vue'
    export default {
        name: 'Home',
        components: {
            HeaderNav,  
            SignUp
        }
    }
</script>

<style lang="scss" scoped>

</style>