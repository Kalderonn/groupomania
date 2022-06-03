<template>
  <div>
    <section>
      <b-container class="d-flex justify-content-center align-items-center">
            <b-card>
                <b-row>
                  <b-col class="order-2">
                    <h1 v-if="mode == 'login'">Connexion</h1>
                    <h1 v-else>Inscription</h1>
                    <p v-if="mode == 'login'" class="mb-4">Toujours pas de compte? <span><a @click="switchToCreateAccount" href="#!">Créer un compte</a></span></p>
                    <p v-else>Déjà un compte? <span><a @click="switchToLogin" href="#!">Se connecter</a></span></p>
                    <b-form>
                      <div v-if="mode == 'create'">
                      <b-form-group label="Prénom" label-for="firstName">
                        <b-form-input type="text" id="firstName" v-model="user.firstName" placeholder="Entrez votre prénom"></b-form-input>
                      </b-form-group>
                      <b-form-group label="Nom" label-for="lastName">
                        <b-form-input type="text" id="lastName" v-model="user.lastName" placeholder="Entrez votre nom"></b-form-input>
                      </b-form-group>
                      </div>
                      <b-form-group label="Email" label-for="email">
                        <b-form-input type="email" id="email" v-model="user.email" placeholder="Entrez votre email"></b-form-input>
                      </b-form-group>
                      <b-form-group label="Mot de passe" label-for="password">
                        <b-form-input type="password" id="password" v-model="user.password" placeholder="Entrez votre mot de passe"></b-form-input>
                      </b-form-group>
                      <div class="mt-5 mb-3">
                        <b-button v-if="mode == 'login'" class="w-100" type="submit" variant="primary">Connexion</b-button>
                        <b-button v-else class="w-100" type="submit" variant="primary">S'inscrire</b-button>
                      </div>
                      
                    </b-form>
                  </b-col>
                  <div class="col-lg-6 col-xl-7 d-flex align-items-center justify-content-center order-1 order-lg-2">
                    <b-img :src="require('../assets/NicePng_instagram-likes-png_7874643.png')" fluid alt="illustration d'un homme et d'une femme sur les réseaux sociaux"></b-img>
                  </div>
                </b-row>
            </b-card>
      </b-container>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "SignUp",
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      },
      mode: 'login',
    };
  },
  methods: {
    signup(){
      console.log(this.user)
    },
    switchToCreateAccount(){
      this.mode = 'create';
    },
    switchToLogin(){
      this.mode = 'login';
    }
  },
};
</script>

<style lang="scss" scoped></style>
