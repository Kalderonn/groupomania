<template>
    <div>
        <b-container>
            <div v-for="publication in publications" :key="publication.id" class="p-3 rounded shadow mt-3">
                <div class="d-flex justify-content-between">
                    <!-- auteur et date -->
                    <div>
                        <p class="m-0 h2">{{ publication.user.firstName + " " + publication.user.lastName }}</p>
                        <span class="text-muted fs-7">{{ formatDate(publication.createdAt) }}</span>
                    </div>
                    <div class="d-flex align-items-center">
                        <!-- edit -->
                        <div size="sm" class="mr-4" variant="dark">
                            <b-icon v-if="isAdmin === 'true' || publication.userId == currentUserId" role="button" icon="pencil" font-scale="1"
                                aria-hidden="true"></b-icon>
                        </div>
                        <div size="sm" class="mr-2">
                            <b-icon v-if="isAdmin === 'true' || publication.userId == currentUserId" @click="deletePublication(publication)"
                                role="button" icon="trash" variant="danger" font-scale="1" aria-hidden="true">
                            </b-icon>
                        </div>
                    </div>
                </div>
                <!-- post content -->
                <div class="mt-3">
                    <div>
                        <p> {{ publication.content }} </p>
                        <b-img :src=publication.imageUrl alt="post image" fluid center class="rounded" />
                    </div>
                    <div class="mt-3 d-flex justify-content-center">
                        <!-- likes -->
                        <b-icon role="button" icon="heart" font-scale="1.4" aria-hidden="true"></b-icon>
                    </div>
                </div>
            </div>
        </b-container>
    </div>
</template>

<script>
import Axios from '@/_services/axios.config';
import moment from 'moment'

export default {
    name: "Articles",
    data() {
        return {
            publications: [],
            currentUserId: "",
            isAdmin: "",
        }
    },
    computed: {
        getAllPublications() {
            if (this.publications != []) {
                Axios.get("/publications")
                    .then((response) => {
                        this.publications = response.data
                        console.log(response.data)
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            }
        },
        addCurrentId() {
            const userId = localStorage.getItem('currentUser')
            return this.currentUserId = userId
        },
        addIsAdmin() {
            const isAdmin = localStorage.getItem('isAdmin')
            return this.isAdmin = isAdmin
        }


    },
    methods: {
        formatDate(date) {
            moment.locale('fr')
            return moment(date).fromNow()
        },
        // getAllPublications() {
        //     if (this.publications != []) {
        //         Axios.get("/publications")
        //             .then((response) => {
        //                 this.publications = response.data
        //                 console.log(response.data)
        //                 // this.publications = publications;
        //             })
        //             .catch((error) => {
        //                 console.log(error)
        //             });
        //     }
        // },
        deletePublication(publication) {
            console.log(publication)
            console.log("userId=", publication.id)
            Axios.delete("/publications/" + publication.id)
                .then((response) => {
                    console.log(response)
                })
                .catch((error) => {
                    console.log(error)
                });
            this.getAllPublications
        },
    },
    created() {
        // this.getAllPublications
        // // rend disponible l'accés à cette méthode depuis un autre composant
        // this.$root.$on('Articles', () => {
        //     this.getAllPublications
        // })
        this.addCurrentId
        this.addIsAdmin
        console.log(this.currentUserId)
    },
    mounted() {
        this.getAllPublications
        // rend disponible l'accés à cette méthode depuis un autre composant
        this.$root.$on('Articles', () => {
            this.getAllPublications
        })
        console.log(this.currentUserId)
        console.log(this.isAdmin)
        // this.addIdAndUserRole()
    },
    beforeUpdate() {
        // console.log(this.publications)
        // console.log(this.currentUserId)
        // console.log(this.isAdmin)
    },
    updated() {
    },



};
</script>

<style lang="scss" scoped>
</style>
