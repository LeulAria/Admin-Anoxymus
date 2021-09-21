<template>
  <v-card elevation="0">
    <v-card-title>
      Users
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
          <router-link
            class="link"
            :to="{ name: 'Create-User', params: { userId: 123 } }"
          >
            <v-btn color="primary" outlined elevation="0">
              <v-icon class="mr-1">mdi-plus</v-icon>
              Add User
            </v-btn>
          </router-link>
          <div class="ml-3">
            <v-btn color="primary" icon elevation="0" @click="fetchUsers">
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
      <template v-slot:item.profilePhotoUrl="{ item }">
        <div style="margin: 10px">
          <v-avatar size="45" style="border-radius: 5px" color="primary">
            <img
              v-if="item.profilePhotoUrl"
              :src="item.profilePhotoUrl"
              :alt="item.profilePhotoUrl"
            />
            <v-icon v-else dark> mdi-account-circle </v-icon>
          </v-avatar>
        </div>
      </template>
      <template v-slot:item.emailVerified="{ item }">
        <v-chip :color="getBoolenColor(item.emailVerified)" dark>
          {{ item.emailVerified ? "Verified" : "Not Verified" }}
        </v-chip>
      </template>
      <template v-slot:item.isBanned="{ item }">
        <v-chip :color="getBoolenColor(!item.emailVerified)" dark>
          {{ item.emailVerified ? "Bannded" : "Active" }}
        </v-chip>
      </template>
      <template v-slot:item.role="{ item }">
        <b>{{ item.role.toUpperCase() }}</b>
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
import { Vue, Component } from "vue-property-decorator";
import { Instance, User } from "../../api/config/Users";
import * as Resource from "../../api/Resource";
import { TogglePayload } from '../../store/modules/app/state'
import { mapActions } from 'vuex'

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
  itemToDelete: Instance | null = null;
  toggleGlobalSnackBar!: (payload: TogglePayload) => void;
  headers = [
    {
      text: "Profile Photo",
      value: "profilePhotoUrl",
      align: "start",
      sortable: false,
    },
    { text: "Display Name", value: "displayName" },
    { text: "Email", value: "email" },
    { text: "Email Verified", value: "emailVerified", sortable: false },
    { text: "Phone", value: "phone" },
    { text: "Telegram Name", value: "telegramName" },
    { text: "Role", value: "role" },
    { text: "Is Banned", value: "isBanned" },
    { text: "Updated At", value: "modifiedAt" },
    { text: "Actions", value: "actions", sortable: false },
  ];
  users: User[] = [];

  async fetchUsers() {
    this.loadingUses = true;
    const res = await Resource.users.getUsers().get();
    this.users = res?.data || [];
    this.loadingUses = false;
  }

  getBoolenColor(isVerified: boolean) {
    return isVerified ? "green" : "red";
  }

  created() {
    this.fetchUsers();
  }

  setItemToDelete(item: Instance) {
    this.itemToDelete = item;
    this.deleteConfirmationDialog = true;
  }

  updateUser(item: Instance) {
    this.$router.push({
      name: `Update User`,
      params: {
        id: item.email,
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
        const res = await Resource.users.deleteUser(this.itemToDelete.id || "").pipe();
        this.toggleGlobalSnackBar({
          show: true,
          type: "error",
          text: "User deleted successfully!",
        });
        this.deletingItemPending = false;
        this.fetchUsers();
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