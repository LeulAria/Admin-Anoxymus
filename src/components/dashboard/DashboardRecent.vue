<template>
  <v-card class="mx-auto">
    <v-toolbar dark flat class="grey darken-4 white--text">
      <v-toolbar-title style="font-size: 1rem">{{ title }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        icon
        v-on="on"
        elevation="0"
        v-bind="attrs"
        @click="reloadAction"
      >
        <v-icon>mdi-reload</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>

    <div v-if="loading" class="d-flex align-center justify-center" style="min-height: 230px; width: 100%">
      <v-progress-circular indeterminate color="primary" :size="80"></v-progress-circular>
    </div>

    <div v-else>
      <v-list v-if="ui === 'users-list'">
        <v-list-item v-for="item in value" :key="item.title">
          <v-list-item-icon>
            <v-icon color="pink"> mdi-circle </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="item.name"></v-list-item-title>
          </v-list-item-content>

          <v-avatar size="35" color="primary">
            <img v-if="item.photo" :src="item.photo" :alt="item.name" />
            <v-icon v-else dark> mdi-account-circle </v-icon>
          </v-avatar>
        </v-list-item>
      </v-list>
      
      <v-list v-if="ui === 'transaction-list'">
        <v-list-item v-for="item in value" :key="item.title">
          <v-list-item-icon>
            <v-icon color="pink"> mdi-paymet </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="item.destinationNumber"></v-list-item-title>
            <v-list-item-title v-text="`Amount: ${item.paymentInfo.amount}-${item.paymentInfo.currency}`"></v-list-item-title>
               <!-- item?.paymentInfo?.status -->
          </v-list-item-content>

          <v-avatar size="35" color="primary">
            <img v-if="item.photo" :src="item.photo" :alt="item.name" />
            <v-icon v-else dark> mdi-account-circle </v-icon>
          </v-avatar>
        </v-list-item>
      </v-list>
    </div>
  </v-card>
</template>

<script lang="ts">
import {Vue, Component, Prop, Emit} from "vue-property-decorator";

@Component({})
export default class DashboardRecent extends Vue {
  @Prop({default: ""})
  title!: string;

  @Prop({default: []})
  value!: any[];

  @Prop({default: ""})
  ui!: string;

  @Prop({default: false})
  loading!: boolean;

  @Emit("reloadAction")
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  reloadAction() {}

  items = [
    {
      icon: true,
      title: "Jason Oner",
      avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
    },
    {title: "Travis Howard", avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg"},
    {title: "Ali Connors", avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg"},
    {title: "Cindy Baker", avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg"},
  ];
}
</script>