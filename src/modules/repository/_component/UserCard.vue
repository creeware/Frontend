<template>
    <v-card color="blue" class="mb-2">
        <v-card-title class="title">
            <span class="white--text">
                <v-icon class="white--text">person</v-icon>
                Admin
            </span>
        </v-card-title>
        <v-card-text class="white text--primary">
            <v-layout>
                <v-flex xs3 class="mr-3">    
                    <v-img :src="user.avatar_url"></v-img>
                </v-flex>
                <v-flex xs9>
                    <!-- <span style="padding-left:1em"> --><b>{{ "Name: "}}</b><router-link class="link-item" :to="'/users/'+user.user_uuid">{{ user.user_display_name }}</router-link><br><!-- </span> -->
                    <!-- <span style="padding-left:1em"> --><b>{{ "Role: " }}</b><v-chip :color="roleColorizer(user.user_role)" text-color="white">{{ user.user_role.toUpperCase() }}</v-chip><br><!-- </span> -->
                    <!-- <span style="padding-left:1em"> --><b>{{ "E-mail: " }}</b><a class="link-item" :href="'mailto: '+user.user_email">{{ user.user_email }}</a><!-- </span> -->
                </v-flex>
            </v-layout>
            <v-expansion-panel popout>
                <v-expansion-panel-content>
                    <template v-slot:header>
                        <div><b>Description</b></div>
                    </template>
                    <v-card>
                        <v-card-text class="grey lighten-3">{{ user.user_bio }}</v-card-text>
                    </v-card>
                </v-expansion-panel-content>
            </v-expansion-panel>
            <v-layout row justify-center>
                <v-btn 
                flat 
                class="purple white--text" 
                :href="user.profile_url"
                target="_blank">
                GitHub
                </v-btn>
            </v-layout>
        </v-card-text>
    </v-card>
</template>

<script>
import { roleColorizer } from "@/utils.js"
export default {
    name: "UserCard",
    props: {
        user: Object,
        color: String
    },
    methods:{
        roleColorizer
    }
}
</script>
>
