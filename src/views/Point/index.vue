<template>
  <v-card elevation="0">
    <v-card-title>
      <h3 style="font-weight: 700">Points</h3>
      <v-spacer></v-spacer>
      <div class="top-search-bar">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <div class="ml-3">
          <v-tooltip bottom>
            <template v-slot:activator="{on, attrs}">
              <v-btn
                v-bind="attrs"
                v-on="on"
                color="primary"
                icon
                elevation="0"
                @click="fetchUsers"
              >
                <v-icon>mdi-reload</v-icon>
              </v-btn>
            </template>
            <span>Refresh Payment Provider</span>
          </v-tooltip>
        </div>
        <div class="d-flex">
          <!-- <v-tooltip bottom>
            <template v-slot:activator="{on, attrs}">
              <router-link
                class="link"
                :to="{name: 'Create Point', params: {userId: 123}}"
              >
                <v-btn v-bind="attrs" v-on="on" color="primary" text elevation="0">
                  <v-icon class="mr-1">mdi-plus</v-icon>
                  Add New
                </v-btn>
              </router-link>
            </template>
            <span>Add Payment Provider</span>
          </v-tooltip> -->
        </div>
      </div>
    </v-card-title>

    <v-data-table
      :loading="loadingUses"
      :headers="headers"
      :items="subscriptoinPlans"
      :search="search"
      style="border: 1px solid #ddd"
    >
      <template v-slot:item.iconUrl="{item}">
        <div style="margin: 10px">
          <v-avatar size="45" style="border-radius: 5px" color="primary">
            <img v-if="item.iconUrl" :src="item.iconUrl" :alt="item.name" />
            <v-icon v-else dark> mdi-account-circle </v-icon>
          </v-avatar>
        </div>
      </template>
      <template v-slot:item.name="{item}">
        <div style="white-space: nowrap; font-weight: 700">{{ item.name }}</div>
      </template>
      <template v-slot:item.active="{item}">
        <div
          :style="`color: ${getBoolenColor(
            item.activeForOneTime
          )}; font-weight: 600;`"
          dark
        >
          {{ item.activeForOneTime ? "Active" : "Not Active" }}
        </div>
      </template>
      <template v-slot:item.createdAt="{item}">
        <div style="white-space: nowrap">{{ item.createdAt | dayjsDate }}</div>
      </template>
      <template v-slot:item.actions="{item}">
        <div class="d-flex">
          <v-tooltip bottom>
            <template v-slot:activator="{on, attrs}">
              <v-icon
                v-bind="attrs"
                v-on="on"
                medium
                class="mr-5"
                @click="updateUser(item)"
              >
                mdi-pencil
              </v-icon>
            </template>
            <span>Edit Payment Provider</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{on, attrs}">
              <v-icon
                v-bind="attrs"
                v-on="on"
                medium
                class="mr-5"
                @click="setItemToDelete(item)"
              >
                mdi-delete
              </v-icon>
            </template>
            <span>Delete Payment Provider</span>
          </v-tooltip>
        </div>
      </template>
    </v-data-table>

    <v-overlay style="z-index: 99999" :value="deletingItemPending">
      <div class="d-flex flex-column align-center">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
        <p class="mt-5">Deleting Item</p>
      </div>
    </v-overlay>

    <v-row justify="center">
      <v-dialog v-model="deleteConfirmationDialog" max-width="300">
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

            <v-btn color="red darken-1" text @click="deleteItem"> Delete </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import {Vue, Component} from "vue-property-decorator";
import * as Resource from "../../api/Resource";
import {TogglePayload} from "../../store/modules/app/state";
import {mapActions} from "vuex";
import {Point} from "@/api/config/Transactions";

@Component({
  methods: {
    ...mapActions("app", ["toggleGlobalSnackBar"]),
  },
})
export default class Users extends Vue {
  search = "";
  loadingUses = false;
  deletingItemPending = false;
  deleteConfirmationDialog = false;
  itemToDelete: Point | null = null;
  toggleGlobalSnackBar!: (payload: TogglePayload) => void;
  headers = [
    {divider: true, text: "Name", value: "name"},
    {divider: true, text: "IntervalUnit", value: "intervalUnit"},
    {divider: true, text: "IntervalCount", value: "intervalCount"},
    {divider: true, text: "Active", value: "active"},
    {divider: true, text: "Created At", value: "createdAt"},
    {divider: true, text: "Actions", value: "actions", sortable: false},
  ];
  subscriptoinPlans: Point[] = [];

  async fetchUsers() {
    this.loadingUses = true;
    const res = await Resource.points.getPoints().get();
    this.subscriptoinPlans = res?.data || [];
    this.loadingUses = false;
  }

  getBoolenColor(isVerified: boolean) {
    return isVerified ? "green" : "red";
  }

  created() {
    this.fetchUsers();
  }

  setItemToDelete(item: Point) {
    this.itemToDelete = item;
    this.deleteConfirmationDialog = true;
  }

  updateUser(item: Point) {
    this.$router.push({
      name: `Update Point`,
      params: {
        // id: item.email,
        // @ts-ignore
        payload: item,
      },
    });
  }

  async deleteItem() {
    if (this.itemToDelete) {
      this.deleteConfirmationDialog = false;
      this.deletingItemPending = true;
      try {
        const res = await Resource.paymentProviders
          .deletePaymentProvider(this.itemToDelete.id || "")
          .pipe();
        this.toggleGlobalSnackBar({
          show: true,
          type: "error",
          text: "Point deleted successfully!",
        });
        this.deletingItemPending = false;
        this.fetchUsers();
      } catch (e) {
        console.log(e);
        this.toggleGlobalSnackBar({
          show: true,
          type: "error",
          text: e.message || "Unknown error pccured please try again!",
        });
      }
    }
  }
}
</script>