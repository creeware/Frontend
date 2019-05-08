<template>
  <!-- Main container -->
  <v-container grid-list-md roboto-text>
    <v-card>
      <v-layout row wrap>
        <v-flex md12 lg3 align-self-center>
          <!-- Profile picture container -->
          <v-layout column>
            <v-flex align-self-center>
              <v-card-text>
                <v-avatar size="16em" tile class="hidden-sm-and-down">
                  <v-img :src="profile.avatar_url" fit="cover"></v-img>
                </v-avatar>
                <v-avatar size="16em" class="hidden-md-and-up">
                  <v-img :src="profile.avatar_url" fit="cover"></v-img>
                </v-avatar>
              </v-card-text>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex md12 lg9>
          <!-- Profile info container -->
          <v-layout column>
            <v-flex>
              <v-card-text class="v-card-text-pl-fix">
                <h1 style="margin: 0;padding: 0 0 0 0.5em">{{profile.user_display_name}}</h1>
                <v-card-text>
                  <span>
                    <b>GitHub:</b>&#32;
                    <a
                      class="link-item"
                      :href="profile.profile_url"
                      target="_blank"
                    >{{profile.username}}</a>
                  </span>
                </v-card-text>
                <v-card-text>
                  <span>
                    <b>Email:</b>&#32;
                    <a
                      class="link-item"
                      :href="'mailto:' + profile.user_email"
                    >{{profile.user_email}}</a>
                  </span>
                </v-card-text>
                <v-card-text>
                  <span>
                    <b>Role:</b>
                    &#32;
                    {{profile.user_role}}
                  </span>
                </v-card-text>
                <v-card-text>
                  <span>
                    <b>Bio:</b>
                    &#32;
                    {{profile.user_bio}}
                  </span>
                </v-card-text>
              </v-card-text>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "UserProfile",
  props: {
    profile: Object
  }
};
</script>

<style>
@media (min-width: 1264px) {
  .v-card-text-pl-fix {
    padding-left: 0 !important;
    padding-right: 0 !important;
    margin-left: -1em;
  }
}
</style>