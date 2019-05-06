<template>
  <div id="user">
    <el-card>
      <el-row>
        <el-col style="border-radius: 0.25em; overflow: hidden;" :span="3">
          <el-image :src="this.user.profilePicture" fit="cover" style></el-image>
        </el-col>
        <el-col :span="20">
          <span>{{user.username}}</span>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import "element-ui/lib/theme-chalk/display.css";

export default {
  name: "user",
  data() {
    return {
      user: {
        username: "Pontusblue",
        profilePicture:
          "https://avatars2.githubusercontent.com/u/18573650?s=460&v=4"
      }
    };
  }
};
</script>

<style>
</style>
