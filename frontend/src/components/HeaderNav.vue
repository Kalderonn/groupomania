<template>
  <div>
    <b-container>
      <b-navbar class="mt-5 mb-5 bg-primary shadow">
        <b-navbar-brand tag="h1">
          <b-img
            :src="require('../assets/icon-left-font-monochrome-white.svg')"
            fluid
            alt="logo groupomania"
          >
          </b-img>
        </b-navbar-brand>
        <b-navbar-nav v-if="isConnected == true" class="ml-auto" right>
          <b-button variant="light">
            <b-icon icon="box-arrow-right" aria-hidden="true"></b-icon>
          </b-button>
        </b-navbar-nav>
      </b-navbar>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "HeaderNav",
  data() {
    return {
      isConnected: false,
    };
  },
  computed: {
    verifToken() {
      if (localStorage.length !== 0) {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user.token;
        if (token) {
          return (this.isConnected = true);
        }
      }
    },
  },
  beforeMount() {
    this.verifToken;
  },
};
</script>

<style lang="scss" scoped></style>
