<template>
    <div>
        <b-container>
            <div class="p-3 rounded shadow mt-3">
                <div class="d-flex justify-content-between">
                    <!-- auteur et date -->
                        <div>
                            <p class="m-0 ">John</p>
                            <span class="text-muted fs-7">July 17 at 1:23 pm</span>
                        </div>
                    <div class="d-flex align-items-center">
                    <!-- edit -->
                    <div size="sm" class="mr-4" variant="dark">
                        <b-icon role="button" icon="pencil" font-scale="1" aria-hidden="true"></b-icon>
                    </div>
                    <div size="sm" class="mr-2" >
                        <b-icon role="button" icon="trash" variant="danger" font-scale="1" aria-hidden="true"></b-icon>
                    </div>
                    </div>
                </div>
                <!-- post content -->
                <div class="mt-3">
                    <div>
                        <p>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae
                            fuga incidunt consequatur tenetur doloremque officia corrupti
                            provident tempore vitae labore?
                        </p>
                        <b-img src="https://source.unsplash.com/random/12" alt="post image" fluid class="rounded" />
                    </div>
                    <div class="mt-3 d-flex justify-content-center">
                        <!-- likes -->
                        <b-icon  role="button" icon="heart" font-scale="1.4" aria-hidden="true"></b-icon>
                    </div>
                </div>
            </div>
        </b-container>
    </div>
</template>

<script>
export default {
    name: "Articles",
    components: {},
};
</script>

<style lang="scss" scoped>
</style>
