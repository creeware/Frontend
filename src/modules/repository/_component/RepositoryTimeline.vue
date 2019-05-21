<template>
  <v-flex xs12>
    <v-timeline dense>
      <v-timeline-item v-for="(item,i) in items" :key="i" :color="item.color" :icon="item.icon">
        <v-card :color="item.color">
          <v-card-title class="title">
            <span class="white--text">{{ item.title }}</span>
          </v-card-title>
          <v-card-text class="white text--primary">
            <v-layout row wrap justify-center>
              <v-flex xs12>
                <v-layout row justify-center>
                  <span class="subheading">{{ item.text }}</span>
                </v-layout>
              </v-flex>
              <v-flex xs12 v-if="i==0&&isAdmin">
                <v-layout row justify-center>
                  <v-btn small @click="handleReleaseOpen" class="primary">Change Release Date</v-btn>
                </v-layout>
                <v-dialog
                  ref="dialog"
                  v-model="isReleaseDateModalOpen"
                  persistent
                  lazy
                  full-width
                  width="290px"
                >
                  <v-date-picker v-model="releaseDate" color="cyan darken-1" scrollable>
                    <v-btn @click="isReleaseDateModalOpen=false" class="error" small>Close</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn @click="applyReleaseDate" class="primary" small>Apply</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-flex>
              <v-flex xs12 sm6 md12 lg6 xl6 v-if="i==2&&isAdmin">
                <v-layout row justify-center>
                  <v-btn @click="isDueDateModalOpen=true" class="primary" small>Change Due date</v-btn>
                  <v-dialog
                    ref="dialog"
                    v-model="isDueDateModalOpen"
                    persistent
                    lazy
                    full-width
                    width="290px"
                  >
                    <v-date-picker v-model="dueDate" color="cyan darken-1" scrollable>
                      <v-btn @click="isDueDateModalOpen=false" class="error" small>Close</v-btn>
                      <v-spacer></v-spacer>
                      <v-btn @click="applyDueDate" color="primary" small>Apply</v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
    <v-snackbar v-model="snackbar" :timeout="5000" :color="snackbarColor">{{snackbarMessage}}</v-snackbar>
  </v-flex>
</template>

<script>
import { getDate } from "@/utils.js";

export default {
  name: "RepositoryTimeline",
  props: {
    repository: Object,
    isAdmin: Boolean
  },
  data() {
    return {
      items: [
        {
          color: "indigo",
          icon: "publish",
          title: "Released on:",
          text: getDate(this.repository.release_date)
        },
        {
          color: "green darken-1",
          icon: "done",
          title: "Submitted on:",
          text: this.submissionDate(this.repository)
        },
        {
          color: "orange darken-1",
          icon: "access_alarm",
          title: "Due date:",
          text: getDate(this.repository.due_date)
        }
      ],
      isReleaseDateModalOpen: false,
      isDueDateModalOpen: false,
      releaseDate: getDate(this.repository.release_date),
      dueDate: "",
      releaseDateSnackbar: false,
      dueDateSnackbar: false,
      releaseDateInvalid: false,
      snackbar: false,
      snackbarMessage: "",
      snackbarColor: ""
    };
  },
  methods: {
    submissionDate(repository) {
      if (repository.repository_submission_date != undefined) {
        return getDate(repository.repository_submission_date);
      } else {
        return "Not Submitted";
      }
    },
    handleReleaseOpen() {
        var today = new Date()
        var releaseDate = new Date(this.releaseDate)
      if (this.dateIsBefore(today, releaseDate)) {
        this.isReleaseDateModalOpen = true;
      } else{
          this.snackbarMessage = "Repository already released, release date can't be changed!"
          this.snackbarColor = "error"
          this.snackbar = true
      }
    },
    checkDueDate() {
      if (this.repository.due_date != null) {
        getDate(this.repository.due_date);
      }
    },
    applyReleaseDate() {
      var today = new Date();
      var date = new Date(this.releaseDate);

      if (this.dateIsBefore(today,date)) {
        this.repository.release_date = this.releaseDate;
        this.isReleaseDateModalOpen = false;
        this.snackbarMessage =
          "Release date has been changed to " + this.releaseDate;
        this.snackbarColor = "info";
        this.snackbar = true;
        this.$emit("change-repository", this.repository);
      } else {
        this.snackbarMessage = "Release date has already happened!";
        this.snackbarColor = "error";
        this.snackbar = true;
      }
    },
    applyDueDate() {
    var today = new Date()
    var dueDate = new Date(this.dueDate)
    var releaseDate = new Date(this.releaseDate)
    if(this.dateIsBefore(today,dueDate) && this.dateIsBefore(releaseDate, dueDate)){
      this.repository.due_date = this.dueDate;
      this.isDueDateModalOpen = false;
      this.snackbarMessage = "Due date has been changed to " + this.dueDate;
      this.snackbarColor = "info";
      this.snackbar = true;
      this.$emit("change-repository", this.repository);
    } else{
        this.snackbarMessage = "Due date must be after release date"
        this.snackbarColor = "error"
        this.snackbar = true
    }
    },
    dateIsBefore(date1, date2) {
      if (
        date1.getFullYear() <= date2.getFullYear() &&
        date1.getMonth() <= date2.getMonth() &&
        date1.getDate() <= date2.getDate() 
        ||
        date1.getFullYear() <= date2.getFullYear() &&
        date1.getMonth() < date2.getMonth() 
      ) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>