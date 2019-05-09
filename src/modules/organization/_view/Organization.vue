<template>

</template>

<script>


export default {
  name: 'Organization',
  components: {

  },
  data() {
    return {
      deleteDialogVisible: false
    };
  },
  methods: {
    handleClose(done) {
      // INVESTIGATE THIS WARNING
      this.$confirm("Are you sure to close this dialog?")
        .then(() => {
          done();
        })
        .catch(() => {});
    }
  }
};
</script>
