<template>
    <v-timeline dense>
        <v-timeline-item
        v-for="(item,i) in items"
        :key="i"
        :color="item.color"
        :icon="item.icon"
        >
            <v-card :color="item.color">
                <v-card-title class="title">
                    <span class="white--text">{{ item.title }}</span>
                </v-card-title>
                <v-card-text class="white text--primary">
                    <span class="subheading">{{ item.text }}</span>
                </v-card-text>
            </v-card>
        </v-timeline-item>
    </v-timeline>
</template>

<script>
    import {getDate} from "@/utils.js"

    export default {
        name: "RepositoryTimeline",
        props: {
            repository: Object
        }, data(){
            return{
                items: [
                    {color: "indigo darken-1", icon: "publish", title: "Released on:", text: getDate(this.$props.repository.release_date)},
                    {color: "green darken-1", icon: "done", title: "Submitted on:", text: this.submissionDate(this.$props.repository)},
                    {color: "orange darken-1", icon: "access_alarm", title: "Due date:", text: getDate(this.$props.repository.due_date)}
                ]
            }
        },
        methods: {
            submissionDate(repository){
                if(repository.repository_submission_date != undefined){
                    return getDate(repository.repository_submission_date);
                } else{
                    return "Not Submitted";
                }
            }
        }
    }
</script>