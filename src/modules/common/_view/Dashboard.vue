<template>
  <v-app class="bg-grey">
    <v-content>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-content>
    <bottom-nav/>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";
import BottomNav from "../_component/BottomNav.vue";
import { jwtDecoder } from "@/utils";
import store from "@/store";

export default {
  name: "Dashboard",
  mounted() {},
  components: {
    BottomNav
  },
  computed: {
    ...mapState({
      isAuthenticated: state => state.authentication.isAuthenticated
    })
  },
  data() {
    return {
      sidebarCollapsed: true
    };
  },
  props: {},
  methods: {
    ...mapActions(["logout", "getProfile", "getProfileStatistics"]),

    handleCollapse() {
      this.sidebarCollapsed = !this.sidebarCollapsed;
    }
  },

  beforeRouteEnter(to, from, next) {
    const token = window.localStorage.getItem("vue-authenticate.access_token");
    const profileId = jwtDecoder(token)["user_id"];
    store
      .dispatch("getProfile", profileId)
      .then(() => store.dispatch("getProfileStatistics", profileId).then(() => next()));
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
