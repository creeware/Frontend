<template>
  <v-layout row justify-center>
    <v-dialog v-model="modalOpen" scrollable persistent max-width="50vw">
      <v-card>
        <v-card-title class="headline">Create a Challenge</v-card-title>
        <v-card-text style="height: 50vh;">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-container fluid grid-list-lg>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-container fluid grid-list-lg>
                  <v-layout row justify-center wrap>
                    <v-flex xs12>
                      <v-autocomplete
                        v-model="organization_uuid"
                        :disabled="repositoriesLoading"
                        :items="minimal_organizations"
                        @input="handleFilterChange"
                        outline
                        color="blue-grey lighten-2"
                        label="Select an Organization"
                        item-text="organization_name"
                        item-value="organization_uuid"
                      ></v-autocomplete>
                    </v-flex>
                    <v-progress-linear
                      :indeterminate="true"
                      v-if="repositoriesLoading"
                      height="15"
                      color="cyan darken-1"
                    ></v-progress-linear>
                    <v-flex xs6>
                      <v-autocomplete
                        v-model="payload.solution_repo_url"
                        :disabled="repositoriesLoading"
                        :items="solution_repositories"
                        outline
                        color="blue-grey lighten-2"
                        label="Select a Solution Repository"
                        item-text="repository_name"
                        item-value="repository_git_url"
                      ></v-autocomplete>
                    </v-flex>

                    <v-flex xs6>
                      <v-autocomplete
                        v-model="payload.repository_name"
                        :disabled="repositoriesLoading"
                        :items="template_repositories"
                        outline
                        color="blue-grey lighten-2"
                        label="Select a Template Repository"
                        item-text="repository_name"
                        item-value="repository_name"
                      ></v-autocomplete>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>

              <v-container fluid grid-list-lg>
                <v-layout row justify-center wrap>
                  <v-flex xs12>
                    <v-autocomplete
                      v-model="payload.user_names"
                      :items="minimal_users"
                      outline
                      chips
                      color="blue-grey darken-1"
                      label="Select"
                      item-text="user_display_name"
                      item-value="username"
                      multiple
                    >
                      <template v-slot:selection="data">
                        <v-chip
                          :selected="data.selected"
                          close
                          class="chip--select-multi"
                          @input="remove(data.item)"
                        >
                          <v-avatar>
                            <img :src="data.item.avatar_url">
                          </v-avatar>
                          {{ data.item.user_display_name }}
                        </v-chip>
                      </template>
                      <template v-slot:item="data">
                        <template>
                          <v-list-tile-avatar>
                            <img :src="data.item.avatar_url">
                          </v-list-tile-avatar>
                          <v-list-tile-content>
                            <v-list-tile-title v-html="data.item.user_display_name"></v-list-tile-title>
                          </v-list-tile-content>
                        </template>
                      </template>
                    </v-autocomplete>
                  </v-flex>
                  <v-flex xs12>
                    <v-textarea
                      v-model="payload.repository_description"
                      label="Description"
                      auto-grow
                      outline
                    ></v-textarea>
                  </v-flex>

                  <v-flex xs6>
                    <v-select
                      v-model="payload.challenge_type"
                      :items="challenge_types"
                      label="Challenge Type"
                      outline
                    ></v-select>
                    <!-- <v-container fluid> -->
                      <v-layout row wrap align-center>
                        <v-flex xs7>
                          <v-text-field v-model="payload.attempts" label="Attempts" :rules="rules.attempts"  :disabled="payload.unlimited"></v-text-field>
                        </v-flex>
                        <v-flex xs5>
                          <v-checkbox v-model="payload.unlimited" color="info" label="Unlimited Attempts"></v-checkbox>
                        </v-flex>
                      </v-layout>
                  </v-flex>

                  <v-flex xs6>
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
                          v-model="payload.release_date"
                          label="Release Date"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                          clearable
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        color="cyan darken-1"
                        v-model="payload.release_date"
                        scrollable
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                          flat
                          class="bg-primary white--text"
                          @click="isSubmissionDateModalOpen = false"
                        >Close</v-btn>
                      </v-date-picker>
                    </v-dialog>
                    <br>
                    <v-select
                      v-model="payload.challenge_type"
                      :items="challenge_types"
                      label="Challenge Type"
                      outline
                    ></v-select>
                  </v-flex>

                  <v-flex xs6>
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
                          v-model="payload.due_date"
                          label="Due Date"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                          clearable
                        ></v-text-field>
                      </template>
                      <v-date-picker color="cyan darken-1" v-model="payload.due_date" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn
                          flat
                          class="bg-primary white--text"
                          @click="isDueDateModalOpen = false"
                        >Close</v-btn>
                      </v-date-picker>
                    </v-dialog>

                    <v-layout row wrap align-center>
                      <v-flex xs7>
                        <v-text-field
                          v-model="payload.attempts"
                          label="Attempts"
                          :rules="rules.attempts"
                          :disabled="payload.unlimited"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs5>
                        <v-checkbox
                          v-model="payload.unlimited"
                          color="info"
                          label="Unlimited Attempts"
                        ></v-checkbox>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-container>
          </v-form>
        </v-card-text>
        <v-divider light></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-1" flat @click="handleCreateRepository">Cancel</v-btn>
          <v-btn color="cyan darken-1" flat @click="handleCreateNewRepository">Submit</v-btn>
        </v-card-actions>
      </v-card>
      <!-- <v-snackbar v-model="snackbar" color="error">You need to specify a number of attempts or unlimited!<v-btn @click="snackbar=false" color="white" flat>Close</v-btn></v-snackbar> -->
    </v-dialog>
    <v-snackbar color="error" v-model="snackbar">
      Specify number of attempts or check unlimited box!
      <v-btn @click="snackbar=false" flat color="white">Close</v-btn>
    </v-snackbar>
  </v-layout>
