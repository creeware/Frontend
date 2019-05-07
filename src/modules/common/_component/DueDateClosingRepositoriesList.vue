<template>
  <v-data-table
    :headers="headers"
    :items="repositories"
    class="elevation-1"
    :expand="expand"
    item-key="repository_name"
  >
  <template v-slot:no-data>
      <v-alert :value="true" color="success" icon="done_all">
          Perfect! Seems like you have nothing approaching on the horizon! Keep clearing your tasks :)
      </v-alert>
    </template>
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
  </v-data-table>
</template>

<script>
import { getDate, statusColorizer } from "@/utils";

export default {
  name: "DueDateClosingRepositoriesList",
  props: {
    repositories: Array,
  },
  data() {
    return {
      expand: false,
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
  }
};
</script>