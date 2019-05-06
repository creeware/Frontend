<template>
<div></div>
        <!-- <template slot-scope="scope">
           <el-tag :class="statusColorizer(scope.row.repository_status)" hit>{{ scope.row.repository_status.toUpperCase() }}</el-tag>
        </template> -->
</template>

<script>
import { statusColorizer } from "@/utils.js"
export default {
    name: "RepositoryList",
    props: {
        repositories: Array
    },
      data() {
        return {
          tableData: [{
            repository_name: 'Alfred',
            repositpory_description: 'This is a repository',
            repository_git_url: 'alfred.com',
            repository_status: "released",
            repository_type: 'Solution',
            release_date: '2019-05-03'
          }, {
            repository_name: 'Brad',
            repositpory_description: 'This is a repository',
            repository_git_url: 'brad.com',
            repository_status: "released",
            repository_type: 'Solution',
            release_date: '2019-06-21'
          }, {
            repository_name: 'Christian',
            repositpory_description: 'This is a repository',
            repository_git_url: 'christian.com',
            repository_status: "released",
            repository_type: 'Solution',
            release_date: '2016-05-04'
          }, {
            repository_name: 'Dustin',
            repositpory_description: 'This is a repository',
            repository_git_url: 'dustin.com',
            repository_status: "released",
            repository_type: 'Solution',
            release_date: '2016-05-01'
          }]
        }
      },
      methods: {
        statusColorizer,

      }
    }
</script>