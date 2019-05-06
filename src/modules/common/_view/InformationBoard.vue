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
    </v-layout>
  </v-container>
</template>

<script>
import Profile from "../_component/Profile";
import EditProfile from "../_component/EditProfile";
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
    EditProfile
  },
  computed: mapState({
    profile: state => state.authentication.profile
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
