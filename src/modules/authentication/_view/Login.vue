<template>
  <div class="bg-success background-box login-container-view">
    <v-card>
      <v-container
        fluid
        grid-list-lg
      >
      <p class="text-large">CREEWARE</p>
        <v-btn round class="bg-primary" @click="login('github')" dark>Login with Github</v-btn >
        <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <div v-on="on">
              <v-btn class="bg-info" disabled round>Login with Canvas</v-btn>
              </div>
            </template>
            <span>Coming Soon!</span>
        </v-tooltip>
        <privacy-policy></privacy-policy>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import PrivacyPolicy from "@/modules/authentication/_component/PrivacyPolicy.vue"
import { mapState, mapActions } from "vuex";

export default {
  name: "Login",
  mounted() {},
  computed: {
    ...mapState({
      isAuthenticated: state => state.authentication.isAuthenticated
    })
  },
  props: {},
  methods: {
    ...mapActions(["login"])
  },
  components: {
    PrivacyPolicy
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
