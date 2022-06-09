<template>
    <div>
        <b-container>
            <b-card class="shadow mb-4 bg-secondary">
                <b-card-body>
                    <div>
                        <b-form-group label="Quoi de neuf aujourd'hui??" label-for="post">
                            <b-form-textarea id="post" v-model="content"></b-form-textarea>
                        </b-form-group>
                        <b-row>
                            <b-col>
                                <!-- <b-file accept="image/*" browse-text="Choisir une image" plain></b-file> -->
                                <b-form-file accept="image/*" v-model="file" :state="Boolean(file)"
                                    placeholder="Choisissez une image" drop-placeholder="Drop file here...">
                                </b-form-file>
                                <div class="mt-3">
                                    Image selectionnée: {{ file ? file.name : "" }}
                                </div>
                                <b-button class="mt-2" type="submit" @click.prevent="sendArticle" variant="dark">Publier
                                </b-button>
                            </b-col>
                        </b-row>
                    </div>
                </b-card-body>
            </b-card>
        </b-container>
    </div>
</template>

<script>
import Axios from '@/_services/axios.config';

export default {
    name: "Articles",
    data() {
        return {
            file: null,
            content: ""
        };
    },
    methods: {
        sendArticle() {
            const file = this.file
            const publication = {
                content: this.content
            }
            const formData = new FormData()
            formData.append("publication", JSON.stringify(publication))
            formData.append("image", file)
            Axios.post("/publications",formData)
                .then((res) => {
                    this.file = null
                    this.content = ""
                    console.log(res)
                    alert('Publication créée !');
                })
                .catch((error) => {
                    // alert(``);
                    console.log(error)
                });
        },
    },
    computed: {

    },
    beforeMount() {
        // console.log(this.file);
    },
    updated() {
    }
};
</script>

<style lang="scss" scoped>
</style>
