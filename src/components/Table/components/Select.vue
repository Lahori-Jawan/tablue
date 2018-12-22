<template>
  <div class="select">
    <div>
      Per Page
    </div>
    <select @change="selected($event.target.value)">
      <option v-for="option in options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    selected (value) {
      console.log('changed')
      value = isNaN(parseInt(value)) ? 'All' : parseInt(value)
      this.$emit('input', value)
    }
  }
}
</script>

<style scoped>
.select {
  position: relative;
  display: flex;
}

.select > div:first-child {
  display: flex;
  align-items: center;
  margin-right: 1rem;
}
</style>
