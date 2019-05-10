<template>
  <v-layout row justify-center>
    <v-dialog v-model="modalOpen" persistent max-width="50vw">
      <v-card>
        <v-card-title class="headline">Edit Profile</v-card-title>

        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container fluid grid-list-lg>
            <v-text-field
              v-model="updatedProfile.user_display_name"
              :placeholder="profile.user_display_name"
              :counter="10"
              :rules="nameRules"
              label="Display Name"
              required
            ></v-text-field>

            <v-text-field
              v-model="updatedProfile.user_email"
              :placeholder="profile.user_email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
          </v-container>
          <v-divider light></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="grey darken-1" @click="handleEditProfile">Cancel</v-btn>
            <v-btn color="cyan darken-1" @click="updateProfile" :disabled="!valid">Submit</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  name: "EditProfile",
  mounted() {
    this.modalOpen = this.isModalOpen;
    this.updatedProfile = { ...this.profile };
  },
  computed: {},
  props: {
    isModalOpen: Boolean,
    profile: {
      user_display_name: undefined,
      user_email: undefined
    }
  },
  data() {
    return {
      modalOpen: false,
      updatedProfile: {
        user_display_name: undefined,
        user_email: undefined
      },
      valid: true,
      name: "",
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 10) || "Name must be less than 10 characters"
      ],
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ]
    };
  },
  methods: {
    handleEditProfile() {
      this.modalOpen = false;
      this.$emit("handle-edit-profile");
    },
    updateProfile() {
      if (this.$refs.form.validate()) {
        this.$emit("update-profile", this.updatedProfile);
        this.handleEditProfile();
      }
    }
  }
};
</script>


<style scoped>
</style>
