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
        <div class="ml-5">
          <router-link class="link" :to="{ name: 'Create-User', params: { userId: 123 }}">
            <v-btn color="primary" outlined elevation="0">
              <v-icon class="mr-1">mdi-plus</v-icon>
              Add User
            </v-btn>
          </router-link>
        </div>
      </div>
    </v-card-title>
    <v-data-table :headers="headers" :items="desserts" :search="search">
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small class="mr-2" @click="editItem(item)">mdi-v-icon</v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";

@Component({ })
export default class Users extends Vue {
  search = "";
  headers = [
    {
      text: "Dessert (100g serving)",
      align: "start",
      sortable: false,
      value: "name",
    },
    { text: "Calories", value: "calories" },
    { text: "Fat (g)", value: "fat" },
    { text: "Carbs (g)", value: "carbs" },
    { text: "Protein (g)", value: "protein" },
    { text: "Iron (%)", value: "iron" },
    { text: "Actions", value: "actions", sortable: false },
  ];
  desserts = [
    {
      name: "Frozen Yogurt",
      calories: 159,
      fat: 6.0,
      carbs: 24,
      protein: 4.0,
      iron: "1%",
    },
    {
      name: "Ice cream sandwich",
      calories: 237,
      fat: 9.0,
      carbs: 37,
      protein: 4.3,
      iron: "1%",
    },
    {
      name: "Eclair",
      calories: 262,
      fat: 16.0,
      carbs: 23,
      protein: 6.0,
      iron: "7%",
    },
    {
      name: "Cupcake",
      calories: 305,
      fat: 3.7,
      carbs: 67,
      protein: 4.3,
      iron: "8%",
    },
    {
      name: "Gingerbread",
      calories: 356,
      fat: 16.0,
      carbs: 49,
      protein: 3.9,
      iron: "16%",
    },
    {
      name: "Jelly bean",
      calories: 375,
      fat: 0.0,
      carbs: 94,
      protein: 0.0,
      iron: "0%",
    },
    {
      name: "Lollipop",
      calories: 392,
      fat: 0.2,
      carbs: 98,
      protein: 0,
      iron: "2%",
    },
    {
      name: "Honeycomb",
      calories: 408,
      fat: 3.2,
      carbs: 87,
      protein: 6.5,
      iron: "45%",
    },
    {
      name: "Donut",
      calories: 452,
      fat: 25.0,
      carbs: 51,
      protein: 4.9,
      iron: "22%",
    },
    {
      name: "KitKat",
      calories: 518,
      fat: 26.0,
      carbs: 65,
      protein: 7,
      iron: "6%",
    },
    {
      name: "Lollipop",
      calories: 392,
      fat: 0.2,
      carbs: 98,
      protein: 0,
      iron: "2%",
    },
    {
      name: "Honeycomb",
      calories: 408,
      fat: 3.2,
      carbs: 87,
      protein: 6.5,
      iron: "45%",
    },
    {
      name: "Donut",
      calories: 452,
      fat: 25.0,
      carbs: 51,
      protein: 4.9,
      iron: "22%",
    },
    {
      name: "KitKat",
      calories: 518,
      fat: 26.0,
      carbs: 65,
      protein: 7,
      iron: "6%",
    },
    {
      name: "Lollipop",
      calories: 392,
      fat: 0.2,
      carbs: 98,
      protein: 0,
      iron: "2%",
    },
    {
      name: "Honeycomb",
      calories: 408,
      fat: 3.2,
      carbs: 87,
      protein: 6.5,
      iron: "45%",
    },
    {
      name: "Donut",
      calories: 452,
      fat: 25.0,
      carbs: 51,
      protein: 4.9,
      iron: "22%",
    },
    {
      name: "KitKat",
      calories: 518,
      fat: 26.0,
      carbs: 65,
      protein: 7,
      iron: "6%",
    },
    {
      name: "Lollipop",
      calories: 392,
      fat: 0.2,
      carbs: 98,
      protein: 0,
      iron: "2%",
    },
    {
      name: "Honeycomb",
      calories: 408,
      fat: 3.2,
      carbs: 87,
      protein: 6.5,
      iron: "45%",
    },
    {
      name: "Donut",
      calories: 452,
      fat: 25.0,
      carbs: 51,
      protein: 4.9,
      iron: "22%",
    },
    {
      name: "KitKat",
      calories: 518,
      fat: 26.0,
      carbs: 65,
      protein: 7,
      iron: "6%",
    },
  ];
}
</script>