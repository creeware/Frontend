<template>
  <v-data-table
    :headers="headers"
    :items="repositories"
    class="elevation-1"
    :expand="expand"
    item-key="repository_name"
  >
    <template v-slot:items="props">
      <tr @click="props.expanded = !props.expanded">
        <td>
          <router-link
            class="link-item"
            :to="'/repositories/' + props.item.repository_uuid"
          >{{ props.item.repository_name }}</router-link>
        </td>
        <td>{{ props.item.repository_type }}</td>
        <td>
          <v-chip
            :color="statusColorizer(props.item.repository_status)"
            text-color="white"
          >{{ props.item.repository_status.toUpperCase() }}</v-chip>
        </td>
        <td>{{ getDate(props.item.release_date) }}</td>
        <td>{{ getDate(props.item.due_date) }}</td>
        <td>{{ getDate(props.item.repository_submission_date) }}</td>
      </tr>
    </template>
    <template v-slot:expand="props">
      <v-card flat>
        <v-card-text>{{ props.item.repository_description }}</v-card-text>
      </v-card>
    </template>
    <template v-slot:footer v-if="filterable">
      <td :colspan="headers.length">
        <repositories-filter
          :repositories="repositories"
          :minimal_users="minimal_users"
          :minimal_repositories="minimal_repositories"
          :minimal_organizations="minimal_organizations"
          @handle-filter-change="handleFilterChange"
          :isFilterShown="isFilterShown"
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
            right
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
            right
          >
            <v-icon>clear</v-icon>
          </v-btn>
        </v-fab-transition>
      </td>
    </template>
  </v-data-table>
</template>

<script>
import RepositoriesFilter from "./RepositoriesFilter";
import { getDate, statusColorizer } from "@/utils";
export default {
  name: "RepositoryList",
  components: {
    RepositoriesFilter
  },
  props: {
    repositories: Array,
    minimal_users: Array,
    minimal_repositories: Array,
    minimal_organizations: Array,
    filterable: Boolean
  },
  data() {
    return {
      expand: false,
      isFilterShown: false,
      headers: [
        {
          text: "Repository Name",
          align: "left",
          sortable: true,
          value: "repository_name"
        },
        { text: "Type", value: "repository_type" },
        { text: "Status", value: "repository_status" },
        { text: "Release Date", value: "release_date" },
        { text: "Due Date", value: "due_date" },
        { text: "Submission Date", value: "repository_submission_date" }
      ]
    };
  },
  methods: {
    getDate,
    statusColorizer,
    handleFilterChange(filter) {
      this.$emit("handle-filter-change", filter);
    },
    handleFilterShown(){
      this.isFilterShown = !this.isFilterShown;
    }
  }
};
</script>