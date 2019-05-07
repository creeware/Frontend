<template>
  <v-card class="white--text gugi-text">
    <v-container fluid grid-list-lg>
      <v-layout align-center justify-center row fill-height>
        <v-flex xs4>
          <v-progress-circular
            style="margin auto;"
            rotate="180"
            color="green accent-4"
            size="100"
            :value="progress"
          ></v-progress-circular>
        </v-flex>

        <v-flex xs8>
          <v-layout column>
            <v-flex xs6>
              <v-list two-line subheader>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ "Solved Repositories" }}</v-list-tile-title>
                    <v-list-tile-sub-title>{{ profile_statistics.solvedRepositories }}</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ "Unsolved Repositories" }}</v-list-tile-title>
                    <v-list-tile-sub-title>{{ profile_statistics.unsolvedRepositories }}</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ "Total" }}</v-list-tile-title>
                    <v-list-tile-sub-title>{{ profile_statistics.totalRepositories }}</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "ProfileStatistics",
  mounted() {
    this.progress =
      (this.profile_statistics.solvedRepositories /
        this.profile_statistics.totalRepositories) *
      100;
  },
  computed: {},
  props: {
    profile_statistics: undefined
  },
  data() {
    return {
      progress: 0
    };
  },
  methods: {}
};
</script>


<style scoped>
</style>
