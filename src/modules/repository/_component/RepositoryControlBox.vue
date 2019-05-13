<template>
  <v-card>
    <v-container fluid grid-list-lg>
      <v-layout row wrap>
        <v-flex v-if="this.profile.user_role === 'teacher'" xm4>
          <v-btn
            class="bg-danger white--text"
            @click="handleCreateCanvasAssignment"
          >Create a Canvas assignment</v-btn>
        </v-flex>

        <v-flex xm4>
          <v-btn class="bg-primary white--text" @click="handleCreateRepository">Create a Challenge</v-btn>
        </v-flex>

        <v-flex xm4>
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
  name: "RepositoryControlBox",
  props: {
    organizations: Array,
    profile: Object
  },
  data() {
    return {};
  },
  methods: {
    handleCreateRepository() {
      this.$emit("handle-create-repository");
    },
    handleCreateCanvasAssignment() {
      this.$emit("handle-create-canvas-assignment");
    }
  }
};
</script>