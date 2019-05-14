<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-layout row wrap>
          <v-flex xs12 sm4 md4 lg4 xl4 class="pa-1">
              <organization-card v-if="hasLoaded" :organization="organization"/>
          </v-flex>
          <v-flex xs12 sm8 md8 lg8 xl8 class="pa-1">
              <v-card v-if="hasLoaded" color="cyan darken-1">
                <v-card-title class="title">
                  <span class="white--text">
                    <v-icon class="white--text">person</v-icon>
                    Owner
                  </span>
                </v-card-title>
                <profile :profile="user" v-if="hasLoaded"/>
              </v-card>
          </v-flex>
        </v-layout>
          <v-card v-if="hasLoaded" color="red darken-1" class="mt-1 mx-1">
            <v-card-title class="title">
              <span class="white--text">
                <v-icon class="white--text">folder</v-icon>
                Repositories
              </span>
            </v-card-title>
            <repository-list
              v-if="hasLoaded"
              :repositories="repositories"
              :minimal_users="minimal_users"
              :minimal_organizations="[organization]"
              :minimal_repositories="[repositories]"
              @handle-filter-change="applyFilterChange"
              :filterable="false"
            />
          </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import OrganizationCard from "@/modules/repository/_component/OrganizationCard.vue";
import RepositoryList from "@/modules/repository/_component/RepositoryList.vue";
import Profile from "@/modules/common/_component/Profile.vue";
import store from "@/store";
import { mapState, mapActions } from "vuex";
export default {
  name: "Organization",
  beforeMount() {
    store.dispatch("getUser", this.organization.user_uuid).then(() => {
      store.dispatch("getRepositories", this.params.filter).then(() => {
        store
          .dispatch("getMinimalRepositories", this.params.filter)
          .then(() => {
            store
              .dispatch("getMinimalOrganizations", this.params.filter)
              .then(() => {
                store.dispatch("getMinimalUsers").then(() => {
                  this.isListLoading = false;
                  this.params.filter.organization_uuid = this.organization.organization_uuid;
                  this.applyFilterChange(this.params.filter);
                  this.hasLoaded = true;
                });
              });
          });
      });
    });
  },
  beforeRouteEnter(to, from, next) {
    store.dispatch("getOrganization", to.params.uuid).then(() => {
      next();
    });
  },
  computed: mapState({
    organization: state => state.organization.organization,
    user: state => state.user.user,
    repositories: state => state.repository.repositories,
    solution_repositories: state => state.repository.solution_repositories,
    template_repositories: state => state.repository.template_repositories,
    minimal_repositories: state => state.repository.minimal_repositories,
    minimal_organizations: state => state.organization.minimal_organizations,
    minimal_users: state => state.user.minimal_users
  }),
  components: {
    OrganizationCard,
    RepositoryList,
    Profile
  },
  data() {
    return {
      isListLoading: false,
      repositoriesLoading: false,
      params: {
        filter: {
          organization_uuid: [],
          user_uuid: [],
          repository_status: undefined,
          repository_type: undefined,
          repository_submission_date: undefined,
          release_date: undefined,
          due_date: undefined
        }
      },
      hasLoaded: false,
      users: []
    };
  },
  methods: {
    ...mapActions([
      "getRepositories",
      "getTemplateRepositories",
      "getSolutionRepositories",
      "getUser"
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
      filter.organization_uuid = this.organization.organization_uuid;
      this.$emit("handle-filter-change", filter);
      this.getRepositories(filter);
    },
    userFilter() {
      var i;
      for (i = 0; i < this.repositories.length; i++) {
        if (
          this.repositories[i].organization_uuid ===
          this.organization.organization_uuid
        )
          this.users.push(this.getUser(this.repositories[i].user_uuid));
      }
    }
  }
};
</script>

<style scoped>
</style>