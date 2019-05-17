<template>
  <v-card>
    <v-layout row wrap>
      <v-flex xs12>
        <v-btn class="bg-primary white--text" @click="handleImportOrganization">Import Organization</v-btn>
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
  name: "OrganizationControlBox",
  props: {
    organizations: Array
  },
  data() {
    return {};
  },
  methods: {
    handleImportOrganization() {
      this.$emit("handle-import-organization");
    }
  }
};
</script>