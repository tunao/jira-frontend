<template>
  <div id="app">
    <header>
      <div class="banner">
        <p>Jira Dashboard</p>
      </div>
    </header>
    <router-view style="margin-top: 40px"/>
  </div>
</template>

<style>
.banner {
  background-color: #007BFF;
  color: white;
  padding: 10px;
  text-align: center;
}

.banner p {
  margin: 0;
  font-size: 18px;
}
</style>
<script setup>
</script>