<template>
  <v-card class="mb-2" :color="color">
    <v-card-title class="title">
      <span class="white--text">
        <v-icon class="white--text">folder</v-icon>
        {{ title }}
      </span>
    </v-card-title>
    <v-card-text class="white text--primary">
        <span v-if="!showButtons">
            <b>{{"Name: "}}</b>
            <a
            class="link-item"
            :href="repository.repository_uuid"
            target="_blank"
            >
            {{ repository.repository_name }}
            </a>
            <br>
        </span>
      <span v-if="showButtons">
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
      </span>
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
        <v-layout row wrap>
          <v-flex xs12 sm12 md6 lg6 xl6>
            <delete-repository
              v-if="showButtons"
              :repository="repository"
              :handleDelete="handleDelete"
            />
          </v-flex>
          <v-flex xs12 sm12 md6 lg6 xl6>
            <reset-repository
              v-if="showButtons"
              :repository="repository"
              :handleReset="handleReset"
            />
            <git-hub-button v-if="!showButtons" :url="repository.repository_git_url" />
 <!--            <v-btn
                
                flat 
                class="purple white--text" 
                :href="repository.repository_git_url"
                target="_blank">
                GitHub
            </v-btn> -->
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import GitHubButton from "@/modules/repository/_component/GitHubButton.vue"
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
    title: String,
    showButtons: Boolean
  },
  components: {
    DeleteRepository,
    ResetRepository,
    GitHubButton
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