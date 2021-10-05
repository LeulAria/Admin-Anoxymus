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
          <v-icon class="display-3 gray--text">mdi-account</v-icon>
        </v-avatar>
        <h4>Update user detail</h4>
      </div>
    </div>

    <ValidationObserver ref="loginObserver">
      <form>
        <v-card max-width="800" elevation="0" class="mx-auto">
          <v-row spacing="10">
            <v-col cols="12" md="6" sm="4">
              <ValidationProvider
                v-slot="{errors}"
                name="displayName"
                rules="required|min:2"
              >
                <v-text-field
                  v-model="userCred.displayName"
                  :error-messages="errors"
                  prepend-icon="mdi-account-outline"
                  hint="User Display Name"
                  label="DisplayName"
                  required
                ></v-text-field>
              </ValidationProvider>
              <ValidationProvider
                v-slot="{errors}"
                name="phone"
                rules="required|min:2"
              >
                <v-text-field
                  v-model="userCred.phone"
                  :error-messages="errors"
                  prepend-icon="mdi-account-outline"
                  hint="phone"
                  label="Phone"
                  required
                ></v-text-field>
              </ValidationProvider>
              <ValidationProvider
                v-slot="{errors}"
                name="email"
                rules="required|min:2"
              >
                <v-text-field
                  v-model="userCred.email"
                  :error-messages="errors"
                  prepend-icon="mdi-account-outline"
                  hint="Email"
                  label="Email"
                  required
                ></v-text-field>
              </ValidationProvider>
              <ValidationProvider
                v-slot="{errors}"
                name="profilePhotoUrl"
                rules="required|min:2"
              >
                <v-text-field
                  v-model="userCred.profilePhotoUrl"
                  :error-messages="errors"
                  prepend-icon="mdi-account-outline"
                  hint="Profile PhotoUrl"
                  label="Profile PhotoUrl"
                  required
                ></v-text-field>
              </ValidationProvider>
              <ValidationProvider
                v-slot="{errors}"
                name="role"
                rules="required|min:2"
              >
                <v-select
                  v-model="userCred.role"
                  :items="roleSelectItems"
                  :error-messages="errors"
                  hint="role"
                  label="User Role"
                  menu-props="auto"
                  hide-details
                  prepend-icon="mdi-map"
                  single-line
                ></v-select>
              </ValidationProvider>
              <br />
              <v-menu
                ref="menu"
                v-model="dateOfBirthMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{on, attrs}">
                  <ValidationProvider
                    v-slot="{errors}"
                    name="profilePhotoUrl"
                    rules="required|min:2"
                  >
                    <v-text-field
                      v-model="userCred.birthDate"
                      label="Date Of Birth"
                      :error-messages="errors"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </ValidationProvider>
                </template>
                <v-date-picker
                  v-model="userCred.birthDate"
                  :active-picker.sync="activePicker"
                  :max="
                    new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                      .toISOString()
                      .substr(0, 10)
                  "
                  min="1950-01-01"
                  @change="save"
                ></v-date-picker>
              </v-menu>

              <div
                v-for="checkBoxField1 in checkBoxFields1"
                :key="checkBoxField1.label"
              >
                <v-checkbox
                  v-model="userCred[checkBoxField1.label]"
                  :label="checkBoxField1.label"
                ></v-checkbox>
              </div>
            </v-col>

            <v-col cols="12" md="6" sm="4">
              <div
                v-for="checkBoxField2 in checkBoxFields2"
                :key="checkBoxField2.label"
              >
                <v-checkbox
                  v-model="userCred[checkBoxField2.label]"
                  :label="checkBoxField2.label"
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
            <span>Update User</span>
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
import {Instance} from "../../api/config/Users";

@Component({
  methods: {
    ...mapActions("app", ["toggleGlobalSnackBar"]),
  },
})
export default class CreateUser extends Vue {
  @Prop() payload!: Instance;
  email = "";
  loading = false;
  toggleGlobalSnackBar!: (payload: TogglePayload) => void;
  updatedItem: any = {};

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
    ...this.$route.params.payload,
  };
  checkBoxFields1 = {};
  checkBoxFields2 = {};
  roleSelectItems = ["user", "admin"];

  created() {
    this.updatedItem = this.$route.params?.payload || {};
    this.checkBoxFields1 = {
      isBanned: {
        value: this.updatedItem?.isBanned,
        label: "isBanned",
      },
      isInvited: {
        value: this.updatedItem?.isInvited,
        label: "isInvited",
      },
    };

    this.checkBoxFields2 = {
      emailVerified: {
        value: this.updatedItem?.emailVerified,
        label: "emailVerified",
      },
      enableDiscountsSms: {
        value: this.$route.params?.enableDiscountsSms,
        label: "enableDiscountsSms",
      },
      enableRemindersSms: {
        value: this.$route.params?.enableRemindersSms,
        label: "enableRemindersSms",
      },
      enablePromotionsSms: {
        value: this.updatedItem?.enablePromotionsSms,
        label: "enablePromotionsSms",
      },
      enableDiscountsEmail: {
        value: this.updatedItem?.enableDiscountsEmail,
        label: "enableDiscountsEmail",
      },
      enableRemindersEmail: {
        value: this.updatedItem?.enableRemindersEmail,
        label: "enableRemindersEmail",
      },
      enablePromotionsEmail: {
        value: this.updatedItem?.enablePromotionsEmail,
        label: "enablePromotionsEmail",
      },
      enableNewsAndUpdateSms: {
        value: this.updatedItem?.enableNewsAndUpdateSms,
        label: "enableNewsAndUpdateSms",
      },
      enableNewsAndUpdateEmail: {
        value: this.updatedItem?.enableNewsAndUpdateEmail,
        label: "enableNewsAndUpdateEmail",
      },
    };
  }

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
            if (this.userCred) {
              const payload: any = this.$route.params.payload; 
              // @ts-ignore
              const user = await Resource.users
                .updateUser(payload?.id || "")
                .pipe(this.userCred);
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