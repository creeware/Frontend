<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <user-list
          :users="users"
          :minimal_users="minimal_users"
          @handle-filter-change="applyFilterChange"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>


<!--<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs8>olalal</v-flex>
      <v-flex xs4>
        <organization-control-box/>
      </v-flex>
      <v-flex xs12>
        <organization-list
          :organizations="organizations"
          :minimal_users="minimal_users"
          @handle-filter-change="applyFilterChange"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>
-->

<script>
import UserList from "@/modules/user/_components/UserList.vue";
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
    UserList
  },
  data() {
    return {
      isListLoading: false,
      params: {
        filter: undefined
      }
    };
  },
  methods: {
    ...mapActions(["getMinimalUsers", "getUsers"]),
    applyFilterChange(filter) {
      this.$emit("handle-filter-change", filter);
      this.getUsers(filter);
    }
  }
};
</script>

<style>
</style>
