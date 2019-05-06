<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs8>olalal</v-flex>
      <v-flex xs4>
        <repository-control-box/>
      </v-flex>
      <v-flex xs12>
        <repository-list
          :repositories="repositories"
          :minimal_users="minimal_users"
          :minimal_organizations="minimal_organizations"
          :minimal_repositories="minimal_repositories"
          @handle-filter-change="applyFilterChange"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import RepositoryList from "../_component/RepositoryList";
import RepositoryControlBox from "../_component/RepositoryControlBox";
import { mapState, mapActions } from "vuex";
import store from "@/store";

export default {
  name: "Repositories",
  beforeMount() {
    store.dispatch("getRepositories", this.params).then(() => {
      store.dispatch("getMinimalRepositories").then(() => {
        store.dispatch("getMinimalOrganizations").then(() => {
          store.dispatch("getMinimalUsers").then(() => {
            this.isListLoading = false;
          });
        });
      });
    });
  },
  computed: mapState({
    repositories: state => state.repository.repositories,
    minimal_users: state => state.user.minimal_users,
    minimal_organizations: state => state.organization.minimal_organizations,
    minimal_repositories: state => state.repository.minimal_repositories
  }),
  data() {
    return {
      isListLoading: false,
      isImportOrganizationOpen: false,
      params: {
        filter: undefined
      }
    };
  },
  components: {
    RepositoryList,
    RepositoryControlBox
  },
  methods: {
    ...mapActions(["getRepositories"]),
    applyFilterChange(filter) {
      this.$emit("handle-filter-change", filter);
      this.getRepositories(filter);
    }
  }
};
</script>


<style scoped>
</style>
