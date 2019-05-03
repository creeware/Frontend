<template>
  <v-card color="white" class="black--text gugi-text">
    <v-layout row>
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
    <v-divider light></v-divider>
    <v-card-actions class="pa-3">
      <v-layout row wrap>
        <v-flex xs12 xm8 xl8>
      <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <div v-on="on">
              <v-btn class="bg-info roboto-text" small disabled>Integrate your Canvas account</v-btn>
              </div>
            </template>
            <span>Coming Soon!</span>
        </v-tooltip>
        </v-flex>
        <v-flex xs12 xm4 xl4>
        <v-btn @click="handleEditProfile" class="bg-primary white--text roboto-text" small>Edit Profile</v-btn>
        </v-flex>
        </v-layout>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "Profile",
  mounted() {},
  computed: {},
  props: {
    profile: undefined
  },
  methods: {
    handleEditProfile(){
     this.$emit("handle-edit-profile")
    }
  }
};
</script>


<style scoped>
</style>
