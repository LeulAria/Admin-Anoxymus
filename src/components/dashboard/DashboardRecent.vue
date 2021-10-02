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
          <v-avatar class="mr-5" size="35" color="primary">
            <img v-if="item.photo" :src="item.photo" :alt="item.name" />
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-coin" viewBox="0 0 16 16">
              <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z"/>
              <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path fill-rule="evenodd" d="M8 13.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/>
            </svg>
          </v-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="item.destinationNumber"></v-list-item-title>
            <v-list-item-title v-text="`Amount: ${item.paymentInfo.amount}-${item.paymentInfo.currency}`"></v-list-item-title>
               <!-- item?.paymentInfo?.status -->
          </v-list-item-content>

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