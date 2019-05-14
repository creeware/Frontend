<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="290">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Delete Repository</v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">Are you sure you want to delete this repository?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="primary" @click="handleDelete(repository.repository_uuid)">YES</v-btn>
          <v-btn class="error" flat @click="dialog = false">NO</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  name: "DeleteRepository",
  data() {
    return {
      dialog: false
    };
  },
  props: {
    repository: Object,
    handleDelete: Function
  },
  methods: {}
};
</script>
