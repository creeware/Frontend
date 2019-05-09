<template>
  <v-card height="56px" style="width: 50vw; margin: auto;">
    <v-bottom-nav :active.sync="bottomNav" :value="true" fixed :color="color" app mandatory>
      <router-link class="link-item" to="/dashboard">
        <v-btn color="white" flat value="dashboard">
          <span>Dashboard</span>
          <v-icon>account_box</v-icon>
        </v-btn>
      </router-link>
      <router-link class="link-item" to="/users">
        <v-btn color="white" flat value="users">
          <span>Users</span>
          <v-icon>people</v-icon>
        </v-btn>
      </router-link>
      <router-link class="link-item" to="/repositories">
        <v-btn color="white" flat value="repositories">
          <span>Repositories</span>
          <v-icon>folder</v-icon>
        </v-btn>
      </router-link>
      <router-link class="link-item" to="/organizations">
        <v-btn color="white" flat value="organizations">
          <span>Organizations</span>
          <v-icon>domain</v-icon>
        </v-btn>
      </router-link>
    </v-bottom-nav>
  </v-card>
</template>

<script>
export default {
  props: {
    isCollapsed: {
      type: Boolean
    }
  },
  name: "BottomNav",
  mounted() {},
  data() {
    return {
      bottomNav: this.$route.name
    };
  },
  computed: {
    color() {
      switch (this.bottomNav) {
        case "dashboard":
          return "cyan darken-1";
        case "users":
          return "teal darken-1";
        case "repositories":
          return "red darken-1";
        case "organizations":
          return "green darken-1";
      }
      return "white"
    }
  },
  methods: {
    handleCollapse() {
      this.$emit("handle-collapse");
    },

    handleLogout() {
      this.$emit("handle-logout");
    }
  }
};
</script>


<style scoped>
</style>
