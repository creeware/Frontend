<template>
  <!-- Main container -->
  <v-container grid-list-md roboto-text>
    <v-card>
      <v-layout row wrap>
        <v-flex xs12 md3 align-self-center>
          <!-- Profile picture container -->
          <v-layout column>
            <v-flex align-self-center>
              <v-card-text>
                <v-avatar size="16em" tile class="hidden-md-and-down">
                  <v-img :src="profile.avatar_url" fit="cover"></v-img>
                </v-avatar>
                <v-avatar size="16em" class="hidden-md-and-up">
                  <v-img :src="profile.avatar_url" fit="cover"></v-img>
                </v-avatar>
              </v-card-text>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex>
          <!-- Profile info container -->
          <v-layout column>
            <v-flex>
              <v-card-text>
              <h1 style="margin: 0;padding: 0 0 0 0.5em">{{profile.user_display_name}}</h1>
                <v-list subheader>
                  <v-list-tile>
                    <span>
                      <b>GitHub:</b>&#32;
                      <a
                        class="link-item"
                        :href="profile.profile_url"
                        target="_blank"
                      >{{profile.username}}</a>
                    </span>
                  </v-list-tile>
                  <v-list-tile>
                    <span>
                      <b>Email:</b>&#32;
                      <a
                        class="link-item"
                        :href="'mailto:' + profile.user_email"
                      >{{profile.user_email}}</a>
                    </span>
                  </v-list-tile>
                  <v-list-tile>
                    <span>
                      <b>Role:</b>
                      &#32;
                      {{profile.user_role}}
                    </span>
                  </v-list-tile>
                  <v-list-tile>
                    <span>
                      <b>Bio:</b>
                      &#32;
                      {{profile.user_bio}}
                    </span>
                  </v-list-tile>
                </v-list>
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