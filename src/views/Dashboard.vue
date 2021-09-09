<template>
  <v-container class="gray lighten-5">
    <v-row spacing="5">
      <v-col
        :key="n"
        cols="12"
        md="6"
      >
        <v-row spacing="5">
          <v-col
            v-for="n in 4"
            :key="n"
            cols="6"
            xs="12"
            sm="6"
          >
            <v-card
              class="px-5 pt-4 rounded-lg min-heihgt"
              outlined
              tile
            >
              <div class="d-flex justify-space-between">
                <div>
                  <h1>{{ Math.floor(Math.random() * 100) }}</h1>
                  <p>Users</p>
                </div>

                <v-icon class="display-2">mdi-account-multiple</v-icon>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <dashboard-stata1 />
      </v-col>
    </v-row>
    <v-row no-gutter justify="space-between">
      <v-col
        cols="12"
        sm="12"
        md="12"
        lg="6"
      >
        <dashboard-recent />
      </v-col>
      <v-col
        cols="12"
        sm="12"
        md="6"
        lg="3"
      >
        <dashboard-recent />
      </v-col>
      <v-col
        cols="12"
        sm="12"
        md="6"
        lg="3"
      >
        <dashboard-recent />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DashboardStat1 from '../components/dashboard/DashboardStat1.vue'
import DashboardRecent from '../components/dashboard/DashboardRecent.vue'


@Component({
  components: {
    'dashboard-stata1': DashboardStat1,
    'dashboard-recent': DashboardRecent,
  },
})
export default class Dashboard extends Vue {

}
</script>

<style>

</style>