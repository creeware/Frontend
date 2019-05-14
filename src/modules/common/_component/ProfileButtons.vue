<template>
  <v-card color="white" class="black--text gugi-text">
    <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex v-if="this.profile.user_role != 'student'" xs8>
            <v-btn
              @click="handleIntegrateCanvasAccount"
              class="bg-danger white--text roboto-text"
              small
            >{{ this.profile.user_role === 'teacher' ? 'Refresh Canvas token': 'Integrate Canvas' }}</v-btn>
          </v-flex>
          <v-flex xs4>
            <v-btn
              @click="handleEditProfile"
              class="bg-primary white--text roboto-text"
              small
            >Edit Profile</v-btn>
          </v-flex>
          <v-flex v-if="this.profile.user_role === 'user'" xs8>
            <v-btn
              @click="handleAcceptCanvasInvitation"
              class="bg-primary white--text roboto-text"
              small
            >Canvas Invitation</v-btn>
          </v-flex>
          <v-flex v-if="this.profile.user_role === 'user'" xm4>
            <v-btn @click="handleLogout" class="bg-primary white--text roboto-text" small>Logout</v-btn>
          </v-flex>
        </v-layout>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "Profile",
  mounted() {},
  computed: {},
  props: {
    profile: {
      user_display_name: undefined,
      user_email: undefined
    }
  },
  methods: {
    handleEditProfile() {
      this.$emit("handle-edit-profile");
    },
    handleIntegrateCanvasAccount() {
      this.$emit("handle-integrate-canvas");
    },
    handleAcceptCanvasInvitation() {
      this.$emit("handle-accept-canvas-invitation");
    },
    handleLogout() {
      this.$emit("handle-logout");
    }
  }
};
</script>


<style scoped>
</style>
