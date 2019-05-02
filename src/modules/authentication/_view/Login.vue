<template>
  <div class="bg-success background-box">
    <el-card class="center login-card" shadow="always">
      <div class="center">
        <el-row class="login-button">
          <el-button @click="login('github')" type="primary" round>Login with Github</el-button>
        </el-row>
        <el-tooltip class="item" effect="dark" content="Coming Soon!" placement="bottom">
          <el-row class="login-button">
            <el-button class="login-button" type="info" disabled round>Login with Canvas</el-button>
          </el-row>
        </el-tooltip>
      </div>
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
@import "@/assets/style/_colors.scss";

.login-card {
  height: 50%;
  width: 30%;
}
.center {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.login-button {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
