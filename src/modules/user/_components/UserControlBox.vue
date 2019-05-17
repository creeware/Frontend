<template>
  <v-card>
    <v-layout row wrap>
      <v-flex xs12 sm6>
        <v-btn class="bg-primary white--text" @click="handleInviteUser">Invite User</v-btn>
        <v-btn
          class="bg-grey link-item white--text"
          href="https://github.com/"
          target="_blank"
        >Go to Github</v-btn>
      </v-flex>
    </v-layout>
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