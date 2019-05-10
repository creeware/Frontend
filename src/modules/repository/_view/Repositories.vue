<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs4>
        <repository-chart/>
      </v-flex>
      <v-flex xs8>
        <repository-control-box
          @handle-create-repository="handleCreateRepository"
          @handle-create-canvas-assignment="handleCreateCanvasAssignment"
        />
      </v-flex>
      <v-flex xs12>
        <repository-list
          :repositories="repositories"
          :minimal_users="minimal_users"
          :minimal_organizations="minimal_organizations"
          :minimal_repositories="minimal_repositories"
          @handle-filter-change="applyFilterChange"
        />
      </v-flex>
      <create-new-repository
        v-if="isCreateRepositoryOpen"
        :repositoriesLoading="repositoriesLoading"
        :profile="profile"
        :isModalOpen="isCreateRepositoryOpen"
        :minimal_users="minimal_users"
        :minimal_organizations="minimal_organizations"
        :solution_repositories="solution_repositories"
        :template_repositories="template_repositories"
        @handle-filter-change="handleFilterChange"
        @handle-create-repository="handleCreateRepository"
        @handle-create-new-repository="createNewRepository"
      />
      <create-new-canvas-assignment
        v-if="isCreateCanvasAssignmentOpen"
        :isDialogOpen="isCreateCanvasAssignmentOpen"
        :repositoriesLoading="repositoriesLoading"
        :profile="profile"
        :minimal_users="minimal_users"
        :minimal_organizations="minimal_organizations"
        :solution_repositories="solution_repositories"
        :template_repositories="template_repositories"
        :canvas_courses="canvas_courses"
        :canvas_students="canvas_students"
        @handle-filter-change="handleFilterChange"
        @handle-canvas-filter-change="handleCanvasFilterChange"
        @handle-create-new-canvas-assignment="handleCreateNewAssignment"
        @handle-create-canvas-assignment="handleCreateCanvasAssignment"
      />
    </v-layout>
  </v-container>
</template>

<script>
/* eslint-disable no-undef */
import RepositoryList from "../_component/RepositoryList";
import CreateNewRepository from "../_component/CreateNewRepository";
import RepositoryControlBox from "../_component/RepositoryControlBox";
import RepositoryChart from "../_component/RepositoryChart";
import { mapState, mapActions } from "vuex";
import CreateNewCanvasAssignment from "../_component/CreateNewCanvasAssignment";
import store from "@/store";

export default {
  name: "Repositories",
  beforeMount() {
    store.dispatch("getRepositories", this.params).then(() => {
      store.dispatch("getMinimalRepositories").then(() => {
        store.dispatch("getMinimalOrganizations").then(() => {
          store.dispatch("getMinimalUsers").then(() => {
            if (this.profile.canvas_access_token) {
              store.dispatch("getCanvasCourses", this.profile.user_uuid);
            }
            this.isListLoading = false;
          });
        });
      });
    });
  },
  computed: mapState({
    profile: state => state.authentication.profile,
    repositories: state => state.repository.repositories,
    solution_repositories: state => state.repository.solution_repositories,
    template_repositories: state => state.repository.template_repositories,
    minimal_users: state => state.user.minimal_users,
    minimal_organizations: state => state.organization.minimal_organizations,
    minimal_repositories: state => state.repository.minimal_repositories,
    canvas_courses: state => state.repository.canvas_courses,
    canvas_students: state => state.repository.canvas_students
  }),
  data() {
    return {
      isListLoading: false,
      repositoriesLoading: false,
      isCreateRepositoryOpen: false,
      isCreateCanvasAssignmentOpen: false,
      params: {
        filter: undefined
      }
    };
  },
  components: {
    RepositoryList,
    RepositoryControlBox,
    CreateNewRepository,
    CreateNewCanvasAssignment,
    RepositoryChart
  },
  methods: {
    ...mapActions([
      "getRepositories",
      "getTemplateRepositories",
      "getSolutionRepositories",
      "createRepository",
      "createNewCanvasRepository",
      "getCanvasCourses",
      "getCanvasStudents",
      "createCanvasRepository"
    ]),
    handleFilterChange(solutionFilter, templateFilter) {
      this.repositoriesLoading = true;
      this.getSolutionRepositories(solutionFilter).then(() => {
        this.getTemplateRepositories(templateFilter).then(() => {
          this.repositoriesLoading = false;
        });
      });
    },
    handleCanvasFilterChange(studentsFilter) {
      this.repositoriesLoading = true;
      this.getCanvasStudents(studentsFilter).then(() => {
        EventBus.$emit("students-loaded");
        this.repositoriesLoading = false;
      });
    },
    applyFilterChange(filter) {
      this.$emit("handle-filter-change", filter);
      this.getRepositories(filter);
    },
    handleCreateRepository() {
      this.isCreateRepositoryOpen = !this.isCreateRepositoryOpen;
    },
    createNewRepository(repository) {
      this.createRepository(repository);
    },
    handleCreateCanvasAssignment() {
      this.isCreateCanvasAssignmentOpen = !this.isCreateCanvasAssignmentOpen;
    },
    handleCreateNewAssignment(repository) {
      this.createCanvasRepository(repository);
    }
  }
};
</script>


<style scoped>
</style>
