<template>
  <v-container grid-list-md>
    <v-snackbar color="bg-primary" v-model="snackbar" :top="true" :timeout="2000">
      "Repository status updated!"
      <v-btn color="bg-success" flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <v-layout row wrap>
      <v-flex xs4>
        <user-control-box @handle-invite-user="handleInviteUser"/>
      </v-flex>
      <v-flex xs12>
        <user-list
          :users="users"
          :minimal_users="minimal_users"
          @handle-filter-change="applyFilterChange"
        />
      </v-flex>
      <invite-user
        v-if="isInviteUserOpen"
        :isModalOpen="isInviteUserOpen"
        @invite-user="inviteNewUser"
      />
    </v-layout>
  </v-container>
</template>

<script>
import UserList from "../_components/UserList.vue";
import UserControlBox from "../_components/UserControlBox";
import InviteUser from "../_components/InviteUser";
import store from "@/store";
import { mapState, mapActions } from "vuex";

export default {
  name: "Users",
  beforeMount() {
    store.dispatch("getUsers", this.params).then(() => {
      store.dispatch("getMinimalUsers").then(() => {
        this.isListLoading = false;
      });
    });
  },
  computed: mapState({
    users: state => state.user.users,
    minimal_users: state => state.user.minimal_users
  }),
  components: {
    UserList,
    UserControlBox,
    InviteUser
  },
  data() {
    return {
      isListLoading: false,
      isInviteUserOpen: false,
      snackbar: false,
      params: {
        filter: undefined
      }
    };
  },
  methods: {
    ...mapActions(["inviteUser", "getUsers"]),
    applyFilterChange(filter) {
      this.$emit("handle-filter-change", filter);
      this.getUsers(filter);
    },
    handleInviteUser() {
      this.isInviteUserOpen = !this.isInviteUserOpen;
    },
    inviteNewUser(payload) {
      this.inviteUser(payload);
    }
  }
};
</script>

<style>
</style>
