<template>
  <v-container>
    <v-btn round class="bg-primary white--text" @click="dialog = true">Privacy Policy</v-btn>
    <v-layout row wrap justify-center>
      <v-flex xs12 sm12 md6 lg6 xl6>
        <v-dialog v-model="dialog" scrollable max-width="75vw">
          <v-card>
            <v-card-title>
              <h1>Privacy Policy for Team Powerline</h1>
            </v-card-title>
            <v-card-text>
              <privacy-text/>
            </v-card-text>
            <v-divider light></v-divider>
            <v-card-actions>
              <v-btn class="bg-danger white--text roboto-text" @click="dialog = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import PrivacyText from "@/modules/authentication/_component/PrivacyText.vue";

export default {
  name: "PrivacyPolicy",
  data() {
    return {
      dialog: false
    };
  },
  components: {
    PrivacyText
  }
};
</script>

