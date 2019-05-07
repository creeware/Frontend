<template>
  <v-card class="white--text gugi-text">
    <v-container fluid grid-list-lg>
      <v-layout align-center justify-center row fill-height>
        <v-flex xs12>
          <v-card flat>
            <v-card-title>
              <h4>{{ "Latest Organization" }}</h4>
            </v-card-title>
            <v-divider></v-divider>
            <v-list dense>
              <v-list-tile>
                <v-list-tile-content>Name:</v-list-tile-content>
                <v-list-tile-content class="align-end">
                  <router-link
                    class="link-item"
                    :to="'/organizations/' + organization.organization_uuid"
                  >{{ organization.organization_name }}</router-link>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile v-if="organization.company_name">
                <v-list-tile-content>Company Name:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ organization.company_name }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Repository Count:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ organization.repository_count }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content class="align-end">
                  <v-btn
                    class="bg-primary link-item white--text"
                    :href="organization.organization_git_url"
                    target="_blank"
                    small
                  >Go to Github</v-btn>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "LatestOrganization",
  mounted() {},
  computed: {},
  props: {
    organization: undefined
  },
  data() {
    return {};
  },
  methods: {}
};
</script>


<style scoped>
</style>
