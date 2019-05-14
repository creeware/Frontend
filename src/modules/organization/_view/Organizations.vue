<template>
  <v-container grid-list-md>
    <v-snackbar
      color="bg-primary"
      v-model="snackbar"
      :top="true"
      :timeout="2000"
    >
      "Repository status updated!"
      <v-btn color=bg-success flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <v-layout row wrap>
      <v-flex xs6>
        <organization-control-box @handle-import-organization="handleImportOrganization"/>
      </v-flex>
      <v-flex xs12>
        <organization-list
          :organizations="organizations"
          :minimal_users="minimal_users"
          :minimal_organizations="minimal_organizations"
          @handle-filter-change="applyFilterChange"
          :filterable="true"
        />
      </v-flex>
      <import-organization
        v-if="isImportOrganizationOpen"
        :imported_repositories="imported_repositories"
        :isModalOpen="isImportOrganizationOpen"
        :importLoading="importLoading"
        @handle-import-organization="handleImportOrganization"
        @import-organization="importTheOrganization"
        @handle-update-repository="handleUpdateRepository"
      />
    </v-layout>
  </v-container>
</template>

<script>
import OrganizationList from "../_component/OrganizationList";
import ImportOrganization from "../_component/ImportOrganization";
import OrganizationControlBox from "../_component/OrganizationControlBox";
import { mapState, mapActions } from "vuex";
import store from "@/store";

export default {
  name: "Organizations",
  beforeMount() {
    store.dispatch("getOrganizations", this.params).then(() => {
      store.dispatch("getMinimalOrganizations").then(() => {
        store.dispatch("getMinimalUsers").then(() => {
          this.isListLoading = false;
        });
      });
    });
  },
  computed: mapState({
    organizations: state => state.organization.organizations,
    minimal_users: state => state.user.minimal_users,
    minimal_organizations: state => state.organization.minimal_organizations,
    imported_repositories: state => state.organization.imported_repositories
  }),
  data() {
    return {
      isListLoading: false,
      isImportOrganizationOpen: false,
      importedRepositories: Array,
      snackbar: false,
      params: {
        filter: undefined
      },
      importLoading: false
    };
  },
  components: {
    OrganizationList,
    OrganizationControlBox,
    ImportOrganization
  },
  methods: {
    ...mapActions(["importOrganization", "updateImportedRepository", "getOrganizations"]),
    handleImportOrganization() {
      this.isImportOrganizationOpen = !this.isImportOrganizationOpen;
    },
    importTheOrganization(organization_name) {
      this.importLoading = true;
      this.importOrganization(organization_name).then(() => {
        this.importLoading = false;
      });
    },
    applyFilterChange(filter) {
      this.$emit("handle-filter-change", filter);
      this.getOrganizations(filter);
    },
    handleUpdateRepository(repository) {
      this.updateImportedRepository(repository).then(() => {
        this.snackbar = true;
      });
    }
  }
};
</script>


<style scoped>
</style>
