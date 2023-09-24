<template>
  <div>
    <h1>Assigned Feedback: </h1>
    <p>{{ $route.params.item.right_feedback_issue }}</p> <!-- Anzeige des übergebenen "item"-Werts -->
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