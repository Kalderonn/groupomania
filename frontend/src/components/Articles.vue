<template>
    <div>
        <b-container>
            <div v-for="publication in publications" :key="publication.id" class="p-3 rounded shadow mt-3">
                <div v-if="(edit == true) && (publication.id == selectedPublication.id)">
                    <b-form-group label="Modifier votre publication" label-for="post">
                        <b-form-textarea id="post" v-model="selectedPublication.content"></b-form-textarea>
                    </b-form-group>
                    <b-row>
                        <b-col>
                            <b-form-file accept="image/*" v-model="selectedPublication.file"
                                :state="Boolean(selectedPublication.file)" placeholder="Choisissez une image"
                                drop-placeholder="Drop file here...">
                            </b-form-file>
                            <div class="mt-3">
                                Image selectionnée: {{ selectedPublication.file ? selectedPublication.file.name : "" }}
                            </div>
                            <div>
                                <b-button class="mt-2 mb-2 mr-3" size="sm" type="submit"
                                    @click.prevent="sendUpdatedPublication" variant="success">
                                    Editer
                                </b-button>
                                <b-button class="mt-2 mb-2" size="sm" type="submit" @click.prevent="editPublication"
                                    variant="danger">
                                    Annuler
                                </b-button>
                            </div>
                        </b-col>
                    </b-row>
                </div>

                <div v-else class="d-flex justify-content-between">
                    <!-- auteur et date -->
                    <div>
                        <p class="m-0 h2">{{ publication.user.firstName + " " + publication.user.lastName }}</p>
                        <span class="text-muted fs-7">{{ formatDate(publication.createdAt) }}</span>
                    </div>
                    <div class="d-flex align-items-center">
                        <!-- edit button -->
                        <div size="sm" class="mr-4" variant="dark">
                            <b-icon v-if="isAdmin === 'true' || publication.userId == currentUserId" role="button"
                                icon="pencil" font-scale="1" aria-hidden="true" @click="editPublication(publication)">
                            </b-icon>
                        </div>
                        <!-- delete button -->
                        <div size="sm" class="mr-2">
                            <b-icon v-if="isAdmin === 'true' || publication.userId == currentUserId"
                                @click="deletePublication(publication)" role="button" icon="trash" variant="danger"
                                font-scale="1" aria-hidden="true">
                            </b-icon>
                        </div>
                    </div>
                </div>
                <!-- post content -->
                <div class="mt-3">
                    <p> {{ publication.content }} </p>
                    <div>
                        <b-img :src=publication.imageUrl alt="post image" fluid center class="rounded" />
                    </div>
                    <div class="mt-3 d-flex justify-content-center">
                        <!-- likes -->
                        <!-- <b-icon @click="addLike(publication)" role="button" icon="heart-fill" variant="danger"
                            font-scale="1.4" aria-hidden="true">
                        </b-icon> -->
                        <b-icon @click="addLike(publication)" role="button" icon="heart" variant="danger"
                            font-scale="1.4" aria-hidden="true">
                        </b-icon>
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
            likes: [],
            edit: false,
            selectedPublication: [],

        }
    },
    computed: {
        addCurrentId() {
            const userId = localStorage.getItem('currentUser')
            return this.currentUserId = userId
        },
        addIsAdmin() {
            const isAdmin = localStorage.getItem('isAdmin')
            return this.isAdmin = isAdmin
        },
        getAllPublications() {
            if (this.publications != []) {
                Axios.get("/publications")
                    .then((response) => {
                        this.publications = response.data
                        // console.log(response.data)
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            }
        },
        // addAllLikes() {
        //     this.publications.forEach(publication => {
        //         // console.log(publication.likes)
        //         return this.likes = publication.likes
        //     })
        // },

        // addAllLikes() {
        //     this.publications.forEach(publication => {
        //         // console.log(publication.likes)
        //         this.likes = publication.likes
        //     })
        // }
        // addAllLikes() {
        //     // if (this.likes = []) {
        //         Axios.get("/publications/likes")
        //             .then((response) => {
        //              this.likes = response.data
        //                 console.log(response.data)
        //             })
        //             .catch((error) => {
        //                 console.log(error)
        //             });
        //     // }

        // }
    },
    methods: {
        formatDate(date) {
            moment.locale('fr')
            return moment(date).fromNow()
        },
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
        },
        editPublication(publication) {
            if (this.edit === false) {
                this.edit = true
                // console.log('test')
                Axios.get(`/publications/${publication.id}`)
                    .then((response) => {
                        this.selectedPublication = response.data
                        console.log(this.selectedPublication)
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            }
            else {
                this.edit = false
            }
        },
        sendUpdatedPublication() {
            console.log("sendUpdated")
            const file = this.selectedPublication.file
            const publication = {
                content: this.selectedPublication.content
            }
            const formData = new FormData()
            formData.append("publication", JSON.stringify(publication))
            formData.append("image", file)
            Axios.put(`/publications/${this.selectedPublication.id}`, formData)
                .then((res) => {
                    this.edit = false
                    console.log(res)
                    alert('Publication modifiée !');
                })
                .catch((error) => {
                    // alert(``);
                    console.log(error)
                });

        },
        addLike(publication) {

            Axios.post(`/publications/${publication.id}/like`)
                .then((response) => {
                    // console.log(this.publications)
                    // console.log(this.publications[0].likes)
                    console.log(response.data.message)
                })
                .catch((error) => {
                    console.log(error)
                });
            // this.isLiked
            console.log(this.publications)
        },
    },
    created() {
    },
    beforeMount() {
    },
    mounted() {
        this.addCurrentId
        this.addIsAdmin
        this.getAllPublications

    },
    beforeUpdate() {
        this.getAllPublications
    },
    updated() {
    },



};
</script>

<style lang="scss" scoped>
</style>
