<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm12 md7 lg7 xl7 class="pa-1">
        <repository-card
          v-if="orgLoaded&&userLoaded"
          :repository="repository"
          :color="repositoryColor"
          @handle-delete="handleDelete"
          @handle-reset="handleReset"
          @handle-change="handleUpdate"
          title="Repository"
          showButtons
          @handle-change-attempts="handleChangeAttempts"
          :profile="profile"
          :isChallenge="isChallenge"
        />
        <user-card v-if="userLoaded&&orgLoaded&&isChallenge" :user="user" :color="userColor"/>
      </v-flex>
      <v-flex xs12 sm12 md5 lg5 xl5 class="pa-1">
        <user-card v-if="userLoaded&&orgLoaded&&!isChallenge" :user="user" :color="userColor"/>
        <organization-card
          v-if="orgLoaded&&userLoaded"
          :organization="organization"
          :color="organizationColor"
        />
        <repository-timeline v-if="orgLoaded&&userLoaded&&isChallenge" :repository="repository" />
      </v-flex>
      <v-snackbar v-model="snackbar" top :timeout="10000" :color="snackbarColor">
        {{snackbarMessage}}
        <v-btn color="black" flat @click="snackbar=false">Close</v-btn>
      </v-snackbar>
      <v-snackbar v-model="changesApplied" :timeout="5000" color="info">Attempts has been changed!<v-btn color="white" flat @click="changesApplied=false">Close</v-btn></v-snackbar>
    </v-layout>
  </v-container>
</template>

<script>
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
      isChallenge: false,
      repositoryName: {
        repository_name: ""
      },
      changesApplied: false
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
      .dispatch("getUser", this.repository.repository_admin_uuid)
      .then(() => (this.$data.userLoaded = true));
    this.checkIfChallenge()
  },
  computed: mapState({
    repository: state => state.repository.repository,
    user: state => state.user.user,
    organization: state => state.organization.organization,
    profile: state => state.authentication.profile
  }),
  methods: {
    ...mapActions(["deleteRepository", "resetRepository", "updateRepository"]),
    handleDelete(uuid) {
      this.deleteRepository(uuid);
      this.$router.replace("/repositories");
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
    },
    checkIfChallenge() {
      if (this.repository.repository_type === "challenge") {
        this.isChallenge = true;
      }
    },
    handleReset() {
      this.repositoryName.repository_name = this.repository.repository_name;
      this.resetRepository(this.repositoryName);
    },
    handleUpdate(repository) {
      this.updateRepository(repository);
    },
    handleChangeAttempts(repository){
      this.updateRepository(repository).then(() => (this.changesApplied = true))
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