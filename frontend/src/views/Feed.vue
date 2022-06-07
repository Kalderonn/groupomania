<template>
    <div>
        <HeaderNav/>
        <PostArticle/>
        <Articles/>
        <router-view/>
    </div>
</template>

<script>
    import HeaderNav from '@/components/HeaderNav.vue'
    import Articles from '@/components/Articles.vue'
    import PostArticle from '@/components/PostArticle.vue'

    export default {
        name: 'Feed',
        components:{
            HeaderNav,
            Articles,
            PostArticle
        },
    }
</script>

<style lang="scss" scoped>

</style>