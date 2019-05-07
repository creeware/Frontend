<template>
  <v-layout row justify-center>
    <v-dialog v-model="modalOpen" scrollable persistent max-width="40vw">
      <v-card>
        <v-card-title class="headline">Invite User</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-container fluid grid-list-lg>
              <v-text-field
                color="grey darken-1"
                v-model="payload.email"
                :rules="emailRules"
                label="User E-mail"
                required
              ></v-text-field>
            </v-container>
          </v-form>
        </v-card-text>
        <v-divider light></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-1" flat @click="handleInviteUser">Cancel</v-btn>
          <v-btn class="bg-primary white--text" @click="inviteNewUser" :disabled="!valid">Invite</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  name: "InviteUser",
  mounted() {
    this.modalOpen = this.isModalOpen;
  },
  computed: {},
  props: {
    isModalOpen: Boolean
  },
  data() {
    return {
      indexStep: 1,
      modalOpen: false,
      valid: true,
      payload: {
        email: ""
      },
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ]
    };
  },
  methods: {
    handleInviteUser() {
      this.modalOpen = false;
      this.$emit("handle-invite-user");
    },
    inviteNewUser() {
      if (this.$refs.form.validate()) {
        this.modalOpen = false;
        this.$emit("invite-user", this.payload);
      }
    }
  }
};
</script>


<style scoped>
</style>
