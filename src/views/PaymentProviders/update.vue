<template>
  <v-container>
    <div class="d-flex align-start justify-center">
      <div class="mr-auto">
        <v-btn icon @click="goBack">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </div>
      <div class="d-flex flex-column align-center justify-center mb-10 mr-auto">
        <svg xmlns="http://www.w3.org/2000/svg" width="85" height="85" fill="currentColor" class="bi bi-credit-card" viewBox="0 0 16 16">
          <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z"/>
          <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z"/>
        </svg>
        <h4>Update payment providers</h4>
      </div>
    </div>

    <ValidationObserver ref="loginObserver">
      <form>
        <v-card max-width="800" elevation="0" class="mx-auto">
          <v-row spacing="10">
            <v-col cols="12" md="6" sm="4">
              <ValidationProvider
                v-slot="{ errors }"
                name="name"
                rules="required|min:2"
              >
                <v-text-field
                  v-model="paymentProvider.name"
                  :error-messages="errors"
                  prepend-icon="mdi-payment"
                  hint="User Display Name"
                  label="Payment Provider Name"
                  required
                ></v-text-field>
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ errors }"
                name="iconUrl"
                rules="required|min:2"
              >
                <v-text-field
                  v-model="paymentProvider.iconUrl"
                  :error-messages="errors"
                  prepend-icon="mdi-account-outline"
                  hint="Payment Provider Icon Url"
                  label="Payment Provider Icon Url"
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
                  label="Payment Provider Identifier"
                  required
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col>
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
            <span>Update Payment Provider</span>
          </v-btn>
        </v-card>
      </form>
    </ValidationObserver>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import * as Resource from "../../api/Resource";
import { mapActions } from 'vuex'
import { TogglePayload } from "../../store/modules/app/state";
import { Instance } from "../../api/config/Users";

@Component({
  methods: {
    ...mapActions("app", ["toggleGlobalSnackBar"])
  }
})
export default class CreateUser extends Vue {
  updateItem: any = {};
  email = "";
  loading = false;
  toggleGlobalSnackBar!: (payload: TogglePayload) => void;
  checkBoxFields: any = {};

  created() {
    this.updateItem = this.$route.params.payload;
    this.checkBoxFields = {
      activeForOneTime: {
        value: this.updateItem.activeForOneTime,
        label: "activeForOneTime",
      },
      activeForSubscription: {
        value: this.updateItem.activeForSubscription,
        label: "activeForSubscription",
      },
      shouldRewardPoints: {
        value: this.updateItem.shouldRewardPoints,
        label: "shouldRewardPoints",
      },
    }
  }

  activePicker = null;
  dateOfBirthMenu = false;

  paymentProvider = {
    name: "",
    iconUrl: "",
    identifier: "",
    activeForOneTime: true,
    shouldRewardPoints: true,
    activeForSubscription: true,
    // @ts-ignore
    ...this.$route.params.payload
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
              const user = await Resource.paymentProviders.updatePaymentProvider(this.$route.params.payload.id).pipe(this.paymentProvider);
              this.loading = false;
              this.toggleGlobalSnackBar({
                show: true,
                type: "success",
                text: "Payment Provider updated successfully!",
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