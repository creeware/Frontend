<template>
  <v-layout>
    <v-flex xs6 class="ma-1">
      <repository-card
        v-if="orgLoaded&&userLoaded"
        :repository="repository"
        :color="repositoryColor"
        @handle-delete="handleDelete"
        @handle-reset="handleReset"
      />
      <user-card v-if="userLoaded&&orgLoaded" :user="user" :color="userColor"/>
      <organization-card
        v-if="orgLoaded&&userLoaded"
        :organization="organization"
        :color="organizationColor"
      />
    </v-flex>
    <!--         <v-flex xs4 class="ma-2">
            <repo :repository="repository" />
    </v-flex>-->
    <v-flex xs5 class="ma-1">
      <repository-timeline v-if="orgLoaded&&userLoaded" :repository="repository"/>
    </v-flex>
    <v-snackbar v-model="snackbar" top :timeout="10000" :color="snackbarColor">
      {{snackbarMessage}}
      <v-btn color="black" flat @click="snackbar=false">Close</v-btn>
    </v-snackbar>
  </v-layout>
  <!--  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="Repository Information" name="first">Repository Information</el-tab-pane>
    <el-tab-pane label="Organization Information" name="second">Organization Information</el-tab-pane>
    <el-tab-pane label="Owner Information" name="third">Owner Information</el-tab-pane>
    
    <el-tab-pane label="Delete Repository" name="fourth">
        <el-popover
            placement="top"
            width="160"
            v-model="visible2">
            <p>Are you sure to delete this?</p>
            <div style="text-align: right; margin: 0">
                <el-button size="mini" type="primary" @click="handleDelete">YES</el-button>
                <el-button type="text" size="mini" @click="visible2 = false">NO</el-button>
            </div>
            <el-button slot="reference">Delete</el-button>
        </el-popover>
    </el-tab-pane>
    
  </el-tabs>-->
</template>

<script>
//import UserList from "@/modules/user/_components/UserList.vue"
import RepositoryCard from "@/modules/repository/_component/RepositoryCard.vue";
import RepositoryTimeline from "@/modules/repository/_component/RepositoryTimeline.vue";
import OrganizationCard from "@/modules/repository/_component/OrganizationCard.vue";
import UserCard from "@/modules/repository/_component/UserCard.vue";
import { mapState } from "vuex";
import store from "@/store";
import { daysLeft } from "@/utils.js";
import { mapActions } from "vuex";

export default {
  name: "Repository",
  data() {
    return {
      visible2: false,
      class: "ma-2",
      orgLoaded: false,
      userLoaded: false,
      repoLoaded: false,
      userColor: "blue",
      repositoryColor: "red",
      organizationColor: "green",
      snackbar: false,
      snackbarMessage: "",
      snackbarColor: "",
      repositoryName: {
          repository_name: ""
      }
      /*                 repository: {
                    repository_uuid: "repo123",
                    repository_name: "Challenge",
                    repository_description: "This is a repository",
                    repository_git_url: "https://github.com/creeware/frontend",
                    repository_submission_date: undefined,
                    repository_status: "Not Completed",
                    release_date: "2019-05-06",
                    due_date: "2019-05-07",
                    user_name: "test_user",
                    try_count: undefined,
                    unlimited: true
                }, */
      // user: {
      //     user_uuid: "user123",
      //     user_display_name: "Pontus Asp",
      //     user_email: "poasp@kth.se",
      //     user_role: "Master",
      //     username: "Pontusblue",
      //     avatar_url: "https://avatars3.githubusercontent.com/u/18573650?s=400&v=4",
      //     profile_url: "https://github.com/",
      //     user_bio: "I am a user."
      // },
      /*                organization: {
                    organization_uuid: "org123",
                    organization_name: "Creeware",
                    company_name: "KTH",
                    organization_description: "This is an organization.",
                    organization_git_url: "https://github.com/creeware/frontend"
                } */
    };
  },
  beforeRouteEnter(to, from, next) {
    store.dispatch("getRepository", to.params.uuid).then(() => next());
  },
  mounted() {
    store
      .dispatch("getOrganization", this.repository.organization_uuid)
      .then(() => (this.$data.orgLoaded = true));
    store
      .dispatch("getUser", this.repository.user_uuid)
      .then(() => (this.$data.userLoaded = true));
    this.checkIfDue(new Date(this.repository.due_date));
  },
  computed: mapState({
    repository: state => state.repository.repository,
    user: state => state.user.user,
    organization: state => state.organization.organization
  }),
  methods: {
    ...mapActions(["deleteRepository", "getTemplateRepositories", "resetRepository"]),
    handleDelete(uuid) {
      this.deleteRepository(uuid);
      this.$router.replace("/repositories");
    },
    handleReset() {
        this.repositoryName.repository_name = this.repository.repository_name
        this.resetRepository(this.repositoryName)
    },
    daysLeft,
    checkIfDue(date) {
      var today = new Date();
      var daysLeft = this.daysLeft(today, date);
      if (
        date.getFullYear() == today.getFullYear() &&
        date.getMonth() == today.getMonth() &&
        date.getDate() == today.getDate()
      ) {
        this.snackbarMessage =
          "This " + this.repository.repository_type + " is due for today!";
        this.snackbarColor = "warning";
        this.snackbar = true;
      } else if (today > date) {
        this.snackbarMessage =
          "This " + this.repository.repository_type + " has expired!";
        this.snackbarColor = "error";
        this.snackbar = true;
      } else if (daysLeft <= 30) {
        this.snackbarMessage =
          "This " +
          this.repository.repository_type +
          " is due in " +
          daysLeft +
          " days!";
        this.snackbarColor = "info";
        this.snackbar = true;
      }
    }
  },
  components: {
    RepositoryCard,
    RepositoryTimeline,
    OrganizationCard,
    UserCard
  },
  props: {}
};
</script>