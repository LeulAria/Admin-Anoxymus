<template>
  <v-main>
    <ValidationObserver ref="loginObserver">
      <v-form class="mt-10 px-10" @submit.prevent="loginUser">
        <ValidationProvider v-slot="{errors}" name="name" rules="required|min:2">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            prepend-icon="mdi-email-outline"
            label="E-mail"
            required
          ></v-text-field>
        </ValidationProvider>
        <ValidationProvider v-slot="{errors}" name="name" rules="required|min:2">
          <v-text-field
            v-model="password"
            :rules="emailRules"
            label="Password"
            prepend-icon="mdi-lock-outline"
            :type="passwordEye ?'text': 'password'"
            :append-icon="passwordEye ? 'mdi-eye' : 'mdi-eye-off'"
            required
            @click:append="passwordEye=!passwordEye">
          ></v-text-field>
        </ValidationProvider>

        <v-btn
          dark
          large
          block
          class="mt-4"
          elevation="0"
          color="purple"
          type="submit"
          :loading="loggingIn"
          >Login</v-btn
        >
      </v-form>
    </ValidationObserver>
  </v-main>
</template>

<script lang="ts">
import {mapActions} from "vuex";
import {auth} from "../../firebase";
import * as Resource from "../../api/Resource";
import {Vue, Component} from "vue-property-decorator";
import {signInWithEmailAndPassword} from "firebase/auth";

@Component({
  methods: {
    ...mapActions("app", ["toggleGlobalSnackBar"]),
    ...mapActions("user", ["setUser"]),
  },
})
export default class Login extends Vue {
  email = "";
  password = "";
  loggingIn = false;
  passwordEye = false;
  toggleGlobalSnackBar!: (paylod: any) => void;
  setUser!: (user: any) => void;

  async loginUser() {
    this.loggingIn = true;
    try {
      const res = await signInWithEmailAndPassword(auth, this.email, this.password);
      const token = await res.user.getIdToken();
      const payload = {
        credential: {
          loginMethod: "email",
          firebaseIdToken: token || "",
        },
      };
      const loginFBRes = await Resource.users.signInWithFirebase().pipe(payload);

      this.$store.dispatch("user/setUser", loginFBRes?.data);
      setTimeout(() => {
        this.$router.push({name: "Dashboard"});
        this.toggleGlobalSnackBar({
          show: true,
          type: "success",
          text: "Welcome back!",
        });
        this.loggingIn = false;
      }, 400);
    } catch (err) {
      this.loggingIn = false;
      this.toggleGlobalSnackBar({
        show: true,
        type: "error",
        text: err.code?.split("/")[1] || "Unknown error pccured please try again!",
      });
    }
  }
}
</script>

<style lang="stylus" scoped></style>