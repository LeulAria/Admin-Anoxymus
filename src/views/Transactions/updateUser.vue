<template>
  <v-container>
    <div class="d-flex align-start justify-center">
      <div class="mr-auto">
        <v-btn icon @click="goBack">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </div>
      <div class="d-flex flex-column align-center justify-center mb-10 mr-auto">
        <v-avatar color="gray lighten-4" size="90">
          <v-icon class="display-3 gray--text">mdi-credit-card</v-icon>
        </v-avatar>
        <h4>Transaction</h4>
      </div>
    </div>

    <div>
      <v-card class="d-flex flex-column align-center py-8 px-4">
        <div class="mx-auto mb-5 font-weight-black">
          +{{ $route.params.payload.destinationNumber }}
        </div>
        <div class="d-flex justify-space-between mb-10">
          <div class="mx-3"><b>Type:</b> {{ $route.params.payload.type | replaceAll("_", " ") }}</div>
          <div class="mx-3"><b>Created At:</b> {{ $route.params.payload.createdAt | dayjsDate }}</div>
        </div>

        <v-row spacing="5" style="min-width: 100%">
          <v-col cols="12" xs="12" md="6">
            <div class="font-weight-bold text-center">Payment Info</div>
            <div>
              <p>amount</p>
              <p>currency</p>
              <p>status</p>
            </div>
          </v-col>
          <v-col cols="12" xs="12" md="6">
            <div class="font-weight-bold text-center">Dtone Transaction Info</div>
            <div>
              <p><b>amount: </b> {{ $route.params.payload.dtoneTransactionInfo.amount }}</p>
              <p><b>price: </b> {{ $route.params.payload.dtoneTransactionInfo.price }}</p>
              <p><b>status: </b> {{ $route.params.payload.dtoneTransactionInfo.status }}</p>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </div>

  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import * as Resource from "../../api/Resource";
import { mapActions } from 'vuex'
import { TogglePayload } from "../../store/modules/app/state";
import { Topup } from "../../api/config/Transactions";

@Component({
  methods: {
    ...mapActions("app", ["toggleGlobalSnackBar"])
  }
})
export default class CreateUser extends Vue {
  @Prop() payload!: Topup;
  email = "";
  loading = false;
  toggleGlobalSnackBar!: (payload: TogglePayload) => void;

  activePicker = null;
  dateOfBirthMenu = false;

  userCred = {
    displayName: "",
    phone: "",
    email: "",
    role: "",
    birthDate: null,
    profilePhotoUrl: "",
    isBanned: false,
    isInvited: false,
    emailVerified: false,
    enableDiscountsSms: true,
    enableRemindersSms: true,
    enablePromotionsSms: true,
    enableDiscountsEmail: true,
    enableRemindersEmail: true,
    enablePromotionsEmail: true,
    enableNewsAndUpdateSms: true,
    enableNewsAndUpdateEmail: true,
    // @ts-ignore
    ...this.$route.params.payload
  };

  checkBoxFields1 = {
    isBanned: {
      value: false,
      label: "isBanned",
    },
    isInvited: {
      value: false,
      label: "isInvited",
    },
  };

  checkBoxFields2 = {
    emailVerified: {
      value: false,
      label: "emailVerified",
    },
    enableDiscountsSms: {
      value: true,
      label: "enableDiscountsSms",
    },
    enableRemindersSms: {
      value: true,
      label: "enableRemindersSms",
    },
    enablePromotionsSms: {
      value: true,
      label: "enablePromotionsSms",
    },
    enableDiscountsEmail: {
      value: true,
      label: "enableDiscountsEmail",
    },
    enableRemindersEmail: {
      value: true,
      label: "enableRemindersEmail",
    },
    enablePromotionsEmail: {
      value: true,
      label: "enablePromotionsEmail",
    },
    enableNewsAndUpdateSms: {
      value: true,
      label: "enableNewsAndUpdateSms",
    },
    enableNewsAndUpdateEmail: {
      value: true,
      label: "enableNewsAndUpdateEmail",
    },
  };

  roleSelectItems = ["user", "admin"];

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
          console.log("FORM DATA: ", this.userCred);
          try {
            if(this.userCred) {
              // @ts-ignore
              const user = await Resource.users.updateUser(this.$route.params.payload.id).pipe(this.userCred);
              this.loading = false;
              this.toggleGlobalSnackBar({
                show: true,
                type: "success",
                text: "User updated successfully!",
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