<template>
    <div>
        <b-container>
            <b-card class="shadow mb-4 bg-secondary">
                <b-card-body>
                    <!-- <div class="mb-4">
                        <b-img center src="https://picsum.photos/1024/400/?image=41" fluid alt="Responsive image">
                        </b-img>
                    </div> -->
                    <div>
                        <b-form-group label="Quoi de neuf aujourd'hui??" label-for="post">
                            <b-form-textarea id="post"></b-form-textarea>
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
                                <b-button class="mt-2" type="submit" variant="dark">Publier</b-button>
                            </b-col>
                        </b-row>
                    </div>
                </b-card-body>
            </b-card>
        </b-container>
    </div>
</template>

<script>
export default {
    name: "Articles",
    data() {
        return {
            file: null,
        };
    },
    methods: {},
};
</script>

<style lang="scss" scoped>
</style>
