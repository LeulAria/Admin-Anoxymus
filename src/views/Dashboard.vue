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
            sm="6"
            xs="12"
            cols="6"
            :key="dashboardCardStat.title"
            v-for="dashboardCardStat in dashboardCardStats"
          >
            <v-card
              class="white--text px-5 pt-4 rounded-lg min-heihgt"
              outlined
              tile
              :style="`background: ${dashboardCardStat.color}`"
            >
              <div class="d-flex justify-space-between">
                <div>
                  <h1>{{ dashboardCardStat.value }}</h1>
                  <p>{{ dashboardCardStat.title }}</p>
                </div>

                <v-icon dark class="display-2">mdi-account-multiple</v-icon>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <dashboard-stata1
          title="Latest Transactions"
        />
      </v-col>
    </v-row>
    <v-row no-gutter justify="space-between">
      <v-col
        cols="12"
        sm="12"
        md="12"
        lg="6"
      >
        <dashboard-recent
          title="Users"
        />
      </v-col>
      <v-col
        cols="12"
        sm="12"
        md="6"
        lg="3"
      >
        <dashboard-recent
          title="Items"
        />
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
import * as Resource from '@/api/Resource'


@Component({
  components: {
    'dashboard-stata1': DashboardStat1,
    'dashboard-recent': DashboardRecent,
  },
})
export default class Dashboard extends Vue {
  dashboardCardStats = [
    {
      title: 'users',
      color: "#3F6791",
      icon: 'mdi-account-multiple',
      value: 0
    },
    {
      title: 'topups',
      color: "#45BB77",
      icon: 'mdi-account-multiple',
      value: 0
    },
    {
      title: 'topup amounts',
      color: "#BB9988",
      icon: 'mdi-account-multiple',
      value: 0
    },
    {
      title: 'points',
      color: "#445544",
      icon: 'mdi-account-multiple',
      value: 0
    }
  ];

  async created() {
    const userCount = await Resource.users.getUsersCount().get();
    const topupCount = await Resource.transactions.getTransactionCounts().get();
    const topupAmountCount = await Resource.transactions.getTopupAmountsCounts().get();
    const pointsCount = await Resource.points.getPointsCount().get();

    this.dashboardCardStats = [
    {
      title: 'users',
      color: "#3F6791",
      icon: 'mdi-account-multiple',
      value: userCount?.data?.count
    },
    {
      title: 'topups',
      color: "#45BB77",
      icon: 'mdi-account-multiple',
      value: topupCount?.data?.count
    },
    {
      title: 'topup amounts',
      color: "#BB9988",
      icon: 'mdi-account-multiple',
      value: topupAmountCount?.data?.count
    },
    {
      title: 'points',
      color: "#445544",
      icon: 'mdi-account-multiple',
      value: pointsCount?.data?.count
    }
  ]
  }
}
</script>

<style>

</style>