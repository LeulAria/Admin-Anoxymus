<template>
  <v-container>
    <div class="d-flex align-start justify-center">
      <div class="mr-auto">
        <v-btn icon @click="goBack">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </div>
      <div class="d-flex flex-column align-center justify-center mb-10 mr-auto">
        <v-avatar
          color="gray lighten-4"
          size="90"
        >
          <v-icon class="display-3 gray--text">mdi-account</v-icon>
        </v-avatar>
        <h4>Create a new user</h4>
      </div>
    </div>
    <ValidationObserver ref="loginObserver">
      <form>
        <v-card max-width="800" elevation="0" class="mx-auto">
          <v-row spacing="5">
            <v-col
              cols="12"
              md="6"
              sm="4"
            >
              <ValidationProvider v-slot="{ errors }" name="E-mail" rules="required|min:2">
                <v-text-field
                  v-model="email"
                  :error-messages="errors"
                  prepend-icon="mdi-account-outline"
                  hint="Username"
                  label="Username"
                  required
                ></v-text-field>
              </ValidationProvider>
              <ValidationProvider v-slot="{ errors }" name="E-mail" rules="required|min:2">
                <v-text-field
                  v-model="email"
                  :error-messages="errors"
                  prepend-icon="mdi-account-outline"
                  hint="Username"
                  label="Username"
                  required
                ></v-text-field>
              </ValidationProvider>
              <ValidationProvider v-slot="{ errors }" name="E-mail" rules="required|min:2">
                <v-text-field
                  v-model="email"
                  :error-messages="errors"
                  prepend-icon="mdi-account-outline"
                  hint="Username"
                  label="Username"
                  required
                ></v-text-field>
              </ValidationProvider>
              <ValidationProvider v-slot="{ errors }" name="E-mail" rules="required|min:2">
                <v-text-field
                  v-model="email"
                  :error-messages="errors"
                  prepend-icon="mdi-account-outline"
                  hint="Username"
                  label="Username"
                  required
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col
              cols="12"
              md="6"
              sm="4"
            >
              <ValidationProvider v-slot="{ errors }" name="E-mail" rules="required|min:2">
                <v-text-field
                  v-model="email"
                  :error-messages="errors"
                  prepend-icon="mdi-email-outline"
                  hint="Email account"
                  label="E-mail"
                  required
                ></v-text-field>
              </ValidationProvider>
              <ValidationProvider v-slot="{ errors }" name="E-mail" rules="required|min:2">
                <v-text-field
                  v-model="email"
                  :error-messages="errors"
                  prepend-icon="mdi-account-outline"
                  hint="Username"
                  label="Username"
                  required
                ></v-text-field>
              </ValidationProvider>
              <ValidationProvider v-slot="{ errors }" name="E-mail" rules="required|min:2">
                <v-text-field
                  v-model="email"
                  :error-messages="errors"
                  prepend-icon="mdi-account-outline"
                  hint="Username"
                  label="Username"
                  required
                ></v-text-field>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-btn
            class="mt-5"
            outlined
            color="primary"
            :loading="loading"
            :disabled="loaidng"
            @click="submit"
          >
            <span>Create User</span>
          </v-btn>
        </v-card>
      </form>
    </ValidationObserver>   
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class CreateUser extends Vue {
  email = "";
  loading = false;

  goBack() {
    this.$router.back()
  }

  submit() {
    this.loading = true;

    (this.$refs.loginObserver as Vue & {
      validate: () => any;
    })
    .validate()
    .then((isValid: boolean) => {
      if(isValid) {
        alert("Valid Info Here...")
      } else {
        setTimeout(() => (this.loading = false), 2000);
      }
    })
    .catch((error: any) => {
      setTimeout(() => (this.loading = false), 2000);
    });

  }
}
</script>

<style>
</style>