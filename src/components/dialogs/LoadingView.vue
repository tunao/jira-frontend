<template>
  <div class="overlay" >
    <div class="text-center">
      <v-progress-circular indeterminate size="75">
        Loading...
      </v-progress-circular>
    </div>
<!--    <v-btn dark color="black" @click="cancelLoading()"-->
<!--    >Cancel-->
<!--    </v-btn>-->
  </div>
</template>

<script>
export default {
  methods:{
    // cancelLoading() {
    //   this.$store.dispatch("actionCancelLoading");
    // },
  },
}
</script>

<style scoped>
.overlay{
  text-align: center;
  height: 100px;
}
.text-center{
  color: blue;
}
</style>