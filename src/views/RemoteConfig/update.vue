<template>
  <v-container>
    <div class="d-flex align-start justify-center">
      <div class="mr-auto">
        <v-btn icon @click="goBack">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </div>
      <div class="d-flex flex-column align-center justify-center mb-10 mr-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="85"
          height="85"
          fill="currentColor"
          class="bi bi-gear-fill mb-4"
          viewBox="0 0 16 16"
        >
          <path
            d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"
          />
        </svg>
        <h4>Update Remote Config</h4>
      </div>
    </div>

    <ValidationObserver ref="loginObserver">
      <form>
        <v-card max-width="800" elevation="0" class="mx-auto">
          <v-row spacing="10">
            <v-col cols="12" md="6" sm="4">
              <ValidationProvider
                v-slot="{errors}"
                name="key"
                rules="required|min:2"
              >
                <v-text-field
                  v-model="paymentProvider.key"
                  :error-messages="errors"
                  prepend-icon="mdi-payment"
                  hint="User Display Key"
                  label="Remote Config Key Should Be CamelCase"
                  required
                ></v-text-field>
              </ValidationProvider>
              <ValidationProvider v-slot="{errors}" name="identifier" rules="min:2">
                <v-text-field
                  v-model="paymentProvider.description"
                  :error-messages="errors"
                  prepend-icon="mdi-account-outline"
                  hint="Description"
                  label="Remote Config Description Text"
                  required
                ></v-text-field>
              </ValidationProvider>
            </v-col>

            <v-col>
              <v-checkbox
                v-model="paymentProvider.value"
                :label="`Value - ${paymentProvider.value ? 'True' : 'False'}`"
              ></v-checkbox>
              <v-checkbox
                v-model="paymentProvider.canDelete"
                label="Can Delete"
              ></v-checkbox>
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
            <span>Update Remote Config</span>
          </v-btn>
        </v-card>
      </form>
    </ValidationObserver>
  </v-container>
</template>

<script lang="ts">
import {Component, Vue, Prop} from "vue-property-decorator";
import * as Resource from "../../api/Resource";
import {mapActions} from "vuex";
import {TogglePayload} from "../../store/modules/app/state";

@Component({
  methods: {
    ...mapActions("app", ["toggleGlobalSnackBar"]),
  },
})
export default class CreateUser extends Vue {
  updateItem: any = {};
  email = "";
  loading = false;
  toggleGlobalSnackBar!: (payload: TogglePayload) => void;
  checkBoxFields: any = {};

  created() {
    this.updateItem = this.$route.params.payload;
  }

  activePicker = null;
  dateOfBirthMenu = false;

  paymentProvider = {
    key: "",
    description: "",
    canDelete: true,
    // @ts-ignore
    ...this.$route.params.payload,
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
            if (this.paymentProvider) {
              const update: any = this.$route.params.payload; 
              // @ts-ignore
              const remoteConfig = await Resource.remoteConfig.updateRemoteConfig(update?.id || "")
                .pipe(this.paymentProvider);
              this.loading = false;
              this.toggleGlobalSnackBar({
                show: true,
                type: "success",
                text: "Remote Config updated successfully!",
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