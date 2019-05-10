<template>
  <v-card>
    <v-container>
      <v-layout row wrap>
        <v-flex xs6>
          <v-slider
            v-model="first"
            :max="total"
            label="SOLVED"
            readonly
            thumb-label="always"
            inverse-label
          ></v-slider>
        </v-flex>
        <v-flex xs6>
          <v-slider
            v-model="second"
            :max="total"
            label="FAILED"
            readonly
            thumb-label="always"
            inverse-label
          ></v-slider>
        </v-flex>
        <v-flex xs6>
          <v-slider
            v-model="third"
            :max="total"
            label="RESET"
            readonly
            thumb-label="always"
            inverse-label
          ></v-slider>
        </v-flex>
        <v-flex xs6>
          <v-slider
            v-model="fourth"
            :max="total"
            label="RELEASED"
            readonly
            thumb-label="always"
            inverse-label
          ></v-slider>
        </v-flex>
        <v-flex xs12>
          <v-slider
            v-model="fifth"
            :max="total"
            label="UNRELEASED"
            readonly
            thumb-label="always"
            inverse-label
          ></v-slider>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "RepositoryChart",
  props: {},
  data() {
    return {
      total: 100,
      first: 5,
      second: 10,
      third: 15,
      fourth: 20,
      fifth: 50
    };
  }
};
</script>

