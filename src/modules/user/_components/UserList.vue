<template>
  <div id="UserList">
    <el-table :data="users" style="width: 100%">
      <el-table-column prop="user_display_name" label="Name">
        <template slot-scope="scope">
          <router-link :to="'/user/' + scope.row.username">{{scope.row.user_display_name}}</router-link>
        </template>
      </el-table-column>
      <el-table-column prop="user_email" label="Email"></el-table-column>
      <el-table-column prop="user_role" label="Role"></el-table-column>
      <el-table-column prop="username" label="GitHub"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "UserList",
  props: {
    users: Array
  }
};
</script>

<style>
#user-list {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
