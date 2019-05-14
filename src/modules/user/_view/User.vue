<template>
  <div>
    <v-container>
      <UserProfile :profile="user"/>
    </v-container>
    <v-container>
      <repository-list
        :repositories="repositories"
        :minimal_users="minimal_users"
        :minimal_organizations="minimal_organizations"
        :minimal_repositories="minimal_repositories"
        :filterable="false"
        @handle-filter-change="applyFilterChange"
      />
    </v-container>
    <v-container>
      <organization-list
        :organizations="organizations"
        :minimal_users="minimal_users"
        :minimal_organizations="minimal_organizations"
        @handle-filter-change="applyFilterChange"
        :filterable="false"
      />
    </v-container>
  </div>
</template>

<script>
import UserProfile from "@/modules/user/_components/UserProfile";
import RepositoryList from "@/modules/repository/_component/RepositoryList";
import OrganizationList from "@/modules/organization/_component/OrganizationList";
import store from "@/store";
import { mapState } from "vuex";

export default {
  name: "user",
  beforeRouteEnter(to, from, next) {
    store.dispatch("getUser", to.params.uuid).then(() => next());
  },
  mounted() {
    store
      .dispatch("getOrganizations", {
        user_uuid: this.user.user_uuid
      })
      .then(() => {
        store
          .dispatch("getRepositories", {
            member_uuid: this.user.user_uuid
          })
          .then(() => (this.$data.repoLoaded = true));
      });
  },
  computed: mapState({
    user: state => state.user.user,
    organizations: state => state.organization.organizations,
    repository: state => state.repository.repository,
    repositories: state => state.repository.repositories,
    minimal_repositories: state => state.repository.minimal_repositories,
    minimal_organizations: state => state.organization.minimal_organizations,
    minimal_users: state => state.user.minimal_users
  }),
  data() {
    return {
      repoLoaded: false,
      repoLoaded: false
    };
  },
  components: {
    UserProfile,
    RepositoryList,
    OrganizationList
  },
  methods: {
    applyFilterChange(filter) {}
  }
};
</script>

<style>
</style>
