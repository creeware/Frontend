<template>
    <UserProfile :profile="user"/>
</template>

<script>
import UserProfile from '@/modules/user/_components/UserProfile';

export default {
  name: "user",
  components: {
    UserProfile
  },
  data() {
    return {
      user: {
        user_display_name: "Pontus Asp",
        username: "Pontusblue",
        avatar_url:
          "https://avatars2.githubusercontent.com/u/18573650?s=460&v=4",
        user_email: "poasp@kth.se",
        profile_url: "https://github.com/Pontusblue",
        user_bio: "I am master of faster lord of distaster, sanic's my name, speed's my game",
        user_role: "Master",
      }
    };
  }
};
</script>

<style>
</style>
