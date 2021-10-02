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
          class="bi bi-cash-coin"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"
          />
          <path
            d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z"
          />
          <path
            d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z"
          />
          <path
            d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z"
          />
        </svg>
        <h4>Transaction</h4>
      </div>
    </div>

    <div>
      <v-card class="d-flex flex-column py-8 px-10">
        <div class="mx-auto mb-5 font-weight-black">
          +{{ transaction.destinationNumber }}
        </div>
        <div class="mx-auto max-width-500 d-flex justify-space-between mb-10">
          <div class="mx-3">
            <b>Type:</b> {{ transaction.type | replaceAll("_", " ") }}
          </div>
          <div class="mx-3">
            <b>Created At:</b> {{ transaction.createdAt | dayjsDate }}
          </div>
        </div>

        <v-row spacing="5" style="min-width: 100%">
          <v-col cols="12" xs="12" md="6">
            <div style="font-weight: 800; font-size: 1.1rem; margin-bottom: 1rem">
              Payment Info
            </div>
            <div>
              <p>
                <b>amount</b>
                <span class="ml-3">{{ transaction.paymentInfo.amount }}</span>
              </p>
              <p>
                <b>currency</b>
                <span class="ml-3">{{ transaction.paymentInfo.currency }}</span>
              </p>
              <p>
                <b>status</b>
                <span class="ml-3">{{ transaction.paymentInfo.status }}</span>
              </p>
            </div>
          </v-col>
          <v-col cols="12" xs="12" md="6">
            <div style="font-weight: 800; font-size: 1.1rem; margin-bottom: 1rem">
              Dtone Transaction Info
            </div>
            <div>
              <p>
                <b>amount: </b>
                <span class="ml-3">{{
                  transaction.dtoneTransactionInfo.amount
                }}</span>
              </p>
              <p>
                <b>price: </b>
                <span class="ml-3">{{
                  transaction.dtoneTransactionInfo.price
                }}</span>
              </p>
              <p></p>
              <p>
                <b>status: </b>
                <span class="ml-3">{{
                  transaction.dtoneTransactionInfo.status
                }}</span>
              </p>
            </div>
          </v-col>
        </v-row>
        <div class="mt-3">
          <v-btn
            dark
            :elevation="0"
            color="indigo"
            :loading="performTransactionLoading"
            @click="performTransaction"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="mr-3"
              viewBox="0 0 16 16"
            >
              <path
                d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"
              />
              <path
                d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"
              />
            </svg>
            Perform Transaction
          </v-btn>
        </div>
      </v-card>
    </div>
  </v-container>
</template>

<script lang="ts">
import {Component, Vue, Prop} from "vue-property-decorator";
import * as Resource from "../../api/Resource";
import {mapActions} from "vuex";
import {TogglePayload} from "../../store/modules/app/state";
import {Topup} from "../../api/config/Transactions";

@Component({
  methods: {
    ...mapActions("app", ["toggleGlobalSnackBar"]),
  },
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
    ...this.transaction,
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
  performTransactionLoading = false;

  transaction: any = {};

  mounted() {
    this.transaction = this.$route?.params?.payload;
  }

  goBack() {
    this.$router.back();
  }

  save() {
    this.dateOfBirthMenu = false;
  }

  async performTransaction() {
    this.performTransactionLoading = true;
    const id = this.transaction.id || "";

    try {
      const res = await Resource.transactions.performTransaction(id).pipe();
      console.log(res);
      this.performTransactionLoading = false;
      this.toggleGlobalSnackBar({
        show: true,
        type: "success",
        text: "Trasction performed successfully!",
      });
    } catch (e) {
      console.log("ERROR PERFORMING PAYMENT TRANSACTION: ", e);
      this.performTransactionLoading = false;
      this.toggleGlobalSnackBar({
        show: true,
        type: "error",
        text: "There is no successful payment for this topup",
      });
    }
  }
}
</script>

<style>
</style>