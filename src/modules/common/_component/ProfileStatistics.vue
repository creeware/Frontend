<template>
  <v-card class="gugi-text">
    <v-container fluid grid-list-lg>
      <v-layout align-center justify-center row fill-height>
        <v-flex xs6>
          <v-progress-circular
            style="margin auto;"
            rotate="180"
            color="green accent-4"
            size="100"
            :value="progress"
          ></v-progress-circular>
        </v-flex>

        <v-flex xs6>
          <v-layout column>
            <v-flex xs12>
              <v-card-text>
              Solved Repositories
              <br>
              {{ profile_statistics.solvedRepositories }}
              </v-card-text>
            </v-flex>
            <v-flex xs12>
              <v-card-text>
                Unsolved Repositories
                <br>
                {{ profile_statistics.unsolvedRepositories }}
              </v-card-text>
            </v-flex>
            <v-flex xs12>
              <v-card-text>
                Total
                <br>
                {{ profile_statistics.totalRepositories }}
              </v-card-text>
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