</template>

<script>
export default {
  name: "CreateNewRepository",
  mounted() {
    this.modalOpen = this.isModalOpen;
  },
  computed: {},
  props: {
    isModalOpen: Boolean,
    repositoriesLoading: Boolean,
    minimal_users: Array,
    minimal_organizations: Array,
    solution_repositories: Array,
    template_repositories: Array,
    profile: Object
  },
  data() {
    return {
      importedRepositories: Array,
      types: ["solution", "template"],
      challenge_types: ["structure-diff"],
      indexStep: 1,
      modalOpen: false,
      organization_name: "",
      valid: true,
      isSubmissionDateModalOpen: false,
      isDueDateModalOpen: false,
      name: "",
      nameRules: [v => !!v || "Name is required"],
      organization_uuid: undefined,
      rules: {
        attempts: [
          v => !isNaN(v) || "Value must be integer or check unlimited",
          v => !!v || "Specify value or check unlimited"
        ]
      },
      templateFilter: {
        repository_type: "template",
        organization_uuid: undefined
      },
      solutionFilter: {
        repository_type: "solution",
        organization_uuid: undefined
      },
      payload: {
        repository_name: "",
        organization_name: "",
        user_names: [],
        solution_repo_url: "",
        release_date: "",
        due_date: "",
        admin_user_name: this.profile.username,
        client_name: "GitHubClient",
        challenge_type: "",
        repository_description: "",
        attempts: "",
        unlimited: true
      },
      snackbar: false
    };
  },
  methods: {
    handleFilterChange() {
      this.solutionFilter.organization_uuid = this.organization_uuid;
      this.templateFilter.organization_uuid = this.organization_uuid;
      const result = this.minimal_organizations.filter(
        organization => organization.organization_uuid == this.organization_uuid
      );
      this.payload.organization_name = result[0].organization_name;
      this.$emit(
        "handle-filter-change",
        this.solutionFilter,
        this.templateFilter
      );
    },
    handleCreateRepository() {
      this.modalOpen = false;
      this.$emit("handle-create-repository");
    },
    handleStatusChange(index) {
      this.$emit("handle-update-repository", this.imported_repositories[index]);
    },
    remove(item) {
      const index = this.payload.user_names.indexOf(item.username);
      if (index >= 0) this.payload.user_names.splice(index, 1);
    },
    handleCreateNewRepository() {
      if (!this.payload.unlimited && isNaN(this.payload.attempts)) {
        this.snackbar = true;
      } else {
        this.modalOpen = false;
        this.$emit("handle-create-new-repository", this.payload);
      }
    }
  }
};
</script>


<style scoped>
</style>
