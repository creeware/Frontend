<template>
  <v-card flat>
    <v-container v-if="isFilterShown" fluid grid-list-lg>
      <v-layout row wrap>
        <v-flex xs6>
          <v-autocomplete
            v-model="filter.user_uuid"
            :disabled="isUpdating"
            :items="minimal_users"
            @input="handleFilterChange"
            outline
            chips
            color="blue-grey lighten-2"
            label="Select User"
            item-text="user_display_name"
            item-value="user_uuid"
            multiple
          >
            <template v-slot:selection="data">
              <v-chip
                :selected="data.selected"
                close
                class="chip--select-multi"
                @input="removeUser(data.item)"
              >{{ data.item.user_display_name }}</v-chip>
            </template>
            <template v-slot:item="data">
              <v-list-tile-content>
                <v-list-tile-title v-html="data.item.user_display_name"></v-list-tile-title>
              </v-list-tile-content>
            </template>
          </v-autocomplete>
        </v-flex>

        <v-flex xs6>
          <v-autocomplete
            v-model="filter.user_role"
            :disabled="isUpdating"
            :items="roles"
            @change="handleFilterChange"
            outline
            chips
            color="blue-grey lighten-2"
            label="Select Role"
            item-text="title"
            item-value="title"
            multiple
          >

          <template v-slot:selection="data">
              <v-chip
                :selected="data.selected"
                close
                class="chip--select-multi"
                @input="removeRole(data.item)"
              >{{ data.item.title }}</v-chip>
            </template>
            <template v-slot:item="data">
              <v-list-tile-content>
                <v-list-tile-title v-html="data.item.title"></v-list-tile-title>
              </v-list-tile-content>
            </template>
          </v-autocomplete>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "UsersFilter",
  props: {
    minimal_users: Array,
    isFilterShown: Boolean
  },
  data() {
    return {
      autoUpdate: true,
      isUpdating: false,
      filter: {
        user_uuid: [],
        user_role: []
      },
      roles: [{title: 'student'}, {title: 'admin'}, {title: 'teacher'}]
    };
  },
  methods: {
    handleFilterChange() {
      this.$emit("handle-filter-change", this.filter);
    },
    removeUser(item) {
      const index = this.filter.user_uuid.indexOf(item.user_uuid);
      if (index >= 0) this.filter.user_uuid.splice(index, 1);
      this.handleFilterChange();
    },
    removeRole(item) {
      const index = this.filter.user_role.indexOf(item.title);
      if (index >= 0) this.filter.user_role.splice(index, 1);
      this.handleFilterChange();
    }
  }
};
</script>