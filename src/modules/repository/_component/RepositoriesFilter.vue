<template>
  <v-card flat>
    <v-container v-if="isFilterShown" fluid grid-list-lg>
      <v-layout row wrap>
        <v-flex xs12>
          <v-layout row wrap>
            <v-flex xs6>
              <v-autocomplete
                v-model="filter.organization_uuid"
                :disabled="isUpdating"
                :items="minimal_organizations"
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
                label="Select Repository User"
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
              <v-select
                v-model="filter.repository_status"
                @change="handleFilterChange"
                :items="statuses"
                label="Status"
                outline
              ></v-select>
            </v-flex>
            <v-flex xs6>
              <v-select
                v-model="filter.repository_type"
                @change="handleFilterChange"
                :items="types"
                label="Type"
                outline
              ></v-select>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex xs12>
          <v-layout row wrap>
            <v-flex xs4>
              <v-dialog
                ref="dialog"
                v-model="isSubmissionDateModalOpen"
                persistent
                lazy
                full-width
                width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="filter.repository_submission_date"
                    @input="handleFilterChange"
                    label="Submission Date After"
                    prepend-icon="event"
                    readonly
                    v-on="on"
                    clearable
                  ></v-text-field>
                </template>
                <v-date-picker
                  color="cyan darken-1"
                  v-model="filter.repository_submission_date"
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn flat color="red darken-1" @click="isSubmissionDateModalOpen = false">Cancel</v-btn>
                  <v-btn flat class="bg-primary white--text" @click="handleFilterChange">OK</v-btn>
                </v-date-picker>
              </v-dialog>
            </v-flex>

            <v-flex xs4>
              <v-dialog
                ref="dialog"
                v-model="isDueDateModalOpen"
                persistent
                lazy
                full-width
                width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="filter.release_date"
                    @input="handleFilterChange"
                    label="Due Date After"
                    prepend-icon="event"
                    readonly
                    v-on="on"
                    clearable
                  ></v-text-field>
                </template>
                <v-date-picker color="cyan darken-1" v-model="filter.release_date" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn flat color="red darken-1" @click="isDueDateModalOpen = false">Cancel</v-btn>
                  <v-btn flat class="bg-primary white--text" @click="handleFilterChange">OK</v-btn>
                </v-date-picker>
              </v-dialog>
            </v-flex>

            <v-flex xs4>
              <v-dialog
                ref="dialog"
                v-model="isReleaseDateModalOpen"
                persistent
                lazy
                full-width
                width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="filter.due_date"
                    @input="handleFilterChange"
                    label="Release Date After"
                    prepend-icon="event"
                    readonly
                    v-on="on"
                    clearable
                  ></v-text-field>
                </template>
                <v-date-picker color="cyan darken-1" v-model="filter.due_date" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn flat color="red darken-1" @click="isReleaseDateModalOpen = false">Cancel</v-btn>
                  <v-btn flat class="bg-primary white--text" @click="handleFilterChange">OK</v-btn>
                </v-date-picker>
              </v-dialog>
            </v-flex>
          </v-layout>
          <v-flex xs6>
            <v-btn
              v-if="isButtonShown"
              class="bg-primary white--text"
              @click="handleClearFilter"
            >Clear Filter</v-btn>
          </v-flex>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "RepositoriesFilter",
  props: {
    organizations: Array,
    minimal_users: Array,
    minimal_repositories: Array,
    minimal_organizations: Array,
    isFilterShown: Boolean
  },
  data() {
    return {
      autoUpdate: true,
      isUpdating: false,
      isButtonShown: false,
      isSubmissionDateModalOpen: false,
      isDueDateModalOpen: false,
      isReleaseDateModalOpen: false,
      statuses: ["unreleased", "released", "solved", "unsolved" , "failed", "reset"],
      types: ["challenge", "solution", "template"],
      filter: {
        organization_uuid: [],
        user_uuid: [],
        repository_status: undefined,
        repository_type: undefined,
        repository_submission_date: undefined,
        release_date: undefined,
        due_date: undefined
      }
    };
  },
  methods: {
    handleFilterChange() {
      this.isSubmissionDateModalOpen = false;
      this.isDueDateModalOpen = false;
      this.isReleaseDateModalOpen = false;
      this.isButtonShown = true;
      this.$emit("handle-filter-change", this.filter);
    },
    handleClearFilter() {
      this.filter = {
        organization_uuid: [],
        user_uuid: [],
        repository_status: undefined,
        repository_type: undefined,
        repository_submission_date: undefined,
        release_date: undefined,
        due_date: undefined
      };
      this.isSubmissionDateModalOpen = false;
      this.isDueDateModalOpen = false;
      this.isReleaseDateModalOpen = false;
      this.isButtonShown = false;
      this.$emit("handle-filter-change", this.filter);
    },
    removeOrganization(item) {
      const index = this.filter.organization_uuid.indexOf(
        item.organization_uuid
      );
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