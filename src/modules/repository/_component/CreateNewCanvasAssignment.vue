<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialogOpen" scrollable persistent max-width="50vw">
      <v-card>
        <v-card-title class="headline">Create Canvas Assignment</v-card-title>
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

                    <v-flex xs6>
                      <v-text-field
                        v-model="payload.assignment_name"
                        label="Assignment Name"
                        :rules="nameFieldRules"
                        required
                        outline
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs6>
                      <v-autocomplete
                        v-model="payload.canvas_course_uuid"
                        :items="canvas_courses"
                        @input="handleCanvasFilterChange"
                        outline
                        color="blue-grey lighten-2"
                        label="Select an Course"
                        item-text="course_name"
                        item-value="course_id"
                      ></v-autocomplete>
                    </v-flex>

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

                    <v-flex xs12>
                      <v-textarea
                        v-model="payload.assignment_description"
                        label="Description"
                        outline
                        :rules="nameFieldRules"
                      ></v-textarea>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>

              <v-container fluid grid-list-lg>
                <v-layout row justify-center wrap>
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
                          v-model="payload.assignment_due_date"
                          label="Due Date"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                          clearable
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        color="cyan darken-1"
                        v-model="payload.assignment_due_date"
                        scrollable
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                          flat
                          class="bg-primary white--text"
                          @click="isDueDateModalOpen = false"
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
          <v-progress-linear
            :indeterminate="true"
            v-if="repositoriesLoading"
            height="15"
            color="cyan darken-1"
          ></v-progress-linear>
          <v-btn color="grey darken-1" flat @click="handleCloseDialog">Cancel</v-btn>
          <v-btn
            color="cyan darken-1"
            flat
            @click="handleCreateNewRepository"
            :disabled="repositoriesLoading"
          >Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
/* eslint-disable no-undef */
export default {
  name: "CreateNewRepository",
  mounted() {
    this.dialogOpen = this.isDialogOpen;
    EventBus.$on("students-loaded", this.handleStudentsLoaded);
  },
  computed: {},
  props: {
    isDialogOpen: Boolean,
    repositoriesLoading: Boolean,
    minimal_users: Array,
    minimal_organizations: Array,
    solution_repositories: Array,
    template_repositories: Array,
    profile: Object,
    canvas_students: Array,
    canvas_courses: Array
  },
  data() {
    return {
      importedRepositories: Array,
      types: ["solution", "template"],
      indexStep: 1,
      dialogOpen: false,
      organization_name: "",
      valid: true,
      isSubmissionDateModalOpen: false,
      isDueDateModalOpen: false,
      name: "",
      nameFieldRules: [v => !!v || "This is required"],
      organization_uuid: undefined,
      templateFilter: {
        repository_type: "template",
        organization_uuid: undefined
      },
      solutionFilter: {
        repository_type: "solution",
        organization_uuid: undefined
      },
      studentsFilter: {
        user_uuid: this.profile.user_uuid,
        course_uuid: this.course_uuid
      },
      payload: {
        user_uuid: this.profile.user_uuid,
        canvas_course_uuid: "",
        assignment_description: "",
        assignment_name: "",
        release_date: "",
        assignment_due_date: "",
        repository_name: "",
        organization_name: "",
        solution_repo_url: "",
        user_canvas_ids: this.canvas_students
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

    handleCanvasFilterChange() {
      this.studentsFilter.course_uuid = this.payload.canvas_course_uuid;

      this.$emit("handle-canvas-filter-change", this.studentsFilter);
    },

    handleCloseDialog() {
      this.dialogOpen = false;
      this.$emit("handle-create-canvas-assignment");
    },
    handleStatusChange(index) {
      this.$emit("handle-update-repository", this.imported_repositories[index]);
    },
    handleCreateNewRepository() {
      this.dialogOpen = false;
      this.$emit("handle-create-new-canvas-assignment", this.payload);
    },
    handleStudentsLoaded() {
      this.payload.user_canvas_ids = this.canvas_students.map(student => {
        return student.user_id;
      });
    }
  }
};
</script>


<style scoped>
</style>
