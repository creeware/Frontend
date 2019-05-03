<template>
  <el-container style="width: 100vw;">
    <el-aside :class="sidebarCollapsed ? 'sidebar-collapsed': 'sidebar-not-collapsed'">
      <sidebar
        :isCollapsed="sidebarCollapsed"
        @handle-collapse="sidebarCollapsed = !sidebarCollapsed"
      />
    </el-aside>
    <el-main class="bg-grey main-container-view">
      <transition name="el-fade-in">
        <router-view class="transition-box"/>
      </transition>
    </el-main>
  </el-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Sidebar from "../_component/Sidebar.vue";

export default {
  name: "Dashboard",
  mounted() {},
  components: {
    Sidebar
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
    ...mapActions(["login"])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
