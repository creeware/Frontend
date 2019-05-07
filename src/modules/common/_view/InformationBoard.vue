<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs4>
        <profile :profile="profile" @handle-edit-profile="handleEditProfile"/>
        <edit-profile
          v-if="isEditProfileOpen"
          :profile="profile"
          :isModalOpen="isEditProfileOpen"
          @update-profile="handleUpdateProfile"
          @handle-edit-profile="handleEditProfile"
        />
      </v-flex>
      <v-flex xs4>
        <profile-statistics :profile_statistics="profile_statistics"/>
      </v-flex>
      <v-flex xs4>
        <latest-organization :organization="profile_statistics.latestOrganization"/>
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

import { mapState, mapActions } from "vuex";
import store from "@/store";

export default {
  name: "InformationBoard",
  mounted() {},
  data() {
    return {
      isEditProfileOpen: false
    };
  },
  components: {
    Profile,
    EditProfile,
    ProfileStatistics,
    DueDateClosingRepositoriesList,
    LatestOrganization
  },
  computed: mapState({
    profile: state => state.authentication.profile,
    profile_statistics: state => state.authentication.profile_statistics
  }),
  methods: {
    ...mapActions(["updateProfile"]),
    handleEditProfile() {
      this.isEditProfileOpen = !this.isEditProfileOpen;
    },
    handleUpdateProfile(updatedProfile) {
      this.updateProfile(updatedProfile);
    }
  }
};
</script>


<style scoped>
</style>
