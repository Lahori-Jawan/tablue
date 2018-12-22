<template>
  <div class="control">
    <input type="text" class="input is-rounded" v-bind="$attrs" 
      v-model.lazy="lazySearch" v-debounce="500" placeholder="Search any key">
    <a class="delete is-small" @click="lazySearch = ''" v-show="search.length"></a>
  </div>
</template>

<script>
import debounce from '@/3rdparty/v-debounce.js';
export default {
  data: () => ({
    search: ''
  }),
  directives:{
    debounce
  },
  computed: {
    lazySearch: {
      get(){ return this.search },
      set (value) {
        this.search = value
        this.$emit('input', value)
      }
    }
  }
}
</script>

<style scoped>
.control {
  position: relative;
  text-align: right;
  flex-grow: 1;
}
.control input {
  max-width: 20rem;
}
.delete {
  position: absolute;
  top: .65rem;
  right: 1rem;
}
</style>

