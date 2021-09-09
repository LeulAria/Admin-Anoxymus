<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Resource } from "./api/Resource";

@Component({})
export default class App extends Vue {
  created() {
    this.fetchData();
  }

  async fetchData() {
    try {
      const res = await Resource.todo.todo().get();
      console.log("RESPONSE: ", res);
    } catch (error) {
      console.log(error);
    }
  }
}
</script>

<style>
</style>