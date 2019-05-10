<template>
    <v-card color="green">
        <v-card-title class="title">
            <span class="white--text">
                <v-icon class="white--text">domain</v-icon>
                Organization
            </span>
        </v-card-title>
        <v-card-text class="white text--primary">
            <b>{{"Name: "}}</b><router-link class="link-item" :to="'/organizations/'+organization.organization_uuid">{{organization.organization_name}}</router-link><br>
            <b>{{ "Company: "}}</b>{{organization.company_name }}<br>
            <v-expansion-panel popout>
                <v-expansion-panel-content>
                    <template v-slot:header>
                        <div><b>Description</b></div>
                    </template>
                    <v-card>
                        <v-card-text class="grey lighten-3">{{ organization.organization_description }}</v-card-text>
                    </v-card>
                </v-expansion-panel-content>
            </v-expansion-panel> 
        <v-layout row justify-center>
            <v-btn 
            flat 
            class="purple white--text" 
            :href="organization.organization_git_url"
            target="_blank"
            >
            GitHub
            </v-btn>
        </v-layout>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
  name: "OrganizationCard",
  props: {
    organization: Object,
    color: String
  }
};
</script>