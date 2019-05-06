<template>
  <v-card flat>
    <v-container fluid grid-list-lg>
      <v-layout row wrap>
        <v-flex xs6>
          <v-autocomplete
            v-model="filter.organization_uuid"
            :disabled="isUpdating"
            :items="organizations"
            @change="handleFilterChange"
            outline
            chips
            color="blue-grey lighten-2"
            label="Select Organization"
            item-text="organization_name"
            item-value="organization_uuid"
            multiple
          >
            <template v-slot:selection="data">
              <v-chip
                :selected="data.selected"
                close
                class="chip--select-multi"
                @input="removeOrganization(data.item)"
              >{{ data.item.organization_name }}</v-chip>
            </template>
            <template v-slot:item="data">
              <v-list-tile-content>
                <v-list-tile-title v-html="data.item.organization_name"></v-list-tile-title>
              </v-list-tile-content>
            </template>
          </v-autocomplete>
        </v-flex>

        <v-flex xs6>
          <v-autocomplete
            v-model="filter.user_uuid"
            :disabled="isUpdating"
            :items="minimal_users"
            @change="handleFilterChange"
            outline
            chips
            color="blue-grey lighten-2"
            label="Select Organization Admin"
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
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "OrganizationsFilter",
  props: {
    organizations: Array,
    minimal_users: Array
  },
  data() {
    return {
      autoUpdate: true,
      isUpdating: false,
      filter: {
        organization_uuid: [],
        user_uuid: []
      }
    };
  },
  methods: {
    handleFilterChange() {
      this.$emit("handle-filter-change", this.filter);
    },
    removeOrganization(item) {
      const index = this.filter.organization_uuid.indexOf(item.organization_uuid);
      if (index >= 0) this.filter.organization_uuid.splice(index, 1);
      this.handleFilterChange();
    },
    removeUser(item) {
      const index = this.filter.user_uuid.indexOf(item.user_uuid);
      if (index >= 0) this.filter.user_uuid.splice(index, 1);
      this.handleFilterChange();
    }
  }
};
</script>