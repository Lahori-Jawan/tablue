<template>
  <a class="button is-danger delete" @click="removeAll()">&nbsp;</a>
</template>

<script>
export default {
  props: {
    removeAll: {
      type: Function,
      required: true
    }
  }
}
</script>

<style scoped>
.delete {
  font-size: 1.5rem;
  padding: 1rem;
  margin-left: 1rem;
  transition: all .25s;
}
</style>

