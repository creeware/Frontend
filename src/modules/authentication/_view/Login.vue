<template>
  <div class="bg-success background-box login-container-view">
    <el-card class="container-card login-card" shadow="always">
      <p class="login-container-item">CREEWARE</p>
        <el-button class="login-container-item" @click="login('github')" type="primary" round>Login with Github</el-button>
        <el-tooltip class="login-container-item" effect="dark" content="Coming Soon!" placement="bottom">
            <div>
            <el-button type="info" disabled round>Login with Canvas</el-button>
            </div>
        </el-tooltip>
    </el-card>
  </div>
</template>

<script>
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
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
