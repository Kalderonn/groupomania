<template>
  <div>
    <section>
      <b-container class="d-flex justify-content-center align-items-center">
            <b-card>
                <b-row class="align-items-center">
                  <b-col class="order-2">
                    <h1 v-if="mode == 'login'">Connexion</h1>
                    <h1 v-else>Inscription</h1>
                    <p v-if="mode == 'login'" class="mb-4">Toujours pas de compte? <span><a @click="switchToCreateAccount" href="#!">Créer un compte</a></span></p>
                    <p v-else>Déjà un compte? <span><a @click="switchToLogin" href="#!">Se connecter</a></span></p>
                    <b-form>
                      <div v-if="mode == 'create'">
                      <b-form-group label="Prénom" label-for="firstName">
                        <b-form-input type="text" id="firstName" v-model="user.firstName" placeholder="Entrez votre prénom" :state="validFirstNameInput"></b-form-input>
                        <b-form-invalid-feedback id="firstname-feedback">Doit contenir 3 lettres minimum et aucun chiffre</b-form-invalid-feedback>
                      </b-form-group>
                      <b-form-group label="Nom" label-for="lastName">
                        <b-form-input type="text" id="lastName" v-model="user.lastName" placeholder="Entrez votre nom" :state="validLastNameInput"></b-form-input>
                        <b-form-invalid-feedback id="lastname-feedback">Doit contenir 3 lettres minimum et aucun chiffre</b-form-invalid-feedback>
                      </b-form-group>
                      </div>
                      <b-form-group label="Email" label-for="email">
                        <b-form-input type="email" id="email" v-model="user.email" placeholder="Entrez votre email" :state="validEmailInput"></b-form-input>
                        <b-form-invalid-feedback id="email-feedback">Email non valide</b-form-invalid-feedback>
                      </b-form-group>
                      <b-form-group label="Mot de passe" label-for="password">
                        <b-form-input type="password" id="password" v-model="user.password" placeholder="Entrez votre mot de passe" :state="validPasswordInput"></b-form-input>
                        <b-form-invalid-feedback id="password-feedback">Le mot de passe doit contenir au moins 8 caractères et une lettre majuscule</b-form-invalid-feedback>
                      </b-form-group>
                      <div class="mt-5 mb-3">
                        <b-button v-if="mode == 'login'" @click.prevent="sendForm" block type="submit" variant="primary">Connexion</b-button>
                        <b-button v-else  @click.prevent="sendForm" block type="submit" variant="primary">S'inscrire</b-button>
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
    <router-view/>
  </div>
</template>

<script>

// import axios from 'axios'
import Axios from '@/_services/axios.config';

export default {
  name: "Login",
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
  computed:{
    validFirstNameInput() {
      // RegExp pour les champs firstName et lastName
      const noNumberRegExp = new RegExp("^[A-Za-z-À-ÖØ-öø-ÿ]{3,}$");
      const testFirstName = noNumberRegExp.test(this.user.firstName)
      if (this.user.firstName === "") {
        return null
      } else if (testFirstName === false){
        return false
      } else {
        return true
      }
    },
    validLastNameInput() {
      // RegExp pour les champs firstName et lastName
      const noNumberRegExp = new RegExp("^[A-Za-z-À-ÖØ-öø-ÿ]{3,}$");
      const testLastName = noNumberRegExp.test(this.user.lastName)
      if (this.user.lastName === "") {
        return null
      } else if (testLastName === false){
        return false
      } else {
        return true
      }
    },
    validEmailInput() {
      //RegExp pour l'email
      const emailRegExp = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$")
      const testEmail = emailRegExp.test(this.user.email);
      if (this.user.email === "") {
        return null
      } else if (testEmail === false){
        return false
      } else {
        return true
      }
    },
    validPasswordInput() {
      // RegExp pour le mot de passe
      const passwordRegExp  = new RegExp ("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$");
      const testPassword = passwordRegExp.test(this.user.password);
      if (this.user.password === "") {
        return null
      } else if (testPassword === false){
        return false
      } else {
        return true
      }
    },
  },   
  methods: {
    switchToCreateAccount(){
      this.mode = 'create';
    },
    switchToLogin(){
      this.mode = 'login';
    },
    sendForm(){
      if (this.mode == 'create') {
        if((this.validFirstNameInput && this.validLastNameInput && this.validEmailInput && this.validPasswordInput) === true){
          const userInfo = JSON.parse(JSON.stringify(this.user))
          // console.log(JSON.parse(JSON.stringify(this.user)));
          Axios.post("/auth/signup",userInfo )
            .then(() => {
                alert('inscription réussie !');
                this.mode = 'login'
                this.user ={
                  firstName: "",
                  lastName: "",
                  email: "",
                  password: "",
                }
            })
            .catch((error)=>{
              alert(`L'utilisateur ${this.user.email} existe déjà, veuillez crée un nouveau compte !`);
              this.user ={
                  firstName: "",
                  lastName: "",
                  email: "",
                  password: "",
                }
              console.log(error)});
            } 
      } else if (this.mode == 'login'){
          if ((this.validEmailInput && this.validPasswordInput) === true){
          console.log(this.user);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
