<template>
  <v-layout row justify-center>
    <v-btn flat class="bg-grey white--text" :href="url" target="_blank">GitHub</v-btn>
  </v-layout>
</template>
<script>
export default {
  name: "GitHubButton",
  props: {
    url: String
  }
};
</script>
