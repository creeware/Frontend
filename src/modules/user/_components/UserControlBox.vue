<template>
  <v-card>
    <v-container fluid grid-list-lg>
      <v-layout row wrap>
        <v-flex xm6>
          <v-btn
            class="bg-primary white--text"
            @click="handleInviteUser"
          >Invite User</v-btn>
        </v-flex>

        <v-flex xm6>
          <v-btn
            class="bg-grey link-item white--text"
            href="https://github.com/"
            target="_blank"
          >Go to Github</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "UserControlBox",
  data() {
    return {};
  },
  methods: {
    handleInviteUser() {
      this.$emit("handle-invite-user");
    }
  }
};
</script>