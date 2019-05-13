<template>
  <v-card class="mb-2" :color="color">
    <v-card-title class="title">
      <span class="white--text">
        <v-icon class="white--text">folder</v-icon>Repository
      </span>
    </v-card-title>
    <v-card-text class="white text--primary">
      <b>{{ "GitHub: "}}</b>
      <a
        class="link-item"
        :href="repository.repository_git_url"
        target="_blank"
      >{{repository.repository_name}}</a>
      <br>
      <b>{{ "Remaining attempts: "}}</b>
      {{ this.attempts(repository) }}
      <br>
      <b>{{ "Status: "}}</b>
      <v-chip
        :color="statusColorizer(repository.repository_status)"
        text-color="white"
      >{{ repository.repository_status.toUpperCase() }}</v-chip>
      <br>

      <v-expansion-panel popout>
        <v-expansion-panel-content>
          <template v-slot:header>
            <div>
              <b>Description</b>
            </div>
          </template>
          <v-card>
            <v-card-text class="grey lighten-3">{{ repository.repository_description }}</v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-container>
        <v-layout>
          <v-flex xs6>
            <delete-repository :repository="repository" :handleDelete="handleDelete"/>
          </v-flex>
          <v-flex xs6>
            <reset-repository :repository="repository" :handleReset="handleReset"/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import DeleteRepository from "@/modules/repository/_component/DeleteRepository.vue";
import ResetRepository from "@/modules/repository/_component/ResetRepository";
import { statusColorizer } from "@/utils";

export default {
  name: "RepositoryCard",
  data() {
    return {};
  },
  props: {
    repository: Object,
    color: String,
  },
  components: {
    DeleteRepository,
    ResetRepository
  },
  methods: {
    statusColorizer,
    handleDelete(repository) {
      this.$emit("handle-delete", repository);
    },
    handleReset() {
      this.$emit("handle-reset");
    },
    attempts(repository) {
      if (repository.unlimited) {
        return "Unlimited";
      } else if (repository.try_count == undefined) {
        return 0;
      } else {
        return repository.try_count;
      }
    }
  }
};
</script>