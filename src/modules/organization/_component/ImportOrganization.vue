<template>
  <v-layout row justify-center>
    <v-dialog v-model="modalOpen" scrollable persistent max-width="50vw">
      <v-card>
        <v-card-title class="headline">
          <v-container fluid grid-list-lg>
          <v-stepper v-model="indexStep">
          <v-stepper-header>
                  <v-stepper-step
                    color="cyan darken-1"
                    :complete="indexStep > 1"
                    step="1"
                  >Import Organization</v-stepper-step>

                  <v-divider></v-divider>

                  <v-stepper-step
                    color="cyan darken-1"
                    :complete="indexStep > 2"
                    step="2"
                  >Integrate Repositories</v-stepper-step>
                </v-stepper-header>
          </v-stepper>
          </v-container>
          </v-card-title>
        <v-card-text style="height: 50vh;">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-container fluid grid-list-lg>
              <v-stepper v-model="indexStep">
                

                <v-stepper-items flat>
                  <v-stepper-content step="1" flat>
                    <v-text-field
                      color="grey darken-1"
                      v-model="organization_name"
                      placeholder="Please write the organization name"
                      :rules="nameRules"
                      label="Organization Name"
                      required
                    ></v-text-field>
                  </v-stepper-content>

                  <v-stepper-content step="2">
                    <v-progress-linear
                      :indeterminate="true"
                      v-if="importLoading"
                      height="15"
                      color="cyan darken-1"
                    ></v-progress-linear>

                    <v-list dense>
                      <v-list-tile
                        v-for="(repository, index) in imported_repositories"
                        v-bind:key="repository.repository_uuid"
                        style="margin-bottom: 20px;"
                      >
                        <v-layout row justify-center>
                          <v-flex xs12 sm6 d-flex>
                            <v-list-tile-content>{{ repository.repository_name }}</v-list-tile-content>
                          </v-flex>
                          <v-flex xs12 sm6 d-flex>
                            <v-select
                              color="grey darken-1"
                              :items="types"
                              v-model="repository.repository_type"
                              @change="handleStatusChange(index)"
                              label="Repository Type"
                              solo
                            ></v-select>
                          </v-flex>
                        </v-layout>
                      </v-list-tile>
                    </v-list>
                  </v-stepper-content>
                </v-stepper-items>
              </v-stepper>
            </v-container>
          </v-form>
        </v-card-text>
        <v-divider light></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            v-if="indexStep == 1"
            color="grey darken-1"
            flat
            @click="handleImportOganization"
          >Cancel</v-btn>
          <v-btn
            v-if="indexStep == 1"
            class="bg-primary white--text"
            @click="importTheOrganization"
            :disabled="!valid"
          >Continue</v-btn>
          <v-btn
            v-if="indexStep == 2"
            color="cyan darken-1"
            flat
            @click="handleImportOganization"
          >Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  name: "ImportOrganization",
  mounted() {
    this.modalOpen = this.isModalOpen;
  },
  computed: {},
  props: {
    isModalOpen: Boolean,
    importLoading: Boolean,
    imported_repositories: Array
  },
  data() {
    return {
      importedRepositories: Array,
      types: ["solution", "template"],
      indexStep: 1,
      modalOpen: false,
      organization_name: "",
      valid: true,
      name: "",
      nameRules: [v => !!v || "Name is required"]
    };
  },
  methods: {
    handleImportOganization() {
      this.modalOpen = false;
      this.$emit("handle-import-organization");
    },
    importTheOrganization() {
      if (this.$refs.form.validate()) {
        this.$emit("import-organization", this.organization_name);
        this.indexStep = 2;
      }
    },
    handleStatusChange(index) {
      this.$emit("handle-update-repository", this.imported_repositories[index]);
    }
  }
};
</script>


<style scoped>
</style>
