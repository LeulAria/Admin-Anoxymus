<template>
  <v-app>
    <router-view></router-view>

    <v-snackbar
      v-model="globalSnackBar.show"
      :color="globalSnackBar.type"
      right
    >
      {{ globalSnackBar.text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          text
          icon
          color="white"
          v-bind="attrs"
          @click="toggleGlobalSnackBar(false)"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex'
import { Vue, Component } from "vue-property-decorator";

@Component({
  computed: {
    ...mapGetters("app", ["globalSnackBar"]),
  },
  methods: {
    ...mapActions("app", ["toggleGlobalSnackBar"])
  }
})
export default class App extends Vue {
  globalSnackBar!: any;
  toggleGlobalSnackBar!: (payload: boolean) => void;
}
</script>

<style>
</style>