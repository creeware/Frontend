<template>
  <div id="users">
    <el-card>
      <UserList :users="users"/>
    </el-card>
  </div>
</template>

<script>
import UserList from "@/modules/user/_components/UserList.vue";

export default {
  name: "users",
  components: {
    UserList
  },
  data() {
    return {
      users: [
        {
          user_display_name: "Pontus Asp",
          user_email: "poasp@kth.se",
          user_role: "Master",
          username: "Pontusblue"
        }
      ]
    };
  }
};
</script>

<style>
#users {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
