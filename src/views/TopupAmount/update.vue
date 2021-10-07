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
          class="bi bi-archive"
          viewBox="0 0 16 16"
        >
          <path
            d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"
          />
        </svg>
        <h4 class="mt-5">Update Topup Amount</h4>
      </div>
    </div>

    <ValidationObserver ref="loginObserver">
      <form>
        <v-card max-width="800" elevation="0" class="mx-auto">
          <v-row spacing="5">
            <v-col cols="12" md="6" sm="4">
              <ValidationProvider
                v-slot="{errors}"
                name="key"
                rules="required|min:2"
              >
                <v-text-field
                  v-model="topupAmount.currency"
                  :error-messages="errors"
                  prepend-icon="mdi-payment"
                  hint="Topup Amount Currency"
                  label="Topup Amount Currency Name"
                  required
                ></v-text-field>
              </ValidationProvider>

              <ValidationProvider v-slot="{errors}" name="identifier" rules="min:2">
                <v-text-field
                  v-model="topupAmount.imageUrl"
                  :error-messages="errors"
                  prepend-icon="mdi-payment"
                  hint="Topup Amount Image URL"
                  label="String Image url for topup amount."
                  required
                ></v-text-field>
              </ValidationProvider>


              <ValidationProvider
                v-slot="{errors}"
                name="key"
                rules="required"
              >
                <v-text-field
                  v-model="topupAmount.amount"
                  :error-messages="errors"
                  prepend-icon="mdi-payment"
                  hint="Topup Amount Price"
                  label="Topup Amount Value"
                  required
                ></v-text-field>
              </ValidationProvider>

              <ValidationProvider
                v-slot="{errors}"
                name="key"
                rules="required"
              >
                <v-text-field
                  v-model="topupAmount.price"
                  :error-messages="errors"
                  prepend-icon="mdi-payment"
                  hint="Topup Amount Price"
                  label="Topup Amount Price Value"
                  required
                ></v-text-field>
              </ValidationProvider>

            </v-col>
            <v-col>

              <ValidationProvider
                v-slot="{errors}"
                name="key"
                rules="required"
              >
                <v-text-field
                  v-model="topupAmount.buyRewardPoint"
                  :error-messages="errors"
                  prepend-icon="mdi-payment"
                  hint="Topup Amount Buy Reward Point"
                  label="Topup Amount Buy Reward Point Value"
                  required
                ></v-text-field>
              </ValidationProvider>

              <ValidationProvider
                v-slot="{errors}"
                name="key"
                rules="required"
              >
                <v-text-field
                  v-model="topupAmount.inviteRewardPoint"
                  :error-messages="errors"
                  prepend-icon="mdi-payment"
                  hint="Topup Amount Invite Reward Point"
                  label="Topup Amount Invite Reward Point Value"
                  required
                ></v-text-field>
              </ValidationProvider>
              <div class="ml-8">
                <v-checkbox
                  v-model="topupAmount.active"
                  label="Is Active"
                ></v-checkbox>
                <v-checkbox
                  v-model="topupAmount.isHotPackage"
                  label="Is Hot Package"
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
            <span>Update Topup Amount</span>
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

  topupAmount = {
    currency: "",
    imageUrl: "",
    amount: 0,
    price: 0,
    buyRewardPoint: 0,
    inviteRewardPoint: 0,
    active: true,
    isHotPackage: true,
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
            if (this.topupAmount) {
              const update: any = this.$route.params.payload; 
              // @ts-ignore
              const remoteConfig = await Resource.topupAmount.updateTopupAmount(update?.id || "")
                .pipe({
                  ...this.topupAmount,
                  amount: +this.topupAmount.amount,
                  price: +this.topupAmount.price,
                  buyRewardPoint: +this.topupAmount.buyRewardPoint,
                  inviteRewardPoint: +this.topupAmount.inviteRewardPoint,
                  operationId: "" 
                });
              this.loading = false;
              this.toggleGlobalSnackBar({
                show: true,
                type: "success",
                text: "Topup Amount updated successfully!",
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