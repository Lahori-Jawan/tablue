<template>
  <a class="delete" @click="removeAll()">&nbsp;</a>
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
