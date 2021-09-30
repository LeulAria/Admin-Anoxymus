<template>
  <v-app class="auth-bg">
    <div class="card-container">
      <div class="card">
        <router-view></router-view>
      </div>
    </div>
  </v-app>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class Login extends Vue {}
</script>

<style lang="stylus" scoped>
.auth-bg {
  height: 100vh;
  width: 100vw;
  background: radial-gradient(
    ellipse farthest-side at 56% 77%,
    rgba(245, 228, 212, 0.5) 4%,
    rgba(255, 255, 255, 0) calc(4% + 1px)
  ), radial-gradient(circle at 66% 40%, #FEF6ECAA 4%, rgba(255, 255, 255, 0) 4.18%), linear-gradient(135deg, #ff0000 0%, #000036 100%), radial-gradient(
    ellipse at 28% 0%,
    #ffcfac 0%,
    rgba(98, 149, 144, 0.5) 100%
  ), linear-gradient(
    180deg,
    #cd6e8a 0%,
    #F5EAB0A6 69%,
    #d6c8a2 70%,
    #a2758d 100%
  );
  background-blend-mode: normal, normal, screen, overlay, normal;
}

.card-container {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
}

.card {
  min-width: 300px;
  width: 60%;
  max-width: 450px;
  padding: 2rem;
  min-height: 400px;
  backdrop-filter: blur(10px) saturate(95%);
  -webkit-backdrop-filter: blur(20px) saturate(90%);
  background-color: rgba(255, 255, 255, 0.39);
  border-radius: 4px;
  border: 1px solid rgba(209, 213, 219, 0.3);
}
</style>