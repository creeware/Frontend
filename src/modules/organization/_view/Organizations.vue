<template>
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
          :minimal_organizations="minimal_organizations"
          @handle-filter-change="applyFilterChange"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import OrganizationList from "../_component/OrganizationList";
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
    minimal_organizations: state => state.organization.minimal_organizations
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
    OrganizationList,
    OrganizationControlBox
  },
  methods: {
    ...mapActions(["getOrganizations"]),
    applyFilterChange(filter) {
      this.$emit("handle-filter-change", filter);
      this.getOrganizations(filter);
    }
  }
};
</script>


<style scoped>
</style>
