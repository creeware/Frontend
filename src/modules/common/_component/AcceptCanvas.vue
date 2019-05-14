<template>
  <v-layout row justify-center>
    <v-dialog v-model="modalOpen" persistent max-width="50vw">
      <v-card>
        <v-card-title class="headline">Accept Canvas Integration</v-card-title>

        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container fluid grid-list-lg>
            <v-text-field
              v-model="payload.old_user_uuid"
              :rules="keyRules"
              label="Secret Key"
              required
            ></v-text-field>
          </v-container>
          <v-divider light></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="grey darken-1" @click="handleAcceptCanvasInvitation">Cancel</v-btn>
            <v-btn color="cyan darken-1" @click="handleCanvasMigration" :disabled="!valid">Submit</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  name: "AcceptCanvas",
  mounted() {
    this.modalOpen = this.isModalOpen;
  },
  computed: {},
  props: {
    isModalOpen: Boolean,
    profile: Object
  },
  data() {
    return {
      modalOpen: false,
      payload: {
        user_uuid: this.profile.user_uuid,
        old_user_uuid: undefined,
      },
      valid: true,
      keyRules: [
        v => !!v || "Access token is required",
      ]
    };
  },
  methods: {
    handleAcceptCanvasInvitation() {
      this.modalOpen = false;
      this.$emit("handle-accept-canvas");
    },
    handleCanvasMigration() {
      if (this.$refs.form.validate()) {
        this.$emit("handle-canvas-migration", this.payload);
        this.handleIntegrateCanvasAccount();
      }
    }
  }
};
</script>


<style scoped>
</style>
