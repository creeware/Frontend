<template>
  <v-card color="white" class="black--text gugi-text" >
    <v-container grid-list-md>
      <v-layout align-center justify-center row fill-height>
        <v-flex xs7>
          <v-card-title primary-title>
            <div>
              <div class="headline">{{ profile.user_display_name }}</div>
              <div>{{ profile.username }}</div>
              <div>{{ profile.user_email }}</div>
            </div>
          </v-card-title>
        </v-flex>
        <v-flex xs5>
          <v-img :src="profile.avatar_url" :lazy-src="profile.avatar_url" height="125px" contain>
            <template v-slot:placeholder>
              <v-layout fill-height align-center justify-center ma-0>
                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
              </v-layout>
            </template>
          </v-img>
        </v-flex>
      </v-layout>
      <div v-if="showButtons">
      <v-divider light></v-divider>
      <v-card-actions class="pa-3" v>
        <v-layout row wrap>
          <v-flex v-if="this.profile.user_role != 'student'" xs12 sm8 md12 lg8 xl8>
            <v-btn
              @click="handleIntegrateCanvasAccount"
              class="bg-danger white--text roboto-text"
              small
            >{{ this.profile.user_role === 'teacher' ? 'Refresh Canvas token': 'Integrate Canvas' }}</v-btn>
          </v-flex>
          <v-flex xs12 sm4 md12 lg4 xl4>
            <v-btn
              @click="handleEditProfile"
              class="bg-primary white--text roboto-text"
              small
            >Edit Profile</v-btn>
          </v-flex>
          <v-flex v-if="this.profile.user_role === 'user'" xs12 sm8 md12 lg8 xl8>
            <v-btn
              @click="handleAcceptCanvasInvitation"
              class="bg-primary white--text roboto-text"
              small
            >Canvas Invitation</v-btn>
          </v-flex>
          <v-flex v-if="this.profile.user_role === 'user'" xs12 sm4 md12 lg4 xl4>
            <v-btn @click="handleLogout" class="bg-primary white--text roboto-text" small>Logout</v-btn>
          </v-flex>
        </v-layout>
      </v-card-actions>
      </div>
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
    },
    showButtons: false
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
