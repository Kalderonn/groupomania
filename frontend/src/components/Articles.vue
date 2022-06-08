<template>
    <div>
        <b-container>
            <div v-for="publication in publications" :key="publication.id" class="p-3 rounded shadow mt-3">
                <div class="d-flex justify-content-between">
                    <!-- auteur et date -->
                    <div>
                        <p class="m-0 h2">{{publication.user.firstName + " " + publication.user.lastName}}</p>
                        <span class="text-muted fs-7">{{ publication.createdAt }}</span>
                    </div>
                    <div class="d-flex align-items-center">
                        <!-- edit -->
                        <div size="sm" class="mr-4" variant="dark">
                            <b-icon role="button" icon="pencil" font-scale="1" aria-hidden="true"></b-icon>
                        </div>
                        <div size="sm" class="mr-2">
                            <b-icon role="button" icon="trash" variant="danger" font-scale="1" aria-hidden="true">
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
export default {
    name: "Articles",
    data() {
        return {
            publications: [],
            likes: []
        }
    },
    
    methods: {
         getAllPublications() {
            Axios.get("/publications")
                .then((response) => {
                    let publications = response.data
                    console.log(response.data)
                    this.publications = publications;
                })
                .catch((error) => {
                    console.log(error)
                });
        },
    },
    created() {
        this.getAllPublications()
    },
    beforeUpdate() {
        console.log(this.publications)


    },

};
</script>

<style lang="scss" scoped>
</style>
