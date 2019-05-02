<template>
<el-container style="width: 100vw;">
  <el-aside><sidebar/></el-aside>
  <el-main style="color: $--color-primary; height: 100vh; display:block;"><router-view/></el-main>
</el-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Sidebar from '../_component/Sidebar.vue'

export default {
  name: 'Dashboard',
  mounted(){
  },
  components: {
    Sidebar
  },
  computed: {
    ...mapState({
      isAuthenticated: state => state.authentication.isAuthenticated
    })
  },
  props: {
  },
  methods: {
    ...mapActions(['login']),
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
