<template>
  <v-layout row justify-center>
    <v-dialog v-model="modalOpen" persistent max-width="50vw">
      <v-card>
        <v-card-title class="headline">Integrate Canvas</v-card-title>

        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container fluid grid-list-lg>
            <v-text-field
              v-model="payload.canvas_access_token"
              :rules="accessTokenRules"
              label="Access Token"
              required
            ></v-text-field>

            <v-text-field
              v-model="payload.canvas_base_url"
              :placeholder="'https://<institute>.instructure.com'"
              :rules="baseUrlRules"
              label="Base URL"
              required
            ></v-text-field>
          </v-container>
          <v-divider light></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="grey darken-1" @click="handleIntegrateCanvasAccount">Cancel</v-btn>
            <v-btn color="cyan darken-1" @click="handleCanvasIntegration" :disabled="!valid">Submit</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  name: "IntegrateCanvas",
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
        canvas_access_token: undefined,
        canvas_base_url: undefined
      },
      valid: true,
      name: "",
      accessTokenRules: [
        v => !!v || "Access token is required",
      ],
      baseUrlRules: [
        v => !!v || "Base url is required",
      ]
    };
  },
  methods: {
    handleIntegrateCanvasAccount() {
      this.modalOpen = false;
      this.$emit("handle-integrate-canvas");
    },
    handleCanvasIntegration() {
      if (this.$refs.form.validate()) {
        this.$emit("handle-canvas-integration", this.payload);
        this.handleIntegrateCanvasAccount();
      }
    }
  }
};
</script>


<style scoped>
</style>
