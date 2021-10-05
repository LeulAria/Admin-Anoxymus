<template>
  <v-app id="app">
    <v-navigation-drawer
      app
      dark
      v-model="drawer"
      color="#343A40"
      class="nav-drawer"
    >
      <div class="px-5">
        <h3 style="color: #fff; text-align: center; margin: 1.2rem 0">
          Remit Dashboard
        </h3>
      </div>

      <v-divider></v-divider>

      <v-list class="mt-6">
        <v-tooltip bottom v-for="[icon, text, route] in links" :key="icon">
          <template v-slot:activator="{on, attrs}">
            <v-list-item v-bind="attrs" v-on="on" class="route-nav-links" link :to="route">
              <v-list-item-icon>
                <v-icon>{{ icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <span>{{ text }}</span>
        </v-tooltip>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app flat color="#FEFEFE">
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="hidden-lg-and-up"
      ></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-menu offset-y>
        <template v-slot:activator="{on, attrs}">
          <v-btn
            v-bind="attrs"
            v-on="on"
            large
            text
            outlined
            rounded
            class="px-2 ml-3 d-none d-md-inline"
          >
            <v-avatar color="primary" size="30">
              <img
                src="https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
              />
            </v-avatar>
            <span class="pl-3 d-none d-md-inline">{{
              userInfo.instance.displayName || ""
            }}</span>
          </v-btn>
        </template>
        <v-list rounded>
          <v-list-item link>
            <v-list-item-title> View profile </v-list-item-title>
          </v-list-item>
          <v-list-item link @click="logout">
            <v-list-item-title> Logout </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <v-container claass="mx-5">
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import {User} from "@/api/config/Users";
import {Vue, Component} from "vue-property-decorator";
import {mapActions, mapGetters} from "vuex";

@Component({
  computed: {
    ...mapGetters("user", ["isLoggedIn", "userInfo"]),
  },
  methods: {
    ...mapActions(["logOut"]),
  },
})
export default class Home extends Vue {
  isLoggedIn!: boolean;
  userInfo!: User;
  cards = ["Today", "Yesterday"];
  drawer = null;
  links = [
    ["mdi-view-dashboard", "Dashboard", "/dashboard"],
    ["mdi-account-circle", "Users", "/users"],
    ["mdi-dns", "Transactions", "/transactions"],
    ["mdi-credit-card", "Payment Provider", "/payment-provider"],
    ["mdi-calendar-month", "Subscription Plans", "/subscription-plan"],
    ["mdi-adjust", "Points", "/points"],
    ["mdi-ticket-confirmation", "Invitations", "/invitations"],
    ["mdi-library", "Remote Configs", "/remote-config"],
  ];
  logOut!: () => void;

  created() {
    if (this.isLoggedIn) {
      this.$router.push({name: "Dashboard"});
    }
  }

  logout() {
    this.logOut();
    setTimeout(() => {
      window.location.reload();
      this.$router.push({name: "Login"});
    }, 1000);
  }
}
</script>


<style>
.nav-drawer {
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
}
.route-nav-links {
  width: 86%;
  height: 30px;
  margin: 0.4rem auto;
  display: flex;
  align-items: center;
  border-radius: 10px !important;
}
.v-list-item--active {
  overflow: hidden;
  background: #007bff;
  border-radius: 10px !important;
}
</style>