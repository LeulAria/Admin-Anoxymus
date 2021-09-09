<template>
  <v-main>
    <h1 class="text-center">LOGIN</h1>
    <v-form class="mt-10 px-10">
      <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
      <v-text-field v-model="email" :rules="emailRules" type="password" label="Password" required></v-text-field>
      <v-btn
        :loading="loggingIn"
        @click="loginUser"
        class="mt-5"
        dark
        large
        block
        rounded
        color="purple"
        elevation="0"
      >Login</v-btn>
    </v-form>
  </v-main>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class Login extends Vue {
  loggingIn = false;

  loginUser() {
    this.loggingIn = true;
    setTimeout(() => {
      this.loggingIn = false;
      this.$store.dispatch("user/setUser", { username: "Jean" });
      this.$router.push({ name: "Dashboard" });
    }, 2000)
    
  }
}
</script>

<style lang="stylus" scoped></style>