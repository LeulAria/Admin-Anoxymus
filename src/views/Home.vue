<template>
  <v-app
    id="inspire"
  >
    <v-navigation-drawer
      app
      dark
      v-model="drawer"
      color="#222"
      src="https://picsum.photos/1920/1080?random"
    >
      <div class="py-3 px-5">
        <v-avatar class="mb-1" color="grey darken-4" size="64"></v-avatar>
        <div style="color: #FFF">john@vuetifyjs.com</div>
      </div>

      <v-divider></v-divider>

      <v-list>
        <v-list-item v-for="[icon, text, route] in links" :key="icon" link :to="route">
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar 
      color="#222"
      dark
      flat
      app
    >
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
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            large
            text
            outlined
            class="px-2 ml-3 d-none d-md-inline"
          >
            <v-avatar
              color="primary"
              size="30"
            >
              <img
                src="https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light" />
            </v-avatar>
            <span class="pl-3 d-none d-md-inline">{Username}</span>
          </v-btn>
        </template>
        <v-list>
          <v-list-item link>
            <v-list-item-title>
              View profile
            </v-list-item-title>
          </v-list-item>
          <v-list-item link @click="logout">
            <v-list-item-title>
              Logout
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { mapActions } from 'vuex';

@Component({
  methods: {
    ...mapActions(["logOut"])
  }
})
export default class Home extends Vue {
  cards = ["Today", "Yesterday"];
  drawer = null;
  links = [
    ["mdi-view-dashboard", "Dashboard", "/dashboard"],
    ["mdi-inbox-arrow-down", "Users", "/users"],
  ];
  logOut!: () => void;

  logout() {
    this.logOut();
    setTimeout(() => {
      window.location.reload();
      this.$router.push({ name: "Login" });
    }, 1000);
  }
}
</script>
