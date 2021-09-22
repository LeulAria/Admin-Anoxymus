<template>
  <v-card elevation="0">
    <v-card-title>
      Transactions
      <v-spacer></v-spacer>
      <div class="top-search-bar">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <div class="d-flex ml-5">
          <div class="ml-3">
            <v-btn color="primary" icon elevation="0" @click="fetchTopups">
              <v-icon>mdi-reload</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
    </v-card-title>
    <v-data-table
      :loading="loadingUses"
      :headers="headers"
      :items="users"
      :search="search"
    >
      <template v-slot:item.destinationNumber="{ item }">
        <b>+{{ item.destinationNumber }}</b>
      </template>
      <template v-slot:item.type="{ item }">
        <div>{{ item.type | replaceAll("_", " ") }}</div>
      </template>
      <template v-slot:item.status="{ item }">
        <v-chip :color="getBooleanColorTriple(item.paymentInfo.status==='PENDING' ? 0 : 1)" dark>
          {{ item.paymentInfo.status }}
        </v-chip>
      </template>
      <template v-slot:item.amount="{ item }">
        <b>{{ item.paymentInfo.currency }} {{ item.paymentInfo.amount }}</b>
      </template>
      <template v-slot:item.createdAt="{ item }">
        <div style="white-space: nowrap;">{{ item.createdAt | dayjsDate }}</div>
      </template>
      <template v-slot:item.actions="{ item }">
        <div class="d-flex">
          <v-icon medium class="mr-5" @click="updateUser(item)">
            mdi-pencil
          </v-icon>
          <v-icon
            medium
            class="mr-5"
            @click="setItemToDelete(item)"
          > 
            mdi-delete
          </v-icon>
        </div>
      </template>
    </v-data-table>

    <v-overlay style="z-index: 99999"  :value="deletingItemPending">
      <div class="d-flex flex-column align-center">
        <v-progress-circular
          indeterminate
          size="64"
        ></v-progress-circular>
        <p class="mt-5">Deleting Item</p>
      </div>
    </v-overlay>

    <v-row justify="center">
      <v-dialog
        v-model="deleteConfirmationDialog"
        max-width="300"
      >
        <v-card>
          <v-card-title class="text-h6 font-weight-black">
            Are you sure you want to delete?
          </v-card-title>

          <v-card-text style="text-align: center">
            <div>{{ itemToDelete && itemToDelete.displayName }}</div>
            <div>{{ itemToDelete && itemToDelete.email }}</div>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              color="green darken-1"
              text
              @click="deleteConfirmationDialog = false"
            >
              Cancel
            </v-btn>

            <v-btn
              color="red darken-1"
              text
              @click="deleteItem"
            >
              Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { mapActions } from 'vuex'
import * as Resource from "../../api/Resource";
import { Topup } from "../../api/config/Transactions";
import { Vue, Component } from "vue-property-decorator";
import { TogglePayload } from '../../store/modules/app/state'

@Component({
  methods: {
    ...mapActions("app", ["toggleGlobalSnackBar"])
  }
})
export default class Users extends Vue {
  search = "";
  loadingUses = false;
  deletingItemPending = false;
  deleteConfirmationDialog = false;
  itemToDelete: Topup | null = null;
  toggleGlobalSnackBar!: (payload: TogglePayload) => void;
  headers = [
    {
      text: "Destination Number",
      value: "destinationNumber",
      align: "start",
      sortable: false,
    },
    { text: "Type", value: "type" },
    { text: "Payment Status", value: "status" },
    { text: "Amount", value: "amount" },
    { text: "Created At", value: "createdAt" },
    { text: "Actions", value: "actions", sortable: false },
  ];
  users: Topup[] = [];

  async fetchTopups() {
    this.loadingUses = true;
    const res = await Resource.transactions.getAllTransactions().get();
    console.log(res?.data)
    this.users = res?.data || [];
    this.loadingUses = false;
  }

  getBoolenColor(isVerified: boolean) {
    return isVerified ? "green" : "red";
  }
  getBooleanColorTriple(value: number) {
    return value===0 ? "blue" : value===1 ? "green" : "red"
  }

  created() {
    this.fetchTopups();
  }

  setItemToDelete(item: Topup) {
    this.itemToDelete = item;
    this.deleteConfirmationDialog = true;
  }

  updateUser(item: Topup) {
    this.$router.push({
      name: `Update Transaction`,
      params: {
        id: item.id,
        // @ts-ignore
        payload: item
      }
    });
  }

  async deleteItem() {
    if(this.itemToDelete) {
      this.deleteConfirmationDialog = false;
      this.deletingItemPending = true;
      console.log(this.itemToDelete?.id)
      try {
        const res = await Resource.transactions.deleteTransaction(this.itemToDelete.id || "").pipe();
        this.toggleGlobalSnackBar({
          show: true,
          type: "error",
          text: "Transaction item deleted successfully!",
        });
        this.deletingItemPending = false;
        this.fetchTopups();
      } catch(e) {
        console.log(e)
        this.toggleGlobalSnackBar({
          show: true,
          type: "error",
          text:
            e.message || "Unknown error pccured please try again!",
        });
      }
    }
  }

}
</script>