<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs8>olalal</v-flex>
      <v-flex xs4>
        <repository-control-box @handle-create-repository="handleCreateRepository"/>
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
      <create-new-repository
        v-if="isCreateRepositoryOpen"
        :repositoriesLoading="repositoriesLoading"
        :profile="profile"
        :isModalOpen="isCreateRepositoryOpen"
        :minimal_users="minimal_users"
        :minimal_organizations="minimal_organizations"
        :solution_repositories="solution_repositories"
        :template_repositories="template_repositories"
        @handle-filter-change="handleFilterChange"
        @handle-create-repository="handleCreateRepository"
        @handle-create-new-repository="createNewRepository"
      />
    </v-layout>
  </v-container>
</template>

<script>
import RepositoryList from "../_component/RepositoryList";
import CreateNewRepository from "../_component/CreateNewRepository";
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
    profile: state => state.authentication.profile,
    repositories: state => state.repository.repositories,
    solution_repositories: state => state.repository.solution_repositories,
    template_repositories: state => state.repository.template_repositories,
    minimal_users: state => state.user.minimal_users,
    minimal_organizations: state => state.organization.minimal_organizations,
    minimal_repositories: state => state.repository.minimal_repositories
  }),
  data() {
    return {
      isListLoading: false,
      repositoriesLoading: false,
      isCreateRepositoryOpen: false,
      params: {
        filter: undefined
      }
    };
  },
  components: {
    RepositoryList,
    RepositoryControlBox,
    CreateNewRepository
  },
  methods: {
    ...mapActions([
      "getRepositories",
      "getTemplateRepositories",
      "getSolutionRepositories",
      "createRepository"
    ]),
    handleFilterChange(solutionFilter, templateFilter) {
      this.repositoriesLoading = true;
      this.getSolutionRepositories(solutionFilter).then(() => {
        this.getTemplateRepositories(templateFilter).then(() => {
          this.repositoriesLoading = false;
        });
      });
    },
    applyFilterChange(filter) {
      this.$emit("handle-filter-change", filter);
      this.getRepositories(filter);
    },
    handleCreateRepository() {
      this.isCreateRepositoryOpen = !this.isCreateRepositoryOpen;
    },
    createNewRepository(repository){
      this.createRepository(repository)
    }
  }
};
</script>


<style scoped>
</style>
