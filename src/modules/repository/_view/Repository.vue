<template>
    <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="Repository Information" name="first">Repository Information</el-tab-pane>
    <el-tab-pane label="Organization Information" name="second">Organization Information</el-tab-pane>
    <el-tab-pane label="Owner Information" name="third">Owner Information</el-tab-pane>
    
    <el-tab-pane label="Delete Repository" name="fourth">
        <el-popover
            placement="top"
            width="160"
            v-model="visible2">
            <p>Are you sure to delete this?</p>
            <div style="text-align: right; margin: 0">
                <el-button size="mini" type="primary" @click="handleDelete">YES</el-button>
                <el-button type="text" size="mini" @click="visible2 = false">NO</el-button>
            </div>
            <el-button slot="reference">Delete</el-button>
        </el-popover>
    </el-tab-pane>
    
  </el-tabs>
</template>

<script>
    export default{
        name: "Repository",
        data(){
            return{
                visible2: false
            }
        },
        methods: {
            handleDelete(){
                this.$data.visible2 = false
            }
        }
    }
</script>