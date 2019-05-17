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
        >{{ repository.repository_name }}</a>
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
        <v-container fluid>
          <v-layout row wrap align-center>
            <v-flex xs6>
              <v-select
                v-model="repository.repository_type"
                :items="repository_types"
                :label="repository.repository_type"
                persistent-hint
                single-line
              ></v-select>
            </v-flex>
            <v-flex xs6>
              <v-btn @click="handleChangeType" class="primary">APPLY</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
        <b>{{ "Remaining attempts: "}}</b>
        {{ this.attempts(repository) }}
        <br>
        <v-layout row wrap>
          <v-flex xs12>
            <b>{{ "Status: "}}</b>
            <v-chip
              :color="statusColorizer(repository.repository_status)"
              text-color="white"
            >{{ repository.repository_status.toUpperCase() }}</v-chip>
          </v-flex>
          <v-flex xs12 v-if="!changeAttempts">
            <b>{{ "Remaining attempts: "}}</b>
            {{ this.attempts(repository) }}
          </v-flex>
        </v-layout>
        <v-layout row wrap align-center v-if="isAdmin">
          <v-flex xs0 sm4 md4 lg4 xl4></v-flex>
          <v-flex v-if="changeAttempts" xs4>
            <v-text-field
              v-model="repository.try_count"
              label="Attempts"
              :value="repository.try_count"
              :disabled="repository.unlimited"
            ></v-text-field>
          </v-flex>
          <v-flex v-if="changeAttempts" xs4>
            <v-checkbox
              v-model="repository.unlimited"
              color="info"
              label="Unlimited"
              :value="repository.unlimited"
            ></v-checkbox>
          </v-flex>
          <v-flex xs0 sm4 md4 lg4 xl4></v-flex>
          <v-flex xs8 v-if="changeAttempts">
            <v-btn @click="applyChangedAttempts" color="primary">Update Attempts</v-btn>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn @click="changeAttempts=false" color="error" icon v-on="on">
                  <v-icon>close</v-icon>
                </v-btn>
              </template>
              <span>Close</span>
            </v-tooltip>
          </v-flex>
        </v-layout>
      </span>
      <br>

      <v-layout row wrap>
        <v-flex xs8>
          <v-textarea
            outline
            v-model="repository.repository_description"
            :readonly="!isEditable"
            label="Description"
          ></v-textarea>
        </v-flex>
        <v-flex xs4 v-if="isAdmin">
          <v-btn class="primary" @click="toggleEdit">{{ editButtonText }}</v-btn>
          <v-btn class="primary" @click="handleChangeDescription" v-if="isEditable">Apply</v-btn>
        </v-flex>
      </v-layout>

      <v-container v-if="isAdmin" >
        <v-layout row wrap align-center>
          <v-flex xs12 sm12 md12 lg4 xl4 v-if="isAdmin">
            <v-layout row justify-center>
              <v-btn @click="openChangeAttempts" color="primary">Change Attempts</v-btn>
            </v-layout>
          </v-flex>
          <v-flex xs12 sm6 md6 lg4 xl4 v-if="isAdmin">
            <delete-repository
              v-if="showButtons"
              :repository="repository"
              :handleDelete="handleDelete"
            />
          </v-flex>
          <v-flex xs12 sm6 md6 lg4 xl4 v-if="isAdmin">
            <reset-repository
              v-if="showButtons"
              :repository="repository"
              :handleReset="handleReset"
            />
          </v-flex>
          <v-flex xs12 v-if="!isAdmin">
            <reset-repository
              v-if="showButtons"
              :repository="repository"
              :handleReset="handleReset"
            />
            <git-hub-button v-if="!showButtons" :url="repository.repository_git_url"/>
          </v-flex>
        </v-layout>
        <git-hub-button v-if="!showButtons" :url="repository.repository_git_url"/>
      </v-container>
    </v-card-text>
    <v-snackbar v-model="snackbar" top :timeout="3000" color="info">
      Repository type has been changed!
      <v-btn flat @click="snackbar=false">Close</v-btn>
    </v-snackbar>
  </v-card>
</template>

<script>
import GitHubButton from "@/modules/repository/_component/GitHubButton.vue";
import DeleteRepository from "@/modules/repository/_component/DeleteRepository.vue";
import ResetRepository from "@/modules/repository/_component/ResetRepository";
import { statusColorizer } from "@/utils";

export default {
  name: "RepositoryCard",
  data() {
    return {
      repository_types: ["template", "solution", "challenge", "unspecified"],
      snackbar: false,
      isEditable: false,
      editButtonText: "Edit",
      changeAttempts: false,
      buttonText: "Change Attempts",
      isAdmin: false
    };
  },
  beforeMount(){
    this.checkIfAdmin();
  },
  props: {
    repository: Object,
    color: String,
    title: String,
    showButtons: Boolean,
    profile: Object
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
    },
    handleChangeType() {
      this.snackbar = true;
      this.$emit("handle-change", this.repository);
    },

    toggleEdit(){
      this.isEditable = !this.isEditable;
      if(this.isEditable){
        this.editButtonText = "Cancel"
      } else{
        this.editButtonText = "Edit"
      }
    },

    handleChangeDescription(){
      this.$emit("handle-change", this.repository)
      this.isEditable = false
    },
    
    handleChangeAttempts() {
      if (!this.changeAttempts) {
        this.changeAttempts = true;
        this.buttonText = "Update Attempts";
      } else {
        this.$emit("handle-change-attempts", this.repository);
        this.changeAttempts = false;
      }
    },
    openChangeAttempts() {
      this.changeAttempts = true;
      this.buttonText = "Update Attempts";
    },
    applyChangedAttempts() {
      this.$emit("handle-change-attempts", this.repository);
      this.changeAttempts = false;
    },
    checkIfAdmin(){
      if(this.profile.user_uuid === this.repository.repository_admin_uuid){
        this.isAdmin = true
      }
    }
  }
};
</script>