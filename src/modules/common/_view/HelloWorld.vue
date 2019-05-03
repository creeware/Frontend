<template>
<el-card class="section-container-card">
</el-card>
</template>

<script>
import store from "@/store";

export default {
  name: 'HelloWorld',
  mounted(){
    this.$http.get("api/repositories/aa8bc9fd-db3e-4307-97de-2a035f7e2709")
  },
  computed: {
    isAuthenticated: function () {
      return store.getters.isAuthenticated
    }
  },
  props: {
    msg: String
  },
  methods: {  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
