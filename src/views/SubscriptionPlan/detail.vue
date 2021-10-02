<template>
  <v-main>
    <h1>
      User Detail
      {{ $route.params.id }}
    </h1>
  </v-main>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';

@Component({ })
export default class UserDetail extends Vue {};
</script>

<style>
</style>