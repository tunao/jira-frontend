<template>
  <div>
    <h1>Assigned Feedback: </h1>
<!--    TODO: should show max 3 feedbacks-->
    <p>{{ $route.params.item.right_feedback_issue }}</p>
  </div>
</template>

<script>

export default {
  props: ['item'],
  methods: {
  }
};

</script>



<style scoped>

</style>