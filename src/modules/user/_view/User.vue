<template>
    <UserProfile :profile="user"/>
</template>

<script>
import UserProfile from '@/modules/user/_components/UserProfile';
import store from "@/store";
import { mapState, mapActions } from "vuex";

export default {
  name: "user",
  beforeRouteEnter(to, from, next) {
    store.dispatch("getUser", to.params.uuid).then(() => 
    next());
  },
  computed: mapState({
    user: state => state.user.user
  }),
  components: {
    UserProfile
  }
};
</script>

<style>
</style>
