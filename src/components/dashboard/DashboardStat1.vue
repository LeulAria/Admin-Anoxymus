<template>
  <v-card
    class="mx-auto rounded-lg"
    outlined
  >
    <v-card-title>
      <v-icon
        :color="checking ? 'red lighten-2' : 'indigo'"
        class="mr-12"
        size="64"
        @click="takePulse"
      >
        mdi-inbox-arrow-up
      </v-icon>
      <v-row align="start">
        <div class="text-caption grey--text text-uppercase">
          Per Month
        </div>
      </v-row>
      <v-spacer></v-spacer>

      <div>
        <span
          class="ml-10 text-h3 font-weight-black"
          v-text="avg || '—'"
        ></span>
        <strong v-if="avg">BPM</strong>
      </div>

    </v-card-title>

    <v-sheet color="transparent">
      <v-sparkline
        :key="String(avg)"
        :smooth="16"
        :gradient="['#222', '#666', '#DDD']"
        :line-width="3"
        :value="heartbeats"
        auto-draw
        stroke-linecap="round"
      ></v-sparkline>
    </v-sheet>
  </v-card>
</template>

<script>
const exhale = ms =>
  new Promise(resolve => setTimeout(resolve, ms))

export default {
  data: () => ({
    checking: false,
    heartbeats: [],
  }),

  computed: {
    avg () {
      const sum = this.heartbeats.reduce((acc, cur) => acc + cur, 0)
      const length = this.heartbeats.length

      if (!sum && !length) return 0

      return Math.ceil(sum / length)
    },
  },

  created () {
    this.takePulse(false)
  },

  methods: {
    heartbeat () {
      return Math.ceil(Math.random() * (120 - 80) + 80)
    },
    async takePulse (inhale = true) {
      this.checking = true

      inhale && await exhale(1000)

      this.heartbeats = Array.from({ length: 20 }, this.heartbeat)

      this.checking = false
    },
  },
}
</script>