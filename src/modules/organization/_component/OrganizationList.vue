<template>
  <v-data-table
    :headers="headers"
    :items="organizations"
    class="elevation-1"
    :expand="expand"
    item-key="organization_name"
  >
    <template v-slot:items="props">
      <tr @click="props.expanded = !props.expanded">
        <td>
          <router-link
            class="link-item"
            :to="'/organizations/' + props.item.organization_uuid"
          >{{ props.item.organization_name }}</router-link>
        </td>
        <td>{{ props.item.company_name }}</td>
        <td>{{ props.item.repository_count }}</td>
      </tr>
    </template>
    <template v-slot:expand="props">
      <v-card flat>
        <v-card-text>{{ props.item.organization_description }}</v-card-text>
      </v-card>
    </template>
    <template v-slot:footer>
      <td :colspan="headers.length">
        <organizations-filter
          :organizations="organizations"
          :minimal_users="minimal_users"
          :minimal_organizations="minimal_organizations"
          :isFilterShown="isFilterShown"
          @handle-filter-change="handleFilterChange"
        />
        <v-fab-transition>
          <v-btn
            v-if="!isFilterShown"
            @click="handleFilterShown"
            class="bg-grey"
            fab
            dark
            small
            relative
            bottom
            left
          >
            <v-icon>search</v-icon>
          </v-btn>
          <v-btn
            v-else
            @click="handleFilterShown"
            class="bg-grey"
            fab
            dark
            small
            relative
            bottom
            left
          >
            <v-icon>clear</v-icon>
          </v-btn>
        </v-fab-transition>
      </td>
    </template>
  </v-data-table>
</template>

<script>
import OrganizationsFilter from "./OrganizationsFilter";

export default {
  name: "OrganizationList",
  components: {
    OrganizationsFilter
  },
  props: {
    organizations: Array,
    minimal_users: Array,
    minimal_organizations: Array
  },
  data() {
    return {
      expand: false,
      isFilterShown: false,
      headers: [
        {
          text: "Organization Name",
          align: "left",
          sortable: true,
          value: "organization_name"
        },
        { text: "Company Name", value: "company_name" },
        { text: "Repository Count", value: "repository_count" }
      ]
    };
  },
  methods: {
    handleFilterChange(filter) {
      this.$emit("handle-filter-change", filter);
    },
    handleFilterShown() {
      this.isFilterShown = !this.isFilterShown;
    }
  }
};
</script>