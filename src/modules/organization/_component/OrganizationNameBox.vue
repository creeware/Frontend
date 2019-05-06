<template>
    <v-card>
        <v-card-title>
            <h1>{{ organization.organization_name }}</h1>
        </v-card-title>
        <h3 class="mx-3">Company: {{ organization.company_name }}</h3>
        <h3 class="mx-3"><router-link :to="organization.organization_git_url">{{"Github"}}</router-link></h3>
        <!-- <p>{{ organization }}</p> -->
    </v-card>
</template>

<script>
    export default {
        name: "OrganizationNameBox",
        props: {
            organization: Object
        }
    }
</script>