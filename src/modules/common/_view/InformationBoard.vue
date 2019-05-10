<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs4>
        <profile
          :profile="profile"
          @handle-edit-profile="handleEditProfile"
          @handle-integrate-canvas="handleIntegrateCanvasAccount"
          @handle-accept-canvas-invitation="handleAcceptCanvasInvitation"
        />
        <edit-profile
          v-if="isEditProfileOpen"
          :profile="profile"
          :isModalOpen="isEditProfileOpen"
          @update-profile="handleUpdateProfile"
          @handle-edit-profile="handleEditProfile"
        />

        <integrate-canvas
          v-if="isIntegrateCanvasOpen"
          :profile="profile"
          :isModalOpen="isIntegrateCanvasOpen"
          @handle-canvas-integration="handleCanvasIntegration"
          @handle-integrate-canvas="handleIntegrateCanvasAccount"
        />

        <accept-canvas
          v-if="isAcceptCanvasOpen"
          :profile="profile"
          :isModalOpen="isAcceptCanvasOpen"
          @handle-canvas-migration="handleCanvasMigration"
          @handle-accept-canvas="handleAcceptCanvasInvitation"
        />
      </v-flex>
      <v-flex xs4>
        <profile-statistics :profile_statistics="profile_statistics"/>
      </v-flex>
      <v-flex xs4>
        <latest-organization v-if="profile_statistics.latestOrganization" :organization="profile_statistics.latestOrganization"/>
      </v-flex>
      <v-flex xs12>
        <due-date-closing-repositories-list
          :repositories="profile_statistics.dueDateClosingRepositories"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Profile from "../_component/Profile";
import EditProfile from "../_component/EditProfile";
import ProfileStatistics from "../_component/ProfileStatistics";
import DueDateClosingRepositoriesList from "../_component/DueDateClosingRepositoriesList";
import LatestOrganization from "../_component/LatestOrganization";
import IntegrateCanvas from "../_component/IntegrateCanvas";
import AcceptCanvas from "../_component/AcceptCanvas";
import { mapState, mapActions } from "vuex";

export default {
  name: "InformationBoard",
  mounted() {},
  data() {
    return {
      isEditProfileOpen: false,
      isIntegrateCanvasOpen: false,
      isAcceptCanvasOpen: false
    };
  },
  components: {
    Profile,
    EditProfile,
    ProfileStatistics,
    DueDateClosingRepositoriesList,
    LatestOrganization,
    IntegrateCanvas,
    AcceptCanvas
  },
  computed: mapState({
    profile: state => state.authentication.profile,
    profile_statistics: state => state.authentication.profile_statistics
  }),
  methods: {
    ...mapActions(["updateProfile", "canvasIntegration", "canvasMigration"]),
    handleEditProfile() {
      this.isEditProfileOpen = !this.isEditProfileOpen;
    },
    handleUpdateProfile(updatedProfile) {
      this.updateProfile(updatedProfile);
    },
    handleIntegrateCanvasAccount() {
      this.isIntegrateCanvasOpen = !this.isIntegrateCanvasOpen;
    },
    handleCanvasIntegration(payload) {
      this.canvasIntegration(payload);
    },
    handleAcceptCanvasInvitation() {
      this.isAcceptCanvasOpen = !this.isAcceptCanvasOpen;
    },
    handleCanvasMigration(payload) {
      this.canvasMigration(payload);
    }
  }
};
</script>


<style scoped>
</style>
