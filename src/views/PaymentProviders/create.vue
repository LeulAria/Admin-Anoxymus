<template>
  <v-container>
    
    <div class="d-flex align-start justify-center">
      <div class="mr-auto">
        <v-btn icon @click="goBack">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </div>
      <div class="d-flex flex-column align-center justify-center mb-10 mr-auto">
        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" class="bi bi-credit-card-2-back-fill" viewBox="0 0 16 16">
          <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5H0V4zm11.5 1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-2zM0 11v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1H0z"/>
        </svg>
        <h4>Create new payment provider</h4>
      </div>
    </div>

    <ValidationObserver ref="loginObserver">
      <form>
        <v-card max-width="800" elevation="0" class="mx-auto">
          <v-row spacing="5">
            <v-col cols="12" md="6" lg="5">
              <ValidationProvider
                v-slot="{ errors }"
                name="name"
                rules="required|min:2"
              >
                <v-text-field
                  v-model="paymentProvider.name"
                  :error-messages="errors"
                  prepend-icon="mdi-account-outline"
                  hint="Payment Provider Name"
                  label="Name"
                  required
                ></v-text-field>
              </ValidationProvider>

              <ValidationProvider
                v-slot="{ errors }"
                name="identifier"
                rules="required|min:2"
              >
                <v-text-field
                  v-model="paymentProvider.identifier"
                  :error-messages="errors"
                  prepend-icon="mdi-account-outline"
                  hint="Payment Provider Identifier"
                  label="Identifier"
                  required
                ></v-text-field>
              </ValidationProvider>

              <ValidationProvider
                v-slot="{ errors }"
                name="email"
                rules="required|min:2"
              >
                <v-text-field
                  v-model="paymentProvider.iconUrl"
                  :error-messages="errors"
                  prepend-icon="mdi-attachment"
                  hint="Payment Provider Icon Url"
                  label="Icon Url"
                  required
                ></v-text-field>
              </ValidationProvider>
            </v-col>

            <v-spacer></v-spacer>

            <v-col cols="12" md="6" lg="5">
              <div
                v-for="checkBoxField in checkBoxFields"
                :key="checkBoxField.label"
              >
                <v-checkbox
                  v-model="paymentProvider[checkBoxField.label]"
                  :label="checkBoxField.label"
                ></v-checkbox>
              </div>
            </v-col>
          </v-row>
          <v-btn
            class="mt-10"
            outlined
            color="primary"
            :loading="loading"
            :disabled="loaidng"
            @click="submit"
          >
            <span>Create Payment Provider</span>
          </v-btn>
        </v-card>
      </form>
    </ValidationObserver>
  </v-container>
</template>

<script lang="ts">
import { mapActions } from 'vuex'
import * as Resource from "../../api/Resource";
import { Component, Vue } from "vue-property-decorator";
import { TogglePayload } from "../../store/modules/app/state";

@Component({
  methods: {
    ...mapActions("app", ["toggleGlobalSnackBar"])
  }
})
export default class CreateUser extends Vue {
  email = "";
  loading = false;
  toggleGlobalSnackBar!: (payload: TogglePayload) => void;

  activePicker = null;
  dateOfBirthMenu = false;

  paymentProvider = {
    name: "",
    order: 0,
    iconUrl: "",
    identifier: "",
    activeForOneTime: true,
    shouldRewardPoints: true,
    classBindingKey: "string",
    activeForSubscription: true,
  };

  checkBoxFields = {
    activeForOneTime: {
      value: true,
      label: "activeForOneTime",
    },
    activeForSubscription: {
      value: true,
      label: "activeForSubscription",
    },
    shouldRewardPoints: {
      value: true,
      label: "shouldRewardPoints",
    }
  };

  goBack() {
    this.$router.back();
  }

  save() {
    this.dateOfBirthMenu = false;
  }

  submit() {
    this.loading = true;

    (
      this.$refs.loginObserver as Vue & {
        validate: () => any;
      }
    )
      .validate()
      .then(async (isValid: boolean) => {
        if (isValid) {
          try {
            if(this.paymentProvider) {
              // @ts-ignore
              const res = await Resource.paymentProviders.createPaymentProvider().pipe(this.paymentProvider);
              this.loading = false;
              this.toggleGlobalSnackBar({
                show: true,
                type: "success",
                text: "Payment Provider created successfully!",
              });
              this.goBack();
            }
          } catch (e) {
            this.loading = false;
            console.log(e);
            this.toggleGlobalSnackBar({
              show: true,
              type: "error",
              text: "Error occured please try again!",
            });
          }
        } else {
          this.loading = false;
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