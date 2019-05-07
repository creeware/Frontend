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
    </v-dialog>
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
      indexStep: 1,
      modalOpen: false,
      organization_name: "",
      valid: true,
      isSubmissionDateModalOpen: false,
      name: "",
      nameRules: [v => !!v || "Name is required"],
      organization_uuid: undefined,
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
        admin_user_name: this.profile.username,
        client_name: "GitHubClient"
      }
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
      console.log("lol");
      const index = this.payload.user_names.indexOf(item.username);
      if (index >= 0) this.payload.user_names.splice(index, 1);
    },
    handleCreateNewRepository(){
        this.modalOpen = false;
        this.$emit("handle-create-new-repository", this.payload);
    }
  }
};
</script>


<style scoped>
</style>
