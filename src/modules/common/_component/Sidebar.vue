<template>
  <el-menu
    style="height: 100vh;"
    @open="handleOpen"
    @close="handleClose"
    :router="true"
    :collapse="isCollapsed"
    :default-active="this.$route.name"
  >
    <el-submenu index="users">
      <template slot="title">
        <i class="el-icon-user-solid"></i>
        <span>Users</span>
      </template>
      <el-menu-item index="list">User List</el-menu-item>
      <el-menu-item index="profile">My Profile</el-menu-item>
    </el-submenu>
    <el-menu-item index="HelloWorld">
      <i class="el-icon-menu"></i>
      <span>Navigator Two</span>
    </el-menu-item>
    <el-menu-item index="3" disabled>
      <span>Navigator Three</span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-setting"></i>
      <span>Navigator Four</span>
    </el-menu-item>
    <el-menu-item @click="$emit('handle-collapse')">
      <i
        :class="isCollapsed ? 'el-icon-arrow-right' : 'el-icon-arrow-left'"
        size="small"
      ></i>
      <span>Collapse Sidebar</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  props: {
    isCollapsed: {
      type: Boolean
    }
  },
  name: "Sidebar",
  mounted() {},
  data() {
    return {};
  },
  computed: {},
  methods: {
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {}
  }
};
</script>


<style scoped>
</style>
