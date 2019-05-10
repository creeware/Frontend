<template>
  <v-data-table
    :headers="headers"
    :items="users"
    class="elevation-1"
    :expand="expand"
    item-key="user_display_name"
  >
    <template v-slot:items="props">
      <tr @click="props.expanded = !props.expanded">
        <td>
          <router-link
            class="link-item"
            :to="'/users/' + props.item.user_uuid"
          >{{ props.item.user_display_name }}</router-link>
        </td>
        <td>{{ props.item.user_email }}</td>
        <td><v-chip :color="roleColorizer(props.item.user_role)" text-color="white">{{ props.item.user_role.toUpperCase() }}</v-chip></td>
      </tr>
    </template>
    <template v-slot:expand="props">
      <v-card flat>
        <v-card-text>Username: {{ props.item.username }}</v-card-text>
        <v-card-text>User biography: {{ props.item.user_bio }}</v-card-text>
      </v-card>
    </template>
    <template v-slot:footer>
      <td :colspan="headers.length">
        <users-filter
          :minimal_users="minimal_users"
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
import UsersFilter from "./UsersFilter";
import { roleColorizer } from "@/utils.js"

export default {
  name: "UserList",
  components: {
    UsersFilter
  },
  props: {
    users: Array,
    minimal_users: Array
  },
  data() {
    return {
      isFilterShown: false,
      expand: false,
      headers: [
        {
          text: "Display Name",
          sortable: true,
          value: "display_name"
        },

        {
          text: "User Email",
          sortable: true,
          value: "user_email"
        },
        {
          text: "User Role",
          sortable: true,
          value: "user_role"
        }
      ]
    };
  },
  methods: {
    roleColorizer,
    handleFilterChange(filter) {
      this.$emit("handle-filter-change", filter);
    },
    handleFilterShown() {
      this.isFilterShown = !this.isFilterShown;
    }
  }
};
</script>